export function up(knex) {
  return knex.schema.createTable("dashboard_views", table => {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.timestamp("viewed_at").notNullable();
    table.text("user_agent");
    table.text("ip_address");
    table.text("raw_headers");
    table.text("session_dump");
    table.text("debug_payload");
  });
}

export function down(knex) {
  return knex.schema.dropTable("dashboard_views");
}
