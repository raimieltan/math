const router = require('express').Router();
const pool = require("../pool")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../jwt/jwtGenerator")
const authorization = require("../middleware/authorization")

//register

router.post('/register', async (req, res) => {
    try {

        const { fname, lname, username, password } = req.body

        //check if existing

        const userCheck = await pool.query("SELECT * FROM users WHERE user_username = $1", [username])

        if (userCheck.rows.length > 0) {
            return res.status(401).send("User already exist")
        }

        //generate new user 

        //bcrypt stuff

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = await bcrypt.hash(user_password, salt)

        const newUser = await pool.query("INSERT INTO users VALUES(default, $1, $2, $3, $4) RETURNING * ", [fname, lname, username, bcryptPassword])

        const token = jwtGenerator(newUser.rows[0].id)
        res.json({ token })

    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
})

//login

router.post('/login', async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await pool.query('SELECT * FROM users WHERE user_username = $1', [username])

        if (user.rows.length === 0) {
            return res.status(401).json(("Password or Username is incorrect"))
        }

        const isPasswordValid = await bcrypt.compare(password, user.rows[0].user_password)

        if (!isPasswordValid) {
            return res.status(500).send('Password or Username is incorrect')
        }

        const token = jwtGenerator(user.rows[0].id)

        res.json({ token })

    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
})

module.exports = router