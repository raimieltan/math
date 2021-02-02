
exports.up = function(knex) {
  return knex.raw(
    `
      CREATE TABLE problem(
        problem_id SERIAL NOT NULL PRIMARY KEY,
        problem TEXT NOT NULL
      )
    `
  )
};

exports.down = function(knex) {
  return knex.raw('DROP TABLE problem');
};
