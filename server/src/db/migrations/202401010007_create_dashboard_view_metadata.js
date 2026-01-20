export function up(knex) {
  return knex.schema.createTable("dashboard_view_metadata", table => {
    table.increments("id").primary();
    table.integer("dashboard_view_id").notNullable();
    table.text("user_agent");
    table.text("ip_address");
    table.text("raw_headers");
    table.text("session_dump");
    table.text("debug_payload");
  });
}

export function down(knex) {
  return knex.schema.dropTable("dashboard_view_metadata");
}
