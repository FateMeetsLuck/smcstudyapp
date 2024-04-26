import { useState } from 'react';
import ScriptureText from './ScriptureText';
import NoteViewer from './NoteViewer';

const MainContainer = () => {
    const [selectedAnnotation, setSelectedAnnotation] = useState(null);
    const [annotations, setAnnotations] = useState({});

    const closeNoteViewer = () => {
        setSelectedAnnotation(null);
    };

    const handleSelectAnnotation = (annotation) => {
        setSelectedAnnotation(annotation);
    };

    // testing data, to be changed later
    const paperId = 12;

    return (
        <div className='container'>
            <ScriptureText 
                onSelectAnnotation={handleSelectAnnotation}
                paperId={paperId}
            />
            {selectedAnnotation && (
                <NoteViewer annotation={selectedAnnotation} onClose={closeNoteViewer} />
            )}
        </div>
    );
}

export default MainContainer