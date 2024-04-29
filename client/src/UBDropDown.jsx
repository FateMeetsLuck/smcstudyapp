/**
 * Dropdown TOC section selector for the UB
 */
import { useState } from "react"
import "./Constants"
import "./styles/ub-dropdown.css"
import { BOOK_TITLE, TABLES_OF_CONTENTS } from "./Constants";

function handlePaperClick( onSelect ) {

}

function generateSectionList(numSections) {
    let boxes = [];
    for(let i=0; i <= numSections; ++i) {
        boxes.push(<div className="sections-list" key={i} data-id={i}>{i}</div>)
    }
    return (
        boxes
    );
} 

const UBDropDown = ( {onSelect} ) => {
    const [selectedPaper, setSelectedPaper] = useState(null);

    const generateSectionList = (numSections, paperId) => {
        let sections = [];
        for(let i=0; i <= numSections; ++i) {
            sections.push(
                <div className='section-item' key={`${paperId}:${i}`} onClick={()=> onSelect({title: BOOK_TITLE.UB, refId: `${paperId}:${i}`})}>
                    {i}
                </div>
            );
        }
        return <div className="sections-list">{sections}</div>
    };

    return (
        <div className="toc-container">
          <ul>
            <li>
              <h3 onClick={() => setSelectedPaper(prev => prev === 0 ? null : 0)}>
                Foreword
              </h3>
              {selectedPaper === 0 && generateSectionList(12, 0)}
            </li>
            {TABLES_OF_CONTENTS.UB.map((part, idx) =>(
                <li key={`part-${idx}`}>
                    {console.log("part=",part)}
                    <h2 onClick={() => setSelectedPaper(prev => prev === `part-${idx}` ? null : `part-${idx}`)}>
                        {part.title}
                    </h2>
                    <p>{part.text}</p>
                    {part.papers.map(paper => (
                        <div key={paper.paper}>
                            <h3 onClick={()=> setSelectedPaper(prev => prev === paper.paper ? null : paper.paper )}>
                                {paper.paper}. {paper.title}
                            </h3>
                            {selectedPaper === paper.paper && generateSectionList(paper.sections, paper.paper)}
                        </div>
                    ))}
                </li>
            ))}
          </ul>
        </div>
    );
}

export default UBDropDown