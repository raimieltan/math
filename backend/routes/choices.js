const router = require('express').Router();
const pool = require("../pool.js")




//fetch choices
router.get('/:id', async (request, response) => {

  try {
    const { id } = request.params
    const fetchChoices = await pool.query('SELECT * FROM choices WHERE problem_id = $1' , [id]);
    response.json(fetchChoices.rows);

  } catch (error) {
    
    console.log(error.message);
    response.status(500).send("Error Fetching Choices.");

  }
})

module.exports = router