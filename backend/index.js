const bodyParser = require( 'body-parser');
const pool = require('./pool.js')
const express = require("express")
const app = express()
const cors = require("cors");

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded( {extended: true }))

app.use('/auth', require("./routes/authentication.js"))
app.use('/problem', require("./routes/problems.js"))
app.use()

const PORT = 8000

pool.connect().then( () => {

    app.listen(PORT, () => {
        console.log(`The server has started on http://localhost:${PORT}`)
    })

}).catch((err) => {
    console.log(err)
})