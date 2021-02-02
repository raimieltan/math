const router = require('express').Router();
const pool = require("../pool")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../jwt/jwtGenerator")
const authorization = require("../middleware/authorization")

//register

router.post( '/register', async ( req, res )  => {
    try {

        const { fname,lname, email, password } = req.body

        //check if existing

        const userCheck = await pool.query("SELECT * FROM users WHERE email = $1" , [email])

        if(userCheck.rows.length > 0 ) {
            return res.status(401).send("User already exist")
        }

        //generate new user 

        //bcrypt stuff

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = await bcrypt.hash(password, salt)

        const newUser = await pool.query("INSERT INTO users VALUES(default, $1, $2, $3, $4) RETURNING * " , [fname, lname, email, bcryptPassword])

        const token = jwtGenerator(newUser.rows[0].id)
        res.json( { token } )

    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
})

//login

router.post('/login' , async ( req, res ) => {
    try {

        const { email, password } = req.body;

        const user = await pool.query('SELECT * FROM users WHERE email = $1' , [email])

        if (user.rows.length === 0) {
            return res.status(401).json(("Password or Email is incorrect"))
        }

        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password)

        if(!isPasswordValid){
            return res.status(500).send('Password or Email is incorrect')
        }

        const token = jwtGenerator(user.rows[0].id)

        res.json({ token })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
})

module.exports = router