
exports.up = function(knex) {
  return knex.raw(
    `
      CREATE TABLE assign_quiz(
        assign_quiz_id SERIAL NOT NULL PRIMARY KEY,
        quiz_id INT NOT NULL,
        user_id INT NOT NULL
      )
    `
  )
};

exports.down = function(knex) {
  return knex.raw('DROP TABLE assign_quiz');
};
