exports.seed = function(knex) {
  return knex.raw(`
    INSERT INTO users VALUES (DEFAULT, 'John', 'Doe', 'johnDoe', 'password');
    INSERT INTO users VALUES (DEFAULT, 'Jane ', 'Doe', 'janeDoe', 'password');
  `)
};
