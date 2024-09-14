const dotenv = require("dotenv");

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
 * TODO: Database connection
 */

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
     * TODO: Add support for lambda
     */
}