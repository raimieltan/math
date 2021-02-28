exports.seed = function (knex) {
  return knex.raw(`
    INSERT INTO problem VALUES 
    (
      DEFAULT, 
      'What is x + y?', 
      'x + y', 
      0,
      null
    ),

    (
      DEFAULT,
      'What is x - y?',
      'x - y', 
      1,
      4
    )
  `)
};
