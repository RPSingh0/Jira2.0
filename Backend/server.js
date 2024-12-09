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
const prisma = require("./db");

async function startServer() {
    try {
        // authenticating db for connection
        await prisma.$connect();
        console.log("Database connection has been established successfully.");

        // starting the server
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
    } catch (error) {
        console.log("Unable to connect to the database: ", error.message);
        process.exit(1);
    }
}

startServer();