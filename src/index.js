const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const routes = require('./routes')

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.use(routes)

app.listen(process.env.PORT || 3333, () => console.log('running in port 3333'))
