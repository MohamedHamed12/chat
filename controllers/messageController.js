const Message = require('../models/Message');
const Conversation=require('../models/Conversation');
const Event = require('../models/Event');


exports.createMessage = async (req, res) => {
    const { conversation, sender, content } = req.body;
    try {
        const message = new Message({ conversation, sender, content });
        await message.save();
        
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate('conversation sender');
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get message by ID
exports.getMessageById = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await Message.findById(id).populate('conversation sender');
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update message
exports.updateMessage = async (req, res) => {
    const { id } = req.params;
    const { conversation, sender, content } = req.body;
    try {
        const message = await Message.findByIdAndUpdate(id, { conversation, sender, content }, { new: true, runValidators: true });
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete message
exports.deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await Message.findByIdAndDelete(id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
