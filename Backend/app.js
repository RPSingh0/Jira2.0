const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./utils/errorHandler');

const app = express();

/**
 * Adding support for full url in logging
 */
morgan.token('fullUrl', function (req) {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
});

app.use(morgan(':method :fullUrl :status :res[content-length] - :response-time ms'));

/**
 * using express's json middleware for parsing request/response body to json
 */
app.use(express.json());

/**
 * If path is not defined, raising error which will be caught by global exception handler
 */
app.use('*', (req, res, next) => {
    next(new Error(`Can't find : ${req.originalUrl} on this server!`));
});

/**
 * Global exception handler
 */
app.use(globalErrorHandler);

module.exports = app;