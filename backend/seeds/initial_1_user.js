exports.seed = function(knex) {
  return knex.raw(
    `
      INSERT INTO users VALUES 
      (DEFAULT, 'John', 'Doe', 'johnDoe@gmail.com', 'password'),
      (DEFAULT, 'Jane', 'Doe', 'janeDoe@gmail.com', 'password')
    `
  )
};
