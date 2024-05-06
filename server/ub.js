/**
 * The API for retrieving static Scripture texts
 */

const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const readData = async (filename) => {
    const filePath = path.join(__dirname, '..', 'Urantia-Papers', 'data', 'json', 'eng', `${filename}.json`);
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
};

router.get('/', async(req, res) => {
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
            // console.log("Returning: ", result);
            res.status(200).json(result);
        }
    } catch(error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;