exports.seed = function (knex) {
    return knex.raw(`

      INSERT INTO variable VALUES (
        DEFAULT,
        1,
        'x',
        10,
        20
      ),

      (
        DEFAULT,
        1,
        'y',
        10,
        20 
      ),
      
      (
        DEFAULT,
        2,
        'x',
        10,
        20
      ),

      (
        DEFAULT,
        2,
        'y',
        10,
        20
      )
    `)
  };
  