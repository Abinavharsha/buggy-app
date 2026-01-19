export function up(knex) {
  return knex.schema.alterTable("user_activities", table => {
    table.index("user_id");
  });
}

export function down(knex) {
  return knex.schema.alterTable("user_activities", table => {
    table.dropIndex("user_id");
  });
}
