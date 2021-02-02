
exports.up = function(knex) {
  return knex.raw(
    `
    CREATE TABLE quiz(
      quiz_id SERIAL NOT NULL PRIMARY KEY,
      quiz_score INTEGER NOT NULL
    )
    `
)
};

exports.down = function(knex) {
  return knex.raw('DROP TABLE quiz');
};
