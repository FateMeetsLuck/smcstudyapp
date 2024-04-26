import { useState } from 'react'

import DropdownMenu from './DropdownMenu';
import MainContainer from "./MainContainer"
import Navbar from "./Navbar"

function App() {
    const [selection, setSelection] = useState({
      paperId: 0,
      sectionId: null,
      paragraphId: null,
      partId: null
    });

    const handleSelection = (newSelection) => {
      setSelection(newSelection);
      toggleDropdown();
    };

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    }

    return (
      <>
        <header className='permanent-marker-regular'>
          <h1>Second Mile Christian Study App</h1>
        </header>
        <Navbar onToggleDropdown={toggleDropdown} />
        {dropdownVisible && <DropdownMenu onSelect={handleSelection} />}
        <MainContainer selection={selection}/>
        <footer>
          <p>&copy; FateMeetsLuck {(new Date()).getFullYear()}</p>
        </footer>
      </>
    );
}

export default App
