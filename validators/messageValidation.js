// middleware/messageValidation.js
const Joi = require('joi');

// Joi schema for validating message data
const messageSchema = Joi.object({
    conversation: Joi.string().required(), // Assuming conversation is a string (ObjectId as string)
    sender: Joi.string().required(),       // Assuming sender is a string (ObjectId as string)
    content: Joi.string().required(),
    // timestamp: Joi.date().default(Date.now, 'Timestamp of the message').optional()

});

// Middleware function to validate message data
function validateMessage(req, res, next) {
    const { error } = messageSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = { validateMessage };
