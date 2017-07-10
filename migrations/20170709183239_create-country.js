
exports.up = function(knex, Promise) {
  return knex.schema.createTable('country', (table) => {
    table.increments();
    table.text('name');
    table.integer('population');
    table.integer('area_rank');
    table.text('continent');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('country');
};
