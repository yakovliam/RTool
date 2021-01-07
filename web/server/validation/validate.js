const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(5).max(255).required(),
    password: Joi.string().alphanum().min(5).max(2048).required(),
    email: Joi.string().email().min(5).required()
});

const loginSchema = Joi.object({
    password: Joi.string().alphanum().min(5).max(2048).required(),
    email: Joi.string().email().min(5).required()
});

const clientSchema = Joi.object({
    handle: Joi.string().min(3).required(),
    clientId: Joi.string().alphanum().min(3).required(),
    clientToken: Joi.string().alphanum().min(3).required(),
});


//module.exports = registerSchema;
module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;
module.exports.clientSchema = clientSchema;