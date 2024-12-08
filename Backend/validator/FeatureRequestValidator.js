const Joi = require("joi");

exports.FeatureCreateRequest = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.min': "Feature name must be at least 3 characters",
            'string.max': "Feature name should not exceed 100 characters",
            'string.empty': "Feature name cannot be empty",
            'any.required': "Feature name is required"
        }),

    description: Joi.string()
        .required()
        .messages({
            'string.empty': "Project description cannot be empty",
            'any.required': "Project description is required"
        }),

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

exports.GetFeatureOptionsRequest = Joi.object({
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

exports.UpdateFeatureNameRequest = Joi.object({
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

    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.min': "Feature name must be at least 3 characters",
            'string.max': "Feature name should not exceed 100 characters",
            'string.empty': "Feature name cannot be empty",
            'any.required': "Feature name is required"
        })
});

exports.UpdateFeatureDescriptionRequest = Joi.object({
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

    description: Joi.string()
        .required()
        .messages({
            'string.empty': "Project description cannot be empty",
            'any.required': "Project description is required"
        })
});

exports.GetFeatureByProjectKeyAndFeatureKey = Joi.object({
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

exports.GetFeatureByProjectKey = Joi.object({
    search: Joi.string()
        .trim()
        .allow('')
        .default(''),

    page: Joi.number()
        .integer()
        .min(1)
        .default(1)
        .messages({
            'number.base': "Page must be a number",
            'number.integer': "Page must be an integer",
            'number.min': "Page must be at least 1"
        }),

    pageSize: Joi.number()
        .integer()
        .min(1)
        .default(6)
        .messages({
            'number.base': "Page size must be a number",
            'number.integer': "Page size must be an integer",
            'number.min': "Page size must be at least 1"
        }),

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