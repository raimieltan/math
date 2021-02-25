
exports.up = function(knex) {
  return knex.raw(
    // `
    //   CREATE TABLE problems(
    //     problem_id SERIAL NOT NULL PRIMARY KEY,
    //     problem_title TEXT NOT NULL,
    //     problem_solution TEXT,
    //     problem_answer TEXT NOT NULL
    //   )
    // `
    `
      CREATE TABLE problem(
        id SERIAL NOT NULL PRIMARY KEY,
        problem_question TEXT NOT NULL,
        problem_formula TEXT NOT NULL,
        variable_min INTEGER NOT NULL,
        variable_max INTEGER NOT NULL
      )
    `
  )
};

exports.down = function(knex) {

  return knex.raw(`

    DROP TABLE problems;

  `)
};
