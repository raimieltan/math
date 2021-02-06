const router = require('express').Router();
const pool = require("../pool")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../jwt/jwtGenerator")
const authorization = require("../middleware/authorization")

//register

router.post('/register', async (req, res) => {
    try {

        const { user_fname, user_lname, user_username, user_password } = req.body

        //check if existing

        const userCheck = await pool.query("SELECT * FROM users WHERE user_username = $1", [user_username])

        if (userCheck.rows.length > 0) {
            return res.status(401).send("User already exist")
        }

        //generate new user 

        //bcrypt stuff

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = await bcrypt.hash(user_password, salt)

        const newUser = await pool.query("INSERT INTO users VALUES(default, $1, $2, $3, $4) RETURNING * ", [user_fname, user_lname, user_username, bcryptPassword])

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

        const { user_username, user_password } = req.body;

        const user = await pool.query('SELECT * FROM users WHERE user_username = $1', [user_username])

        if (user.rows.length === 0) {
            return res.status(401).json(("Password or user_username is incorrect"))
        }

        const isPasswordValid = await bcrypt.compare(user_password, user.rows[0].password)

        if (!isPasswordValid) {
            return res.status(500).send('Password or user_username is incorrect')
        }

        const token = jwtGenerator(user.rows[0].id)

        res.json({ token })

    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
})

module.exports = router