exports.seed = function (knex) {
    return knex.raw(`

  
      INSERT INTO choices VALUES(
        DEFAULT,
        '6',
        1
      ),

      (
        DEFAULT,
        '7',
        1
      ),

      (
        DEFAULT,
        '8',
        1
      ),

      (
        DEFAULT,
        '9',
        1
      )

    `)
  };
  