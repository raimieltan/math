
exports.up = function(knex) {
  return knex.raw(
    `
      CREATE TABLE problems(
        problem_id SERIAL NOT NULL PRIMARY KEY,
        problem_title TEXT NOT NULL,
        problem_solution TEXT,
        problem_answer TEXT NOT NULL
      )
    `
  )
};

exports.down = function(knex) {

  return knex.raw(`

    DROP TABLE problems;
    DROP TABLE choices;

  `)
};
