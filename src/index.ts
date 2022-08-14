import express from 'express'
import bodyParser from 'body-parser'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import homeworkRoute from './routes/homework'
import cors from 'cors'

config()

const app = express()
connect(process.env.MONGO_URI!, () => {
    console.log('connected to the database');
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use('/homework', homeworkRoute)

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.clear()
    console.log('server started')
})