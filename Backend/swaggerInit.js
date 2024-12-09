const swaggerJsDocs = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Jira API",
            version: "1.0.0",
            description: "A backend application for Jira API",
            contact: {
                name: "Rupinder Pal Singh",
                url: "https://rpsr.in",
                email: "rpalsingh715@gmail.com"
            }
        },
        components: {
            securitySchemes: {
                Authorization: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    value: "Bearer <JWT token here>"
                }
            }
        },
        servers: [
            {
                url: process.env.SERVER_URL
            }
        ]
    },
    apis: [
        "./routes/**/*.js",
        "./routes/**/*.yaml"
    ]
};

const specs = swaggerJsDocs(options);
module.exports = specs;