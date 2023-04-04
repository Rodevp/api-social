import express from "express"
import morgan from "morgan"

const app = express()
const PORT = 3000

app.use( morgan('dev') )


app.get('/', (req, res) => {
    res.send('Hello world')
})



app.listen(PORT, () => {
    console.log('server on port -> ', PORT)
})