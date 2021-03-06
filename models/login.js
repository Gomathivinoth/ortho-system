const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const loginSchema = new Schema({
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    usertype: { type: String, required: true, unique: true, lowercase: true }
});

module.exports = mongoose.model('Login', loginSchema);