const Joi = require("joi");

exports.PaginationValidators = {
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
        })
}