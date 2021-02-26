exports.up = function (knex) {
  return knex.raw(
    `
      create table choices(
        id serial not null primary key,
        problem_id INTEGER NOT NULL,
        choice TEXT NOT NULL
      )
    `
  )
};

exports.down = function (knex) {
  return knex.raw('DROP TABLE choices');
};