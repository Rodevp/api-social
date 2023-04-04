import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import { connectDb } from "./db.js"

dotenv.config()

const app = express()
const PORT = 3000

app.use( morgan('dev') )


app.get('/', (req, res) => {
    res.send('Hello world')
})


connectDb()
    .then(() => {
        console.log('connect to db ')
    })
    .catch(err => {
        console.error('error connect to db')
    })

app.listen(PORT, () => {
    console.log('server on port -> ', PORT)
})