export function up(knex) {
  return knex.schema.createTable("activities", table => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("type").notNullable(); // lab, course, task, etc.
    table.text("description");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("activities");
}
