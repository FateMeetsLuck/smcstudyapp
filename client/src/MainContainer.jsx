import { useState } from 'react';
import ScriptureText from './ScriptureText';
import NoteViewer from './NoteViewer';

const MainContainer = ({selection}) => {
    const [selectedAnnotation, setSelectedAnnotation] = useState(null);
    const [annotations, setAnnotations] = useState({});

    const closeNoteViewer = () => {
        setSelectedAnnotation(null);
    };

    const handleSelectAnnotation = (annotation) => {
        setSelectedAnnotation(annotation);
    };

    return (
        <div className='container'>
            <ScriptureText 
                selection={selection}
            />
            {selectedAnnotation && (
                <NoteViewer annotation={selectedAnnotation} onClose={closeNoteViewer} />
            )}
        </div>
    );
}

export default MainContainer