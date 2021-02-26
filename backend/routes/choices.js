const router = require('express').Router();
const { response } = require('express');
const pool = require("../pool.js")

//fetch choices
router.get('/fetch/:id', async (request, response) => {

  try {
    const { id } = request.params
    const fetchChoices = await pool.query('SELECT * FROM choices WHERE problem_id = $1', [id]);
    response.json(fetchChoices.rows);

  } catch (error) {

    console.log(error.message);
    response.status(500).send("Error Fetching Choices.");

  }
})

//assign choices
// router.post('/assign/:id', async (req, res) => {

//   try {

//     const sqlQuery = 'INSERT INTO choices VALUES (DEFAULT, $1, $2)';

//     const { id } = request.params;
//     const { choice } = request.body;
//     const newChoice = await pool.query(sqlQuery, [id, choice]);
//     response.json(newChoice.rows);

//   } catch (error) {

//     console.log(error.message);
//     response.status(500).send("Error Assigning Choices.");

//   }

// })


module.exports = router