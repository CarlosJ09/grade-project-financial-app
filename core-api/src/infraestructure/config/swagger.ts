import { SwaggerOptions } from 'swagger-ui-express';

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
        url: `${process.env.HOST_URL}/api`,
        description: 'Development server',
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
  apis: ['src/presentation/routes/*.ts'],
};
