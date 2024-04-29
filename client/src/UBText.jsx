/**
 * This component holds the text of the selected passage
 */
import { useState, useEffect, useRef } from 'react'

import "./styles/ub-text.css"
import "./Constants"

/**
 * Utility function for calculating bounds of a highlight by character count.
 * @param {*} element - the HTML element
 * @param {*} child - the HTML child node
 * @returns a number
 */

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

function handleMouseUp() {
    console.log("Highlighting is not yet implemented!");
}

const UBText = ({ referenceId }) => {
    const [content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // just assume referenceId is xx:xx format
    const [paperId, sectionId] = referenceId.split(':');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                let queryParams = new URLSearchParams();
                queryParams.append("paperId", paperId);
                queryParams.append("sectionId", sectionId);

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
    }, [paperId, sectionId]);

    if(error) { 
        return (
            <div className='ub-text'>
                <p className='error-message'>&lt;Error loading text: {error}&gt;</p>
            </div>
        ); 
    }
    if(isLoading) return <div className='loading-message'>&lt;Loading text...&gt;</div>;

    // TODO this is where we would insert span highlighting if the highlight annotations were loaded already

    
    // at this point if the content[0] is missing, it means an invalid entry was selected
    if(!content[0]) { 
        return (
            <div className='ub-text'>
                <p className='error-message'>&lt;Invalid section selected&gt;</p>
            </div>
        ); 
    }

    const paperTitle = content[0].paperTitle;
    const sectionTitle = content[0].sectionTitle || "";

    return (
        <div className='ub-text' onMouseUp={handleMouseUp}>
            <h2>{paperId !== '0' && `Paper ${paperId}`}<br/>{paperTitle}</h2>
            
            {
                paperId !== '0' ?
                content[0].sectionTitle && <h3>{sectionId}. {sectionTitle}</h3> :
                <h3>{sectionTitle}</h3>
            }

            {content.map((item)=>item.text && <p>
                <span className='ub-ref'>{item.standardReferenceId}</span>
                <span data-id={item.standardReferenceId} dangerouslySetInnerHTML={{__html: item.htmlText}}></span>
            </p>)}
        </div>
    );
}

export default UBText