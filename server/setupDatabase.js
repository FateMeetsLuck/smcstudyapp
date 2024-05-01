/**
 * This script sets up the MongoDB database that stores the per-section notes. This is required to store notes.
 * TODO: configuration file for the port and MongoDB server info.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

// MongoDB Connection URL
const mongoURI = 'mongodb://localhost:27017/NotesApp';

// Define the Schema for the notes
const noteSchema = new Schema({
    bookTitle: String,
    reference: String,
    notes: String
});

const Note = mongoose.model('Note', noteSchema);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// Function to create initial data or ensure the collection exists
const setupInitialData = async () => {
    try {
        // Check if any data exists
        const count = await Note.countDocuments();
        if(count === 0) {
            // Example initial note
            const initialNote = new Note({
                bookTitle: "Example Book",
                reference: "1:1",
                notes: "This is an initial example note."
            });

            await initialNote.save();
            console.log('Initial data created successfully.');
        } else {
            console.log('Existing data found, no initial data created.');
        }
    } catch (err) {
        console.error('Error setting up initial data:', err);
    } finally {
        mongoose.disconnect();
    }
};

setupInitialData();
