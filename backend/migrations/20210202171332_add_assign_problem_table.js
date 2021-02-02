
exports.up = function(knex) {
  return knex.raw(
    `
      CREATE TABLE assign_problem(
        assign_problem_id SERIAL NOT NULL PRIMARY KEY,
        quiz_id INT NOT NULL,
        problem_id INT NOT NULL
      )
    `
  )
};

exports.down = function(knex) {
  return knex.raw('DROP TABLE assign_problem');
};
