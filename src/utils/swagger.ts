import swaggerJSDoc from 'swagger-jsdoc';

import { openApiDocs } from '../docs/index.js';
import { config } from '../config/index.js';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BudgetBuddy API',
      version: '1.0.0',
      description: 'API documentation for BudgetBuddy backend',
    },
    paths: openApiDocs,
    servers: [{ url: `http://localhost:3000${config.ROOT_API}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'],
});
