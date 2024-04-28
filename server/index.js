const cors = require('cors');
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001; // use .env in future

app.use(cors({
    origin: 'http://localhost:3000' // change for production
}));

async function readData(filename) {
    const filePath = path.join(__dirname, '..', 'Urantia-Papers', 'data', 'json', 'eng', `${filename}.json`);
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
}

app.get('/api/ub', async(req, res) => {
    const { paperId, sectionId, paragraphId, partId } = req.query;
    try {
        if(!paperId && !partId) {
            throw new Error('Paper or Part ID is required');
        }

        if(partId)
        {
            const data = await readData(`${partId}-part`);
            console.log("Returning ", data);
            res.status(200).json(data);
        }
        else 
        {
            // Read the data file for requested paper
            const data = await readData(paperId.padStart(3, '0'));

            let result = data.filter(item => item.paperId === paperId);

            if(sectionId) {
                result = result.filter(item => item.paperSectionId === `${paperId}.${sectionId}`);
            }

            if(paragraphId) {
                result = result.filter(item => item.paperSectionParagraphId === `${paperId}.${sectionId}.${paragraphId}`);
            }
            console.log("Returning: ", result);
            res.status(200).json(result);
        }
    } catch(error) {
        res.status(400).json({message: error.message});
    }
});

app.get('/api/notes/ub', async(req, res) => {
    const dummyText = 
        `On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.`;

    res.status(200).json({"note": dummyText});
});

app.put('/api/notes/ub', async(req, res) => {
    console.log('Note put');
    res.send('Note put');
});

app.listen(PORT, () => console.log(`UB Server started on port ${PORT}`));
