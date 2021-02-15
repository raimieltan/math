const router = require('express').Router();
const { response } = require('express');
const pool = require("../pool.js")

//fetch variables
router.get('/', async (req, res) => {
  
  try{
    
    const fetchValues = await pool.query('SELECT * FROM variables');
    res.json(fetchValues.rows);
 
  }catch(error) {
    
    console.error("ERROR: ", error.message);
    res.json({ error: error.message });
  
  }
  
})  

module.exports = router