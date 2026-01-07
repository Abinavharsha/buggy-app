export function up(knex) {
  return knex.schema.createTable("activity_logs", table => {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.integer("activity_id").notNullable();
    table.string("action").notNullable();
    table.json("metadata");               // unbounded payload
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("activity_logs");
}
