/**
 * Displays the general per-section or per-chapter notes.
 */

import { useState, useEffect } from "react"

import "./styles/section-notes.css"

const SectionNotes = ({ bookTitle, referenceId }) => {
    const [notes, setNotes] = useState("");
    const [originalNotes, setOriginalNotes] = useState("");
    const [isEditable, setIsEditable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const fetchNotes = async() => {
            setIsLoading(true);
            setIsEditable(false);
            setError(null);
            try {
                const response = await fetch(`http://localhost:3001/notes?bookTitle=${encodeURIComponent(bookTitle)}&reference=${encodeURIComponent(referenceId)}`);
                if(!response.ok) throw new Error('Failed to fetch notes');
                const text = await response.text();
                const data = text ? JSON.parse(text) : { notes: ''};
                setNotes(data.notes);
                setOriginalNotes(data.notes);
            } catch(err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotes();
    }, [bookTitle, referenceId]);
  
    const saveNotes = async () => {
        console.log("Attempting to save notes...", { bookTitle, referenceId, notes });
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3001/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bookTitle,
                    reference: referenceId,
                    notes
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Failed to save notes, status: ${response.status}`);
            }
            console.log("Save response:", data);
        } catch (err) {
            console.error('Save Error:', err);
            setError(err.message || 'Failed to save notes');
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