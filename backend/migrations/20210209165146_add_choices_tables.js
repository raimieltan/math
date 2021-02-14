
exports.up = function(knex) {
    return knex.raw(
        `
        create table choices(
            id serial not null primary key,
            content text not null,
            problem_id int not null,
            foreign key(problem_id)
            References problems(problem_id));
        `
    )
  };
  
  exports.down = function(knex) {
    return knex.raw('DROP TABLE choices');
  };