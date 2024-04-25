/**
 * This represents an annotation that can be associated with one paragraph of text.
 */

import PropTypes from "prop-types"

function Annotation(props) {
    return(
        <aside class="sidebar">
            {props.content}
        </aside>
    );
}

Annotation.propTypes = {
    content: PropTypes.string
}

Annotation.defaultProps = {
    content: ""
}

export default Annotation