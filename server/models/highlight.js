/**
 * Defines the Highlight model for highlight annotations
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const highlightSchema = new Schema({
    /*userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },*/
    book: String,
    reference: String,
    highlight_start: Number,
    highlight_length: Number,
    color: String,
    annotation: String
});

const Highlight = mongoose.model('Highlight', highlightSchema);

module.exports = Highlight;