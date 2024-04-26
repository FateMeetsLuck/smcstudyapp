import { useState, useEffect } from 'react'

const ScriptureText = ({paperId, sectionId, paragraphId}) => {
    const [content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const queryParams = new URLSearchParams({
                    paperId: paperId,
                    ...(sectionId && { sectionId: sectionId }),
                    ...(paragraphId && { paragraphId: paragraphId})
                }).toString();
                const response = await fetch(`http://localhost:3001/api/ub?${queryParams}`);
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
    }, [paperId, sectionId, paragraphId]);

    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>Error loading text: {error}</div>;

    const organizedContent = content.reduce((acc, item) => {
        const sectionKey = item.sectionId;
        if(!acc[sectionKey]) {
            acc[sectionKey] = {
                title: item.sectionId + '. ' + item.sectionTitle,
                paragraphs: []
            };
        }
        if(item.text) {
            acc[sectionKey].paragraphs.push({
                text: item.text,
                ref: item.standardReferenceId
            });
        }
        return acc;
    }, {});

    return (
        <div className='left-content'>
            <h2>Paper {paperId}: {content[0]?.paperTitle}</h2>
            {Object.values(organizedContent).map((section, index)=> (
                <div key={index}>
                    <h3>{section.title}</h3>
                    {section.paragraphs.map((para, paraIndex) => (
                        <p key={paraIndex}>
                            <span className='ref-number'>{para.ref}</span>
                            <span className='tab-margin'>{para.text}</span>
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ScriptureText