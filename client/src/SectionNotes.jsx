/**
 * Displays the general per-section or per-chapter notes.
 */

import "./styles/section-notes.css"

const SectionNotes = ({ bookTitle, referenceId }) => {
    return (
        <div className="notes">
            <p>Here we will display the notes for {bookTitle}, {referenceId}</p>
        </div>
    );
}

export default SectionNotes