import express from 'express'

import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { swaggerOptions } from '@/infraestructure/config/swagger'

import { apiRouter } from '@/presentation/routes'
import { errorHandler } from '@/presentation/middleware/errorHandler'

const { BACKEND_PORT } = process.env

const app = express();
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(express.json());

app.use('/api', apiRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

app.listen(BACKEND_PORT, () => {
    console.log(`Financial app listening on port ${BACKEND_PORT}`)
})