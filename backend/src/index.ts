import express from 'express'
import { userRoutes } from '@/interface/routes/userRoutes'

const { BACKEND_PORT } = process.env

const app = express();

app.use(express.json());
app.use(userRoutes);

app.listen(BACKEND_PORT, () => {
    console.log(`Financial app listening on port ${BACKEND_PORT}`)
})