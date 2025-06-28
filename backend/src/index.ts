import express from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from '@/infraestructure/config/Swagger';

import { apiRouter } from '@/presentation/routes';
import { errorHandler } from '@/presentation/middleware/errorHandler';
import { Database } from '@/infraestructure/config/Database';

const { BACKEND_PORT } = process.env;

const app = express();
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(express.json());

app.use('/api', apiRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

async function startApplication() {
  try {
    await Database.connect();

    app.listen(BACKEND_PORT, () => {
      console.log(`🚀 Financial app listening on port ${BACKEND_PORT}`);
      console.log(
        `🔗 Swagger docs available at http://localhost:${BACKEND_PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

startApplication();
