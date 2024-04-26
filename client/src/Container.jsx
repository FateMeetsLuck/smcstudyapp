/**
 * A container block element that can hold one paragraph passage in the left column, and notes on the right
 */
import PropTypes from "prop-types"
import BookNavigation from "./BookNavigation"
import Annotation from "./Annotation"

function Container(props) {
    return(
        <div class="container">
            <BookNavigation referenceID={props.refID} text={props.text} />
            <Annotation content={props.note} />
        </div>
    );
}

Container.propTypes = {
    refID: PropTypes.string,
    text: PropTypes.string,
    note: PropTypes.string
}

export default Container