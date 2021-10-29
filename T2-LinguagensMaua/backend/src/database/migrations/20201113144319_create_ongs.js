exports.up = function(knex) { // up: criação da tabela
    return knex.schema.createTable('users', function(table) {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users'); //no caso de precisar deletar a tabela
  };