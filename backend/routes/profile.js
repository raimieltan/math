const router = require('express').Router();
const pool = require("../pool.js");
const authorization = require("../middleware/authorization.js");

router.get('/', authorization, async (request, response) => {

  try {
    const fetchProfile = await pool.query('SELECT * FROM users WHERE id = $1', [request.user])

    response.json(fetchProfile.rows)
    console.log(request);
    // response.json({user: fetchProfile.rows[0]});

  } catch (error) {
    console.error("Error fetching user.", error.message);
    response.status(500).json({ error: error.message });
  }
})

module.exports = router;