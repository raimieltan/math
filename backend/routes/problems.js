const router = require('express').Router();
const pool = require("../pool.js")

// router.post('/add-problem', async (request, response) => {

//   try {

//     const { problem } = request.body;
//     const addProblem = await pool.query(`INSERT INTO problem VALUES (DEFAULT, $1) RETURNING *`, [problem]);
//     response.json(addProblem.rows[0]);

//   } catch (error) {
    
//     console.log(error.message);
//     response.status(500).send("Error Creating Problem.");

//   }
// })

//fetch problems
router.get('/', async (request, response) => {

  try {
    
    const fetchProblems = await pool.query('SELECT * FROM problem');
    response.json(fetchProblems.rows);

  } catch (error) {
    
    console.log(error.message);
    response.status(500).send("Error Fetching Problems.");

  }
})

//create problem
router.post('/create', async (request, response) => {

  try {
    
    const { question, formula } = request.body;

    const newProblem = await pool.query('INSERT INTO problem VALUES (DEFAULT, $1, $2) RETURNING *', [question, formula]);
    response.json(newProblem);
    
  } catch (error) {
    console.log("ERROR:", error.message);
  }
}) 

module.exports = router