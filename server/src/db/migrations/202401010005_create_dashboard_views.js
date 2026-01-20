export function up(knex) {
  return knex.schema.createTable("dashboard_views", table => {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.timestamp("viewed_at").notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable("dashboard_views");
}
