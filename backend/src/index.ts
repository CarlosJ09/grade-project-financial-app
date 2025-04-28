import express from 'express'

const port = 3000

const app = express();

app.get('/', (req, res) => {
    res.send('TEST')
})

app.listen(port, () => {
    console.log('Financial App is listening on port ${port}')
})