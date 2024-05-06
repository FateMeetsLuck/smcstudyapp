/**
 * Displays the general per-section or per-chapter notes.
 */

import { useState, useEffect } from "react"

import "./styles/section-notes.css"

// TODO make configurable
const baseUrl = "http://localhost:3001/api/notes";

const SectionNotes = ({ book, reference }) => {
    const [notes, setNotes] = useState("");
    const [noteId, setNoteId] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const fetchNotes = async() => {
            console.log("SectionNotes, fetching for ", book, reference);
            setIsLoading(true);
            setIsEditable(false);
            setError(null);
            try {
                const response = await fetch(`${baseUrl}?book=${encodeURIComponent(book)}&reference=${encodeURIComponent(reference)}`);
                if(!response.ok) throw new Error('Failed to fetch notes');
                const data = await response.json();
                setNotes(data.length > 0 ? data[0].notes : "");
                setNoteId(data.length > 0 ? data[0]._id : null);
            } catch(err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotes();
    }, [book, reference]);
  
    const saveNotes = async () => {
        console.log("Attempting to save notes...", notes);
        setIsLoading(true);
        setError(null);
        try {
            const method = noteId ? 'PUT' : 'POST';
            const url = noteId ? `${baseUrl}/${noteId}` : baseUrl;
            const payload = { book, reference, notes };
            if(noteId) payload._id = noteId;
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if(!response.ok) {
                throw new Error("Failed to save notes: " + response.status);
            }
            console.log("save result", result);
        } catch(err) {
            console.error("save error", err);
            setError(err.message || "Failed to save notes");
        } finally {
            setIsLoading(false);
        }
    };

    const onButtonClick = async() => {
        if(isEditable) {
            await saveNotes();
            setIsEditable(false);
        } else {
            setIsEditable(true);
        }
    };

    return (
        <div className="notes">
            {isLoading ? <p className='loading-message'>Loading...</p> : error ? <p className='error-message'>Error: {error}</p> : (
                <>
                    <button onClick={onButtonClick}>{isEditable ? "Save" : "Edit"}</button>
                    {isEditable ? (
                        <textarea 
                            className={`notes-content ${isEditable? 'edit-mode' : ''}`} 
                            value={notes} 
                            onChange={e => setNotes(e.target.value)} 
                            style={{height: '100%'}}
                        />
                    ) : (
                        <p className='notes-content'>{notes}</p>
                    )}
                </>
            )}
        </div>
    );
}

export default SectionNotes