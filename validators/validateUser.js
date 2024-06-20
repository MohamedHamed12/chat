const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required()
});

exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
