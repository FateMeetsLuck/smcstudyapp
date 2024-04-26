const NoteViewer = ({annotation, onClose}) => {
    return(
        <div className='note-viewer'>
            <button onClick={onClose} className='close-btn'>Close</button>
            <div className='annotation-content'>
                {annotation ? (
                    <p>{annotation}</p>
                ) : (
                    <p>No annotations here yet.</p>
                )}
            </div>
        </div>
    );
}

export default NoteViewer