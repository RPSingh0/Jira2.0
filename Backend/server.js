const dotenv = require("dotenv");
const serverless = require('serverless-http');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * importing env-config file as per the NODE_ENV specified using dotenv
 */
dotenv.config({
    path: `./envConfig/config.env.${process.env.NODE_ENV}`
});

/**
 * Initialize application
 */
const app = require('./app');

/**
 * Database connection
 */
const {dbConnection} = require("./db");

dbConnection.connect((err) => {
    if (err) {
        console.log(`Unable to connect to DB: ${err.message}`);
        process.exit(1);
    } else {
        console.log('Connected to DB');
    }
});

/**
 * Run server based on environment
 */
if (process.env.NODE_ENV === 'dev') {
    const port = process.env.PORT || 3000;
    app.listen(port, '0.0.0.0', () => {
        console.log(`Application is running on port: ${port}...`);
    });
} else {
    /**
     * Code for lambda
     */
    module.exports.handler = serverless(app);
}