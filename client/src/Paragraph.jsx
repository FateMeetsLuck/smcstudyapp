/**
 * Component for displaying individual paragraphs from the UB text. This will be embedded in the app next to the annotation components
 */
import PropTypes from "prop-types"

function Paragraph(props) {
    return (
        <main className="passage">
            <p><small>{props.referenceID}</small><span className="content">{props.text}</span></p>
        </main>
    );
}

Paragraph.propTypes = {
    referenceID: PropTypes.string,
    text: PropTypes.string
}

export default Paragraph