exports.seed = function (knex) {
  return knex.raw(`
    INSERT INTO problems VALUES (
      DEFAULT, 
      'Add 1 + 5', 
      '1 + 5 = 6', 
      '6'
    )
  `)
};
