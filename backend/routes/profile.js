const router = require('express').Router();
const pool = require("../pool.js");
const claim = require("../jwt/jwtGenerator.js");

router.get('/profile', async (request, response) => {
  
  try {
    const fetchProfile = await pool.query('SELECT * FROM users WHERE user_id = $1', [])
  }
})