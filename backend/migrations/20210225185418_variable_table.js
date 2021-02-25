
exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE variable(
      variable_id SERIAL NOT NULL PRIMARY KEY,
      problem_id INTEGER NOT NULL,
      variable TEXT NOT NULL,
      variable_min INTEGER NOT NULL,
      variable_max INTEGER NOT NULL
    )
  `)
};

exports.down = function(knex) {
  return knex.raw('DROP TABLE variable')
};
