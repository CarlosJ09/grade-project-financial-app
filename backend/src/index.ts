import express from 'express'

const { PORT } = process.env

const app = express();

app.get('/', (req, res) => {
    res.send('TEST')
})

app.listen(PORT, () => {
    console.log(`Financial app listening on port ${PORT}`)
})