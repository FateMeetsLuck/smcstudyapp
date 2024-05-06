/**
 * User ID associated with any given highlight or note
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    user_name: String,
    email: String,
    // TODO: password hash+whatever
});

const User = mongoose.model('User', userSchema);
module.exports = User;
