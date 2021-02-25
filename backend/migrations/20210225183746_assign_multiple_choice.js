
exports.up = function(knex) {
  return knex.raw(
    `
    CREATE TABLE assign_multiple_choice(
      multiple_choice_id SERIAL NOT NULL PRIMARY KEY,
      problem_id INT NOT NULL,
      choice TEXT NOT NULL
    )
  `)
};

exports.down = function(knex) {
  return knex.raw('DROP TABLE assign_multiple_choices')
};
