exports.up = function(knex) { 
    return knex.schema.createTable('reviews', function(table) {

      table.increments();

      table.string('name').notNullable();
      table.string('description').notNullable();
      table.decimal('rate').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('reviews');
  };