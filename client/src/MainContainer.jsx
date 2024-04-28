import { useState } from 'react'
import ScriptureText from './ScriptureText'
import SectionNotes from './SectionNotes'
import NoteViewer from './NoteViewer'

const MainContainer = ({selection}) => {
    const [selectedAnnotation, setSelectedAnnotation] = useState(null);
    const [annotations, setAnnotations] = useState({});

    const closeNoteViewer = () => {
        setSelectedAnnotation(null);
    };

    const handleSelectAnnotation = (annotation) => {
        setSelectedAnnotation(annotation);
    };

    const onTextSelect = (textSelection) => {
        console.log("User selected text: ", textSelection);
    }

    return (
        <div className='container'>
            <ScriptureText 
                selection={selection}
                onTextSelect={onTextSelect}
            />
            {selectedAnnotation && (
                <NoteViewer annotation={selectedAnnotation} onClose={closeNoteViewer} />
            )}
            <SectionNotes />
        </div>
    );
}

export default MainContainer