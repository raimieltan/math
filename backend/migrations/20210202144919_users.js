
exports.up = function(knex) {
    return knex.raw(
        `
        CREATE TABLE users(
            id SERIAL NOT NULL PRIMARY KEY,
            fname TEXT NOT NULL,
            lname TEXT NOT NULL,
            username TEXT NOT NULL, 
            email TEXT NOT NULL

        )
        `
    )
  };
  
  exports.down = function(knex) {
    return knex.raw('DROP TABLE users');
  };