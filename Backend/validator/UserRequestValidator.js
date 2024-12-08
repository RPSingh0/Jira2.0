const Joi = require('joi');

exports.UserCreateRequest = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.min': "First name must be at least 3 characters",
            'string.max': "First name should not exceed 30 characters",
            'string.empty': "First name cannot be empty",
            'any.required': "First name is required"
        }),

    lastName: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.min': "Last name must be at least 3 characters",
            'string.max': "Last name should not exceed 30 characters",
            'string.empty': "Last name cannot be empty",
            'any.required': "Last name is required"
        }),

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.email': "Please provide a valid email",
            'any.required': "Email is required",
        }),

    profileImage: Joi.string()
        .trim()
        .uri()
        .required()
        .messages({
            'string.uri': "Please provide a valid uri",
            'string.empty': "Profile image cannot be empty",
            'any.required': "Profile image is required"
        }),

    password: Joi.string()
        .trim()
        .min(8)
        .max(32)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,32}$/)
        .required()
        .messages({
            'string.min': "Password must be at least 8 characters",
            'string.max': "Password should not exceed 32 characters",
            'string.pattern.base': "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
            'string.empty': "Password cannot be empty",
            'any.required': "Password is required",
        })
});