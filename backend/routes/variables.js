const router = require('express').Router();
const { response } = require('express');
const pool = require("../pool.js")

//fetch variables
router.get('/fetch/:problemId', async (req, res) => {
  
  try{
    
    const { problemId } = req.params;
    const fetchValues = await pool.query('SELECT * FROM variable WHERE problem_id = $1', [problemId]);
    res.json(fetchValues.rows);
 
  }catch(error) {
    
    console.error("ERROR: ", error.message);
    res.json({ error: error.message });
  
  }
  
})

//insert variables
router.post('/assign/:problemId', async (req, res) => {
  
  try {

    const { problemId } = req.params;
    const { variable, min, max } = req.body;

    const sqlQuery = 'INSERT INTO variable VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *'
    const addVariable = await pool.query(sqlQuery, [problemId, variable, max, min])
    res.json(addVariable);
    
  } catch (error) {
    console.log("ERROR:", error.message);
  }
  
})

module.exports = router