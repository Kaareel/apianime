require("dotenv").config()
const express = require('express')
const cors = require('cors')

const dbConnect = require('./config/mongo')
const animesRouters = require('./routes/animes')
const charactersRouters = require('./routes/characters')

const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3000

app.use(animesRouters)
app.use(charactersRouters)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    
})

dbConnect()