/**
 * The model for the general section notes.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    /*userId: { 
        type: Schema.Types.ObjectId,
        ref: 'users'
    },*/
    book: String,
    reference: String,
    notes: String,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;