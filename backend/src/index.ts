import express from 'express'

import { userRoutes } from '@/interface/routes/userRoutes'
import { bankRoutes } from '@/interface/routes/bankRoutes'

const { BACKEND_PORT } = process.env

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(bankRoutes);

app.listen(BACKEND_PORT, () => {
    console.log(`Financial app listening on port ${BACKEND_PORT}`)
})