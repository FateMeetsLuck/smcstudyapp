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
    const { paperId, sectionId, paragraphId } = req.query;
    try {
        if(!paperId) {
            throw new Error('Paper ID is required');
        }

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
    } catch(error) {
        res.status(400).json({message: error.message});
    }
});

app.listen(PORT, () => console.log(`UB Server started on port ${PORT}`));
