const bodyParser = require( 'body-parser');
const pool = require('./pool.js')
const express = require("express")
const app = express()
const cors = require("cors");

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded( {extended: true }))

app.use('/auth', require("./routes/authentication.js"))
app.use('/problems', require("./routes/problems.js"))
app.use('/profile', require("./routes/profile.js"))
app.use("/verify", require("./routes/verify.js"))
app.use("/choices", require("./routes/choices.js"))
app.use('/variables', require("./routes/variables.js"))

const PORT = 8000

pool.connect().then( () => {

    app.listen(PORT, () => {
        console.log(`The server has started on http://localhost:${PORT}`)
    })

}).catch((err) => {
    console.log(err)
})