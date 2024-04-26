/**
 * General horizontal navigation bar, but certain links can trigger a dropdown menu for text selection
 */

const Navbar = ({ onToggleDropdown }) => {
    return(
        <nav className="cinzel-nav">
            <ul>
                <li><a href="/">Home</a></li>
                <li>
                    <a href="#" onClick={onToggleDropdown}>Urantia Book</a>
                </li>
                <li><a href="#">About</a></li>
            </ul>
        </nav>
    );
}

export default Navbar