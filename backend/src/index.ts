import express from 'express';

import { swaggerOptions } from '@/infraestructure/config/Swagger';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { Database } from '@/infraestructure/config/Database';
import { errorHandler } from '@/presentation/middleware/errorHandler';
import { apiRouter } from '@/presentation/routes';

const { PORT } = process.env;

const app = express();
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(express.json());

app.use('/api', apiRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

async function startApplication() {
  try {
    await Database.connect();

    app.listen(PORT, () => {
      console.log(`🚀 Financial app listening on port ${PORT}`);
      console.log(
        `🔗 Swagger docs available at http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

startApplication();
