
exports.up = function(knex) {
    return knex.raw(
        `
        CREATE TABLE users(
            user_id SERIAL NOT NULL PRIMARY KEY,
            user_fname TEXT NOT NULL,
            user_lname TEXT NOT NULL,
            user_email TEXT NOT NULL,
            user_password TEXT NOT NULL

        )
        `
    )
  };
  
  exports.down = function(knex) {
    return knex.raw('DROP TABLE users');
  };