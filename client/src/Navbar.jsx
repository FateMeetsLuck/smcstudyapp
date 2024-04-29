/**
 * General horizontal navigation bar, but certain links can trigger a dropdown menu for text selection
 */

import "./Constants"
import { BOOK_TITLE } from "./Constants";

const Navbar = ({ onSelectDropdown }) => {
    return(
        <nav className="cinzel-nav">
            <ul>
                <li><a href="/">Home</a></li>
                <li>
                    <a href="#" onClick={()=>{onSelectDropdown(BOOK_TITLE.UB)}}>Urantia Book</a>
                </li>
                <li><a href="#">About</a></li>
            </ul>
        </nav>
    );
}

export default Navbar