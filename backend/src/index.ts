import express from 'express'

import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { swaggerOptions } from '@/infraestructure/config/swagger'

import { userRoutes } from '@/interface/routes/UserRoutes'
import { bankRoutes } from '@/interface/routes/BankRoutes'

const { BACKEND_PORT } = process.env

const app = express();
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(userRoutes);
app.use(bankRoutes);

app.listen(BACKEND_PORT, () => {
    console.log(`Financial app listening on port ${BACKEND_PORT}`)
})