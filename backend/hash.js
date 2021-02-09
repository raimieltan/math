const bcrypt = require('bcryptjs');
const pool = require('./pool.js');

pool.connect((error, client) => {
  client.query('SELECT * FROM users')
    .then((results) => {
      for (const user of results.rows) {
        bcrypt.hash(user.password, 12)
          .then((hash) => {
            client.query('UPDATE users SET password = $1 WHERE id = $2', [hash, user.id])
          })
          .catch((error) => {
            console.log("Error hashing password: ", error);
          })
      }
    })
})