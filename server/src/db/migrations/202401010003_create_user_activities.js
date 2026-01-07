export function up(knex) {
  return knex.schema.createTable("user_activities", table => {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.integer("activity_id").notNullable();
    table.string("status").notNullable(); // started, completed
    table.integer("score");
    table.timestamp("completed_at");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("user_activities");
}
