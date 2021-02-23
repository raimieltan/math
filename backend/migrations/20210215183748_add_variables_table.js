
exports.up = function(knex) {
  return knex.raw(
    `
      CREATE TABLE variables(
        variable_id SERIAL NOT NULL PRIMARY KEY,
        variable_x INT NOT NULL,
        variable_y INT NOT NULL
      )
    `
  );
};

exports.down = function(knex) {
  return knex.raw('DROP TABLE variables');
};
