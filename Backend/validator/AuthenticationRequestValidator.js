const Joi = require("joi");

exports.LoginRequest = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.email': "Please provide a valid email",
            'string.empty': "Email cannot be empty",
            'any.required': "Email is required"
        }),

    password: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': "Password cannot be empty",
            'any.required': "Password is required"
        })
});