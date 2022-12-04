const express = require('express')
const app = express()

const reposList = require('./repos.json')

const PORT = process.env.PORT || 4444;
console.log(PORT)

app.get('/repositories', (req, res) => {
    res.json(reposList)
})

app.get('/commits', (req, res) => {
    res.send('Commits')
})

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))