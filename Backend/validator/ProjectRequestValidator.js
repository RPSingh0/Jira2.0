const Joi = require('joi');

exports.ProjectKeyGenerateRequest = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.min': "Project name must be at least 3 characters",
            'string.max': "Project name should not exceed 100 characters",
            'string.empty': "Project name cannot be empty",
            'any.required': "Project name is required"
        })
});

exports.ProjectCreateRequest = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.min': "Project name must be at least 3 characters",
            'string.max': "Project name should not exceed 100 characters",
            'string.empty': "Project name cannot be empty",
            'any.required': "Project name is required"
        }),

    description: Joi.string()
        .required()
        .messages({
            'string.empty': "Project description cannot be empty",
            'any.required': "Project description is required"
        }),

    projectLeadBy: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.email': "Please provide a valid email for project lead",
            'any.required': "Project lead email is required",
        }),

    startDate: Joi.date()
        .iso()
        .required()
        .messages({
            'date.format': "Please provide a valid start date in ISO format",
            'any.required': "Project start date is required",
        }),

    endDate: Joi.date()
        .iso()
        .required()
        .custom((value, helpers) => {
            const {startDate} = helpers.state.ancestors[0];

            if (new Date(value) <= new Date(startDate)) {
                return helpers.message("End date must be grater than start date");
            }

            return value;
        })
        .messages({
            'date.format': "Please provide a valid end date in ISO format",
            'any.required': "Project end date is required",
        })
});

exports.UpdateProjectDescriptionRequest = Joi.object({
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

    description: Joi.string()
        .required()
        .messages({
            'string.empty': "Project description cannot be empty",
            'any.required': "Project description is required"
        })
});

exports.UpdateProjectLeadRequest = Joi.object({
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

    projectLeadBy: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.email': "Please provide a valid email for project lead",
            'any.required': "Project lead email is required",
        })
});