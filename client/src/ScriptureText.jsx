import { useState, useEffect, useRef } from 'react'

function getCharacterOffsetWithin(element, child) {
    let offset = 0;
    if(child.nodeType === Node.TEXT_NODE) {
        let node = child;
        while(node.previousSibling) {
            node = node.previousSibling;
            offset += node.textContent.length;
        }
    }
    return offset;
}

const ScriptureText = ({selection, onTextSelect}) => {
    const [content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log("Selection: ", selection);
    const {paperId, sectionId, paragraphId, partId} = selection;

    // handle highlighting of text
    const handleMouseUp = () => {
        const selection = window.getSelection();
        if(!selection.isCollapsed && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let startNode = range.startContainer;
            let endNode = range.endContainer;
            while(startNode && startNode.nodeType !== Node.ELEMENT_NODE) {
                startNode = startNode.parentNode;
            }

            while(endNode && endNode.nodeType !== Node.ELEMENT_NODE) {
                endNode = endNode.parentNode;
            }
            
            if(startNode && endNode) {
                const startOffset = range.startOffset + getCharacterOffsetWithin(startNode, range.startContainer) + range.startOffset;
                const endOffset = range.startOffset + getCharacterOffsetWithin(endNode, range.endContainer) + range.endOffset;
                
                const startRef = startNode.dataset.id;
                const endRef = endNode.dataset.id;

                const highlightDetails = {
                    startRef: startRef,
                    startOffset: startOffset,
                    endRef: endRef,
                    endOffset: endOffset,
                    text: selection.toString()
                };

                onTextSelect(highlightDetails);
                selection.removeAllRanges();
            } else {
                console.error("Selection did not occur in valid passage range");
            }

        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                let queryParams = new URLSearchParams();
                if(partId) {
                    queryParams.append("partId", partId);
                } else {
                    if(paperId === 0 || paperId) queryParams.append("paperId", paperId);
                    if(sectionId === 0 || sectionId ) queryParams.append("sectionId", sectionId);
                    if(paragraphId) queryParams.append("paragraphId", paragraphId);
                }

                console.log("Attempting to query the REST API with ", queryParams.toString());
                const response = await fetch(`http://localhost:3001/api/ub?${queryParams.toString()}`);
                if(!response.ok) {
                    throw new Error('Could not fetch data');
                }
                const data = await response.json();
                setContent(data);
            } catch(err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [paperId, sectionId, paragraphId, partId]);

    if(error) return <div className='error-message'>&lt;Error loading text: {error}&gt;</div>;
    if(isLoading) return <div>&lt;Loading text...&gt;</div>;

    // if this is not an array, such as when pulling individual passages, turn it back into an array here
    if(!Array.isArray(content))
        setContent([content]);

    if(partId) {
        const partContent = content[0];
        return (
            <div className='left-content'>
                <h2>{partContent?.partTitle || 'Part Title'}</h2>
                <p>{partContent?.partSponsorship || 'No text available for this part.'}</p>
            </div>
        );
    }

    const organizedContent = content.reduce((acc, item) => {
        const sectionKey = item.sectionId || 'general';
        if(!acc[sectionKey]) {
            if(item.paperId === "0") {
                acc[sectionKey] = {
                    title: item.sectionId !== 0? item.sectionTitle : null,
                    paragraphs: []
                };
            } else {
                acc[sectionKey] = {
                    title: item.sectionId && item.sectionId !== "0" ? `${item.sectionId}. ${item.sectionTitle || "No Title"}` : null,
                    paragraphs: []
                };
            }
        }

        if(item.text) {
            acc[sectionKey].paragraphs.push({
                text: item.text,
                ref: item.standardReferenceId
            });
        }
        return acc;
    }, {});

    console.log("organizedContent: ", organizedContent);
    return (
        <div className='left-content' onMouseUp={handleMouseUp}>
            <h2 className='unselectable-header'>{paperId!==0 && `Paper ${paperId} `}<br/>{content[0]?.paperTitle}</h2>
            {Object.values(organizedContent).map((section, index)=> (
                <div key={index}>
                    {section.title && <h3 className='unselectable-header'>{section.title}</h3>}
                    {section.paragraphs.map((para, paraIndex) => (
                        <p key={paraIndex}>
                            <span className='ref-number' unselectable='on'>{para.ref}</span>
                            <span  data-id={para.ref}>{para.text}</span>
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ScriptureText