const Joi = require('joi');
const mongoose = require('mongoose');

const conversationSchema = Joi.object({
  name: Joi.string().required(),
  participants: Joi.array().items(Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.message('"participants" must be an array of valid ObjectIds');
    }
    return value;
  }).required()).min(2).required()
});

const validateConversation = (req, res, next) => {
  const { error } = conversationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateConversation;
// const Joi = require('joi');

// const conversationSchema = Joi.object({
//     name: Joi.string().required(),
//     participants: Joi.array().items(Joi.string().required())
// });

// exports.validateConversation = (req, res, next) => {
//     const { error } = conversationSchema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ error: error.details[0].message });
//     }
//     next();
// };
