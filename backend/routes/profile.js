const router = require('express').Router();
const pool = require("../pool.js");
const authorization = require("../middleware/authorization.js");

router.get('/profile', authorization, async (request, response) => {

  try {
    const fetchProfile = await pool.query('SELECT * FROM users WHERE user_id = $1', [request.user])
    console.log(request);
    // response.json({user: fetchProfile.rows[0]});

  } catch (error) {
    console.error("Error fetching user.", error.message);
    response.status(500).json({ error: error.message });
  }
})

module.exports = router;