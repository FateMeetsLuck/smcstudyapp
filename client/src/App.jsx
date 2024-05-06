import { useState } from 'react'

import Navbar from "./Navbar"
import SectionNotes from './SectionNotes'
import UBDropDown from './UBDropDown'
import UBText from './UBText'
import './Constants'
import { BOOK_TITLE } from './Constants'

function renderSelectedDropdown(dropdown, onSelect) {
    console.log("I want to render the dropdown for ", dropdown);
    switch(dropdown) {
      case BOOK_TITLE.UB:
        return (<UBDropDown onSelect={onSelect} />);
      case BOOK_TITLE.BIBLE:
        return (<p>Bible not implemented yet!</p>);
      case BOOK_TITLE.BOM:
        return (<p>BoM not implemented yet!</p>);
      default:
        return null;
    }
}


const App = () => {
  
    const [currentDropdown, setCurrentDropdown] = useState(null); // should be a BOOK_TITLE enum value
    const [selectedText, setSelectedText] = useState(null);

    const onSelectDropdown = (bookTitle) => {
        if(currentDropdown === bookTitle)
            setCurrentDropdown(null);
        else 
            setCurrentDropdown(bookTitle);
    };

    const onSelectPassage = ({title, refId}) => {
      setSelectedText({title, refId});
      setCurrentDropdown(null);
    };

    console.log(selectedText);
    return (
      <>
        <header className='permanent-marker-regular'>
          <h1>Second Mile Christian Study App</h1>
        </header>

        <Navbar onSelectDropdown={onSelectDropdown} />
        {renderSelectedDropdown(currentDropdown, onSelectPassage)}

        <div className='container'>
          {selectedText?.title === BOOK_TITLE.UB && <UBText referenceId={selectedText?.refId}/>}
          {selectedText && <SectionNotes book={selectedText?.title} reference={selectedText?.refId} />}
        </div>
        <footer>
          <p>This software is licensed under GPL3</p>
        </footer>
      </>
    );
}

export default App
