export function up(knex) {
  return knex.schema.createTable("api_logs", table => {
    table.increments("id").primary();
    table.string("method").notNullable();
    table.string("path").notNullable();
    table.integer("status_code").notNullable();
    table.integer("response_time_ms").notNullable();
    table.text("payload");               // large, rarely queried
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("api_logs");
}
