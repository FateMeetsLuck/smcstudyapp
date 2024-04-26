/**
 * Drop down menu for passage selection
 */
import { useState } from 'react'

function parseInput(textInput) {
    const result = {
        paperId: null,
        sectionId: null,
        paragraphId: null
    };

    const parts = textInput.trim().split(':');

    if(parts[0]) {
        result.paperId = parseInt(parts[0]);
    }

    if(parts[1]) {
        const subParts = parts[1].split('.');
        result.sectionId = parseInt(subParts[0]);
        if(subParts[1]) {
            result.paragraphId = parseInt(subParts[1]);
        }
    }

    return result;
}

const DropdownMenu = ({ onSelect }) => {
    const [inputValue, setInputValue] = useState('');

    const toc = [
        { paper: 0, title: "Foreword" },
        {
            part: 1,
            title: "Part I. The Central and Superuniverses",
            papers: [
                { paper: 1, title: "The Universal Father" },
                { paper: 2, title: "The Nature of God" },
                { paper: 3, title: "The Attributes of God" },
                { paper: 4, title: "God's Relation to the Universe" },
                { paper: 5, title: "God's Relation to the Individual" },
                { paper: 6, title: "The Eternal Son" },
                { paper: 7, title: "Relation of the Eternal Son to the Universe" },
                { paper: 8, title: "The Infinite Spirit" },
                { paper: 9, title: "Relation of the Infinite Spirit to the Universe" },
                { paper: 10, title: "The Paradise Trinity" },
                { paper: 11, title: "The Eternal Isle of Paradise" },
                { paper: 12, title: "The Universe of Universes" },
                { paper: 13, title: "The Sacred Spheres of Paradise" },
                { paper: 14, title: "The Central and Divine Universe" },
                { paper: 15, title: "The Seven Superuniverses" },
                { paper: 16, title: "The Seven Master Spirits" },
                { paper: 17, title: "The Seven Supreme Spirit Groups" },
                { paper: 18, title: "The Supreme Trinity Personalities" },
                { paper: 19, title: "The Co-ordinate Trinity-Origin Beings" },
                { paper: 20, title: "The Paradise Sons of God" },
                { paper: 21, title: "The Paradise Creator Sons" },
                { paper: 22, title: "The Trinitized Sons of God" },
                { paper: 23, title: "The Solitary Messengers" },
                { paper: 24, title: "Higher Personalities of the Infinite Spirit" },
                { paper: 25, title: "The Messenger Hosts of Space" },
                { paper: 26, title: "Ministering Spirits of the Central Universe" },
                { paper: 27, title: "Ministry of the Primary Supernaphim" },
                { paper: 28, title: "Ministering Spirits of the Superuniverses" },
                { paper: 29, title: "The Universe Power Directors" },
                { paper: 30, title: "Personalities of the Grand Universe" },
                { paper: 31, title: "The Corps of the Finality" },
                // TODO
            ]
        },
        {
            part: 2,
            title: "Part II. The Local Universe",
            papers: [
                { paper: 32, title: "The Evolution of the Local Universe" },
                { paper: 33, title: "Administration of the Local Universe" },
                // TODO
            ]
        },
        {
            part: 3,
            title: "Part III. The History of Urantia",
            papers: [
                { paper: 57, title: "The Origin of Urantia" },
                { paper: 58, title: "Life Establishment on Urantia"},
                // TODO
            ]
        },
        {
            part: 4,
            title: "Part IV. The Life and Teachings of Jesus",
            papers: [
                { paper: 120, title: "The Bestowal of Michael on Urantia" },
                { paper: 121, title: "The Times of Michael's Bestowal"},
                // TODO
            ]
        }
    ];

    const handlePaperClick = (paperKey) => {
        // console.log("The handlePaperClick is not implemented yet: ", paperKey);
        onSelect({paperId: paperKey});
    };

    const handlePartClick = (partKey) => {
        // console.log("The handlePartClick is not implemented yet: ", partKey);
        onSelect({partId: partKey});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const selection = parseInput(inputValue);
        console.log("Attempting to select ", selection);
        onSelect(selection);
        setInputValue('');
    };

    return (
        <>
        <div className='papers-lookup'>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder='Enter Part(:Paper(.Paragraph)) e.g., 5:2.1' 
                />
                <button type="submit" onSubmit={handleSubmit}>Go</button>
            </form>
        </div>
        <div>
            <ul className='papers-grid'>
                <li onClick={() => handlePaperClick(0)}>{toc[0].title}</li>
                {toc.slice(1).map(part => (
                    <li key={part.part}>
                        <strong onClick={() => handlePartClick(part.part)}>{part.title}</strong>
                        <ul>
                            {part.papers.map(paper=>(
                                <li key={paper.paper} onClick={() => handlePaperClick(paper.paper)}>
                                    {paper.paper}. {paper.title}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default DropdownMenu