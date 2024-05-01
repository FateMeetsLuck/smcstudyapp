const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs').promises;
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3001; // use .env in future

app.use(cors({
    origin: 'http://localhost:3000' // change for production
}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/NotesDatabase', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true});

const noteSchema = new mongoose.Schema({ bookTitle: String,
    reference: String, notes: String});

const Note = mongoose.model('Note', noteSchema);

async function readData(filename) {
    const filePath = path.join(__dirname, '..', 'Urantia-Papers', 'data', 'json', 'eng', `${filename}.json`);
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
}

app.get('/ub', async(req, res) => {
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

app.get('/notes', (req, res) => {
    const {bookTitle, reference} = req.query;
    /*Note.findOne({ bookTitle, reference }, (err, note) => {
        if(err) {
            console.error("Error getting notes: ", err);
            return res.status(500).send(err);
        }
        if(!note) return res.status(404).send({message: "No notes here"});
        res.status(200).send(note);
    });*/
    Note.findOne({ bookTitle, reference }).then(result => {
        res.send(result);   
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error accessing database');
    });
});

app.post('/notes', async (req, res) => {
    const { bookTitle, reference, notes } = req.body;
    try {
        const note = await Note.findOneAndUpdate(
            { bookTitle, reference},
            { notes },
            { new: true, upsert: true }
        );
        if(note) {
            res.status(200).send({ message: "Note updated successfully", note });
        } else {
            res.status(201).send({ message: "Note created successfully.", note })
        }
    } catch(err) {
        console.error('Database error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => console.log(`UB Server started on port ${PORT}`));
