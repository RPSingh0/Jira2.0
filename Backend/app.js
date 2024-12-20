const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const globalErrorHandler = require('./utils/errorHandler');
const swaggerUi = require('swagger-ui-express');
const specs = require("./swaggerInit");
const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const featureRouter = require('./routes/featureRoutes');
const jiraRouter = require('./routes/jiraRoutes');
const commentRouter = require('./routes/commentRoutes');

const app = express();
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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
 * TODO: To be removed on project completion
 * Added delay to see loading states properly on frontend
 */
app.use((req, res, next) => {
    setTimeout(() => {
        next();
    }, 1000);
})

/**
 * Application routes
 */
app.use('/api/v1/user', userRouter);
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/feature', featureRouter);
app.use('/api/v1/jira', jiraRouter);
app.use('/api/v1/comment', commentRouter);

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