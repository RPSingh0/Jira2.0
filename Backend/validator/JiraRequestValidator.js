const Joi = require("joi");

exports.JiraCreateRequest = Joi.object({
    summary: Joi.string()
        .trim()
        .min(3)
        .max(256)
        .required()
        .messages({
            'string.min': "Jira summary must be at least 3 characters long",
            'string.max': "Jira summary should not exceed 256 characters",
            'string.empty': "Jira summary cannot be empty",
            'any.required': "Jira summary is required"
        }),

    jiraType: Joi.string()
        .trim()
        .valid('STORY', 'BUG', 'TASK')
        .required()
        .messages({
            'string.empty': "Jira type cannot be empty",
            'any.only': "Jira type must be one of STORY, BUG or TASK",
            'any.required': "Jira type is required"
        }),

    description: Joi.string()
        .required()
        .messages({
            'string.empty': "Jira description cannot be empty",
            'any.required': "Jira description is required"
        }),

    jiraPoint: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': "Jira point must be a number",
            'number.integer': "Jira point must be an integer",
            'number.min': "Jira point must be at least 1",
            'any.required': "Jira point is required"
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

    assignee: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.email': "Please provide a valid email for assignee",
            'any.required': "Assignee email is required",
        }),

    reporter: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.email': "Please provide a valid email for reporter",
            'any.required': "Reporter email is required",
        })
});

exports.GetJiraDetailsByJiraKeyRequest = Joi.object({
    jiraKey: Joi.string()
        .trim()
        .max(30)
        .required()
        .messages({
            'string.base': "Jira key should be a string",
            'string.max': "Jira key should not exceed 100 characters",
            'string.empty': "Jira key cannot be empty",
            'any.required': "Jira key is required"
        })
});

exports.GetJiraMetadataByJiraKeyRequest = Joi.object({
    jiraKey: Joi.string()
        .trim()
        .max(30)
        .required()
        .messages({
            'string.base': "Jira key should be a string",
            'string.max': "Jira key should not exceed 100 characters",
            'string.empty': "Jira key cannot be empty",
            'any.required': "Jira key is required"
        })
});

exports.GetJiraUnderFeatureRequest = Joi.object({
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

exports.UpdateJiraSummaryRequest = Joi.object({
    jiraKey: Joi.string()
        .trim()
        .max(30)
        .required()
        .messages({
            'string.base': "Jira key should be a string",
            'string.max': "Jira key should not exceed 100 characters",
            'string.empty': "Jira key cannot be empty",
            'any.required': "Jira key is required"
        }),

    summary: Joi.string()
        .trim()
        .min(3)
        .max(256)
        .required()
        .messages({
            'string.min': "Jira summary must be at least 3 characters long",
            'string.max': "Jira summary should not exceed 256 characters",
            'string.empty': "Jira summary cannot be empty",
            'any.required': "Jira summary is required"
        })
});

exports.UpdateJiraDescriptionRequest = Joi.object({
    jiraKey: Joi.string()
        .trim()
        .max(30)
        .required()
        .messages({
            'string.base': "Jira key should be a string",
            'string.max': "Jira key should not exceed 100 characters",
            'string.empty': "Jira key cannot be empty",
            'any.required': "Jira key is required"
        }),

    description: Joi.string()
        .required()
        .messages({
            'string.empty': "Jira description cannot be empty",
            'any.required': "Jira description is required"
        })
});

exports.UpdateJiraAssigneeRequest = Joi.object({
    jiraKey: Joi.string()
        .trim()
        .max(30)
        .required()
        .messages({
            'string.base': "Jira key should be a string",
            'string.max': "Jira key should not exceed 100 characters",
            'string.empty': "Jira key cannot be empty",
            'any.required': "Jira key is required"
        }),

    assignee: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.email': "Please provide a valid email for assignee",
            'any.required': "Assignee email is required",
        })
});

exports.UpdateJiraPointsRequest = Joi.object({
    jiraKey: Joi.string()
        .trim()
        .max(30)
        .required()
        .messages({
            'string.base': "Jira key should be a string",
            'string.max': "Jira key should not exceed 100 characters",
            'string.empty': "Jira key cannot be empty",
            'any.required': "Jira key is required"
        }),

    jiraPoint: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': "Jira point must be a number",
            'number.integer': "Jira point must be an integer",
            'number.min': "Jira point must be at least 1",
            'any.required': "Jira point is required"
        })
});

exports.UpdateJiraFeatureRequest = Joi.object({
    jiraKey: Joi.string()
        .trim()
        .max(30)
        .required()
        .messages({
            'string.base': "Jira key should be a string",
            'string.max': "Jira key should not exceed 100 characters",
            'string.empty': "Jira key cannot be empty",
            'any.required': "Jira key is required"
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