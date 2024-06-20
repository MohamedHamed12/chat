
const Conversation = require('../models/Conversation');
const Joi = require('joi');

// Create conversation
exports.createConversation = async (req, res) => {
    const { name, participants } = req.body;
    try {
        const conversation = new Conversation({ name, participants });
        await conversation.save();
        res.status(201).json(conversation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all conversations
exports.getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find().populate('participants');
        res.status(200).json(conversations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get conversation by ID
exports.getConversationById = async (req, res) => {
    const { id } = req.params;
    try {
        const conversation = await Conversation.findById(id).populate('participants');
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        res.status(200).json(conversation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update conversation
exports.updateConversation = async (req, res) => {
    const { id } = req.params;
    const { name, participants } = req.body;
    try {
        const conversation = await Conversation.findByIdAndUpdate(id, { name, participants }, { new: true, runValidators: true });
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        res.status(200).json(conversation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete conversation
exports.deleteConversation = async (req, res) => {
    const { id } = req.params;
    try {
        const conversation = await Conversation.findByIdAndDelete(id);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        res.status(204).json({ message: 'Conversation deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
