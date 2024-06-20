// models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    conversation:{type:mongoose.Schema.Types.ObjectId, ref:'Conversation' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);






