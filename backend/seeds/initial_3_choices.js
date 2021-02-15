exports.seed = function (knex) {
    return knex.raw(`

  
      INSERT INTO choices VALUES
      (
        DEFAULT,
        '6',
        1,
        TRUE
      ),

      (
        DEFAULT,
        '7',
        1,
        FALSE
      ),

      (
        DEFAULT,
        '8',
        1,
        FALSE
      ),

      (
        DEFAULT,
        '9',
        1,
        FALSE
      ),


      (
        DEFAULT,
        '8 Apples',
        2,
        TRUE
      ),

      (
        DEFAULT,
        '3 Apples',
        2,
        FALSE
      ),

      (
        DEFAULT,
        '2 Apples',
        2,
        FALSE
      ),

      (
        DEFAULT,
        '5 Apples',
        2,
        FALSE
      );

    `)
  };
  