import { SwaggerOptions } from "swagger-ui-express";

export const swaggerOptions: SwaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Financial API',
            version: '1.0.0',
            description: 'API documentation Swagger',
        },
        servers: [
            {
                url: `http://localhost:${process.env.BACKEND_PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['src/interface/routes/*.ts'],
};