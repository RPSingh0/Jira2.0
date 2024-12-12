const Joi = require('joi');

exports.CreateProjectCommentRequest = Joi.object({
    projectKey: Joi.string()
        .trim()
        .max(30)
        .required()
        .messages({
            'string.base': "Project key should be a string",
            'string.max': "Project key should not exceed 100 characters",
            'string.empty': "Project key cannot be empty",
            'any.required': "Project key is required"
        }),

    content: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.min': "Comment should be at least 3 characters",
            'string.empty': "Comment cannot be empty",
            'any.required': "Comment is required"
        })
});

exports.GetProjectCommentRequest = Joi.object({
    projectKey: Joi.string()
        .trim()
        .max(30)
        .required()
        .messages({
            'string.base': "Project key should be a string",
            'string.max': "Project key should not exceed 100 characters",
            'string.empty': "Project key cannot be empty",
            'any.required': "Project key is required"
        })
});

exports.CreateFeatureCommentRequest = Joi.object({
    projectKey: Joi.string()
        .trim()
        .max(30)
        .required()
        .messages({
            'string.base': "Project key should be a string",
            'string.max': "Project key should not exceed 100 characters",
            'string.empty': "Project key cannot be empty",
            'any.required': "Project key is required"
        }),

    featureKey: Joi.string()
        .trim()
        .max(30)
        .required()
        .messages({
            'string.base': "Feature key should be a string",
            'string.max': "Feature key should not exceed 100 characters",
            'string.empty': "Feature key cannot be empty",
            'any.required': "Feature key is required"
        }),

    content: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.min': "Comment should be at least 3 characters",
            'string.empty': "Comment cannot be empty",
            'any.required': "Comment is required"
        })
});

exports.GetFeatureCommentRequest = Joi.object({
    projectKey: Joi.string()
        .trim()
        .max(30)
        .required()
        .messages({
            'string.base': "Project key should be a string",
            'string.max': "Project key should not exceed 100 characters",
            'string.empty': "Project key cannot be empty",
            'any.required': "Project key is required"
        }),

    featureKey: Joi.string()
        .trim()
        .max(30)
        .required()
        .messages({
            'string.base': "Feature key should be a string",
            'string.max': "Feature key should not exceed 100 characters",
            'string.empty': "Feature key cannot be empty",
            'any.required': "Feature key is required"
        })
});