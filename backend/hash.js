const bcrypt = require('bcryptjs');
const pool = require('./pool.js');

pool.connect((error, client) => {
  client.query('SELECT * FROM users')
    .then((results) => {
      for (const user of results.rows) {
        bcrypt.hash(user.user_password, 12)
          .then((hash) => {
            client.query('UPDATE users SET user_password = $1 WHERE user_id = $2', [hash, user.user_id])
          })
          .catch((error) => {
            console.log("Error hashing password: ", error);
          })
      }
    })
})