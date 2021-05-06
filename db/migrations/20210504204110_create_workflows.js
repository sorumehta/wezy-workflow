
exports.up = function(knex) {
    return knex.schema.createTable('workflows', t => {
        t.increments('id').primary()
        t.string('name')
        t.jsonb('workflow')
        t.boolean('is_active').defaultTo(false)
        t.integer('account_id').references('accounts.id')
        t.jsonb('additional_attributes').defaultTo({})
        t.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('workflows')
};
