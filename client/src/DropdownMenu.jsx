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
            ]
        },
        {
            part: 2,
            title: "Part II. The Local Universe",
            papers: [
                { paper: 32, title: "The Evolution of the Local Universe" },
                { paper: 33, title: "Administration of the Local Universe" },
                { paper: 34, title: "The Local Universe Mother Spirit" },
                { paper: 35, title: "The Local Universe Sons of God" },
                { paper: 36, title: "The Life Carriers" },
                { paper: 37, title: "Personalities of the Local Universe" },
                { paper: 38, title: "Ministering Spirits of the Local Universe" },
                { paper: 39, title: "The Seraphic Hosts" },
                { paper: 40, title: "The Ascending Sons of God" },
                { paper: 41, title: "Physical Aspects of the Local Universe" },
                { paper: 42, title: "Energy — Mind and Matter" },
                { paper: 43, title: "The Constellations" },
                { paper: 44, title: "The Celestial Artisans" },
                { paper: 45, title: "The Local System Administration" },
                { paper: 46, title: "The Local System Headquarters" },
                { paper: 47, title: "The Seven Mansion Worlds" },
                { paper: 48, title: "The Morontia Life" },
                { paper: 49, title: "The Inhabited Worlds" },
                { paper: 50, title: "The Planetary Princes" },
                { paper: 51, title: "The Planetary Adams" },
                { paper: 52, title: "Planetary Mortal Epochs" },
                { paper: 53, title: "The Lucifer Rebellion" },
                { paper: 54, title: "Problems of the Lucifer Rebellion" },
                { paper: 55, title: "The Spheres of Light and Life" },
                { paper: 56, title: "Universal Unity" },
            ]
        },
        {
            part: 3,
            title: "Part III. The History of Urantia",
            papers: [
                { paper: 57, title: "The Origin of Urantia" },
                { paper: 58, title: "Life Establishment on Urantia"},
                { paper: 59, title: "The Marine-Life Era on Urantia"},
                { paper: 60, title: "Urantia During the Early Land-Life Era"},
                { paper: 61, title: "The Mammalian Era on Urantia"},
                { paper: 62, title: "The Dawn Races of Early Man"},
                { paper: 63, title: "The First Human Family"},
                { paper: 64, title: "The Evolutionary Races of Color"},
                { paper: 65, title: "The Overcontrol of Evolution"},
                { paper: 66, title: "The Planetary Prince of Urantia"},
                { paper: 67, title: "The Planetary Rebellion"},
                { paper: 68, title: "The Dawn of Civilization"},
                { paper: 69, title: "Primitive Human Institutions"},
                { paper: 70, title: "The Evolution of Human Government"},
                { paper: 71, title: "Development of the State"},
                { paper: 72, title: "Government on a Neighboring Planet"},
                { paper: 73, title: "The Garden of Eden"},
                { paper: 74, title: "Adam and Eve"},
                { paper: 75, title: "The Default of Adam and Eve"},
                { paper: 76, title: "The Second Garden"},
                { paper: 77, title: "The Midway Creatures"},
                { paper: 78, title: "The Violet Race after the Days of Adam"},
                { paper: 79, title: "Andite Expansion in the Orient"},
                { paper: 80, title: "Andite Expansion in the Occident"},
                { paper: 81, title: "Development of Modern Civilization"},
                { paper: 82, title: "The Evolution of Marriage"},
                { paper: 83, title: "The Marriage Institution"},
                { paper: 84, title: "Marriage and Family Life"},
                { paper: 85, title: "The Origins of Worship"},
                { paper: 86, title: "Early Evolution of Religion"},
                { paper: 87, title: "The Ghost Cults"},
                { paper: 88, title: "Fetishes, Charms, and Magic"},
                { paper: 89, title: "Sin, Sacrifice, and Atonement"},
                { paper: 90, title: "Shamanism — Medicine Men and Priests"},
                { paper: 91, title: "The Evolution of Prayer"},
                { paper: 92, title: "The Later Evolution of Religion"},
                { paper: 93, title: "Machiventa Melchizedek"},
                { paper: 94, title: "The Melchizedek Teachings in the Orient"},
                { paper: 95, title: "The Melchizedek Teachings in the Levant"},
                { paper: 96, title: "Yahweh — God of the Hebrews"},
                { paper: 97, title: "Evolution of the God Concept among the Hebrews"},
                { paper: 98, title: "The Melchizedek Teachings in the Occident"},
                { paper: 99, title: "The Social Problems of Religion"},
                { paper: 100, title: "Religion in Human Experience"},
                { paper: 101, title: "The Real Nature of Religion"},
                { paper: 102, title: "The Foundations of Religious Faith"},
                { paper: 103, title: "The Reality of Religious Experience"},
                { paper: 104, title: "Growth of the Trinity Concept"},
                { paper: 105, title: "Deity and Reality"},
                { paper: 106, title: "Universe Levels of Reality"},
                { paper: 107, title: "Origin and Nature of Thought Adjusters"},
                { paper: 108, title: "Mission and Ministry of Thought Adjusters"},
                { paper: 109, title: "Relation of Adjusters to Universe Creatures"},
                { paper: 110, title: "Relation of Adjusters to Individual Mortals"},
                { paper: 111, title: "The Adjuster and the Soul"},
                { paper: 112, title: "Personality Survival"},
                { paper: 113, title: "Seraphic Guardians of Destiny"},
                { paper: 114, title: "Seraphic Planetary Government"},
                { paper: 115, title: "The Supreme Being"},
                { paper: 116, title: "The Almighty Supreme"},
                { paper: 117, title: "God the Supreme"},
                { paper: 118, title: "Supreme and Ultimate — Time and Space"},
                { paper: 119, title: "The Bestowals of Christ Michael"},
            ]
        },
        {
            part: 4,
            title: "Part IV. The Life and Teachings of Jesus",
            papers: [
                { paper: 120, title: "The Bestowal of Michael on Urantia" },
                { paper: 121, title: "The Times of Michael's Bestowal"},
                { paper: 122, title: "Birth and Infancy of Jesus"},
                { paper: 123, title: "The Early Childhood of Jesus"},
                { paper: 124, title: "The Later Childhood of Jesus"},
                { paper: 125, title: "Jesus at Jerusalem"},
                { paper: 126, title: "The Two Crucial Years"},
                { paper: 127, title: "The Adolescent Years"},
                { paper: 128, title: "Jesus' Early Manhood"},
                { paper: 129, title: "The Later Adult Life of Jesus"},
                { paper: 130, title: "On the Way to Rome"},
                { paper: 131, title: "The World's Religions"},
                { paper: 132, title: "The Sojourn at Rome"},
                { paper: 133, title: "The Return from Rome"},
                { paper: 134, title: "The Transition Years"},
                { paper: 135, title: "John the Baptist"},
                { paper: 136, title: "Baptism and the Forty Days"},
                { paper: 137, title: "Tarrying Time in Galilee"},
                { paper: 138, title: "Training the Kingdom's Messengers"},
                { paper: 139, title: "The Twelve Apostles"},
                { paper: 140, title: "The Ordination of the Twelve"},
                { paper: 141, title: "Beginning the Public Work"},
                { paper: 142, title: "The Passover at Jerusalem"},
                { paper: 143, title: "Going Through Samaria"},
                { paper: 144, title: "At Gilboa and in the Decapolis"},
                { paper: 145, title: "Four Eventful Days at Capernaum"},
                { paper: 146, title: "First Preaching Tour of Galilee"},
                { paper: 147, title: "The Interlude Visit to Jerusalem"},
                { paper: 148, title: "Training Evangelists at Bethsaida"},
                { paper: 149, title: "The Second Preaching Tour"},
                { paper: 150, title: "The Third Preaching Tour"},
                { paper: 151, title: "Tarrying and Teaching by the Seaside"},
                { paper: 152, title: "Events Leading up to the Capernaum Crisis"},
                { paper: 153, title: "The Crisis at Capernaum"},
                { paper: 154, title: "Last Days at Capernaum"},
                { paper: 155, title: "Fleeing Through Northern Galilee"},
                { paper: 156, title: "The Sojourn at Tyre and Sidon"},
                { paper: 157, title: "At Caesarea-Philippi"},
                { paper: 158, title: "The Mount of Transfiguration"},
                { paper: 159, title: "The Decapolis Tour"},
                { paper: 160, title: "Rodan of Alexandria"},
                { paper: 161, title: "Further Discussions with Rodan"},
                { paper: 162, title: "At the Feast of Tabernacles"},
                { paper: 163, title: "Ordination of the Seventy at Magadan"},
                { paper: 164, title: "At the Feast of Dedication"},
                { paper: 165, title: "Ordination of the Seventy at Magadan"},
                { paper: 166, title: "Last Visit to Northern Perea"},
                { paper: 167, title: "The Visit to Philadephia"},
                { paper: 168, title: "The Resurrection of Lazarus"},
                { paper: 169, title: "Last Teaching at Pella"},
                { paper: 170, title: "The Kingdom of Heaven"},
                { paper: 171, title: "On the Way to Jerusalem"},
                { paper: 172, title: "Going into Jerusalem"},
                { paper: 173, title: "Monday in Jerusalem"},
                { paper: 174, title: "Tuesday Morning in the Temple"},
                { paper: 175, title: "The Last Temple Discourse"},
                { paper: 176, title: "Tuesday Evening on Mount Olivet"},
                { paper: 177, title: "Wednesday, the Rest Day"},
                { paper: 178, title: "Last Day at the Camp"},
                { paper: 179, title: "The Last Supper"},
                { paper: 180, title: "The Farewell Discourse"},
                { paper: 181, title: "Final Admonitions and Warnings"},
                { paper: 182, title: "In Gethsemane"},
                { paper: 183, title: "The Betrayal and Arrest of Jesus"},
                { paper: 184, title: "Before the Sanhedrin Court"},
                { paper: 185, title: "The Trial Before Pilate"},
                { paper: 186, title: "Just Before the Crucifixion"},
                { paper: 187, title: "The Crucifixion"},
                { paper: 188, title: "The Time of the Tomb"},
                { paper: 189, title: "The Resurrection"},
                { paper: 190, title: "Morontia Appearances of Jesus"},
                { paper: 191, title: "Appearances to the Apostles and Other Leaders"},
                { paper: 192, title: "Appearances in Galilee"},
                { paper: 193, title: "Final Appearances and Ascension"},
                { paper: 194, title: "Bestowal of the Spirit of Truth"},
                { paper: 195, title: "After Pentecost"},
                { paper: 196, title: "The Faith of Jesus"},
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
                    placeholder='Enter Paper(:Section(.Paragraph)) e.g., 5:2.1' 
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