exports.seed = function (knex) {
  return knex.raw(`
    INSERT INTO problems VALUES (
      DEFAULT, 
      'Arrange these in order from least price to greatest price: Ruler-$0.55, Pen-$0.89, Notebook-$0.95, Sharpener-$0.69', 
      null, 
      'C', 
      '{ "A": "Ruler, Sharpener, Notebook, Pen", "B": "Ruler, Pen, Sharpener, Notebook",
      "C": "Ruler, Sharpener, Pen, Notebook", "D": "Sharpener, Ruler, Pen, Notebook" }'
    )
  `)
};
