/**
 * The /smcapp/annotation endpoint that handles general section notes and
 * highlights.
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Note = require('./models/note');
const Highlight = require('./models/highlight');

/**
 * Retrieves per-section notes
 */
router.get('/', async (req, res) => {
    try {
        const { book, reference } = req.query;
        const notes = await Note.find({book, reference });
        res.json(notes);
    } catch(error) {
        res.status(500).json(
            {message: "Error fetching note",
            error: error.message
            });
    }
});

router.post('/', async (req, res) => {
    try {
        const { book, reference, notes } = req.body;
        const note = new Note({book, reference, notes});
        const savedNote = await note.save();
        console.log("Note added succesfully", savedNote);
        res.status(201).json(savedNote);
    } catch(err) {
        res.status(500).json({message: "Error posting new note",
            error: err});
    }
});

router.put('/:id', async (req, res)=>{
    const { id } = req.params;
    const { book, reference, notes } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id, 
            { book, reference, notes },
            { new: true, runValidators: true }
        );

        if(!updatedNote) {
            return res.status(404).send({message: "No such note " + id });
        }

        res.send(updatedNote);
    } catch(err) {
        res.status(500).send({message: "Error updating note " + id});
    }
});

module.exports = router;

