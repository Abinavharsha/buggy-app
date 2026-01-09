export async function up(knex) {
  await knex.schema.createTable("auth_tokens", table => {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.text("token").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTable("auth_tokens");
}
