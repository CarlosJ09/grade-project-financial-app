import express from 'express'

const { BACKEND_PORT } = process.env

const app = express();

app.get('/', (req, res) => {
    res.send('TEST')
})

app.listen(BACKEND_PORT, () => {
    console.log(`Financial app listening on potr ${BACKEND_PORT}`)
})