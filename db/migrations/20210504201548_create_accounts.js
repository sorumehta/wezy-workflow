
exports.up = function(knex) {
    return knex.schema.createTable('accounts', t => {
        t.increments('id').primary()
        t.string('username').notNullable()
        t.string('email').notNullable()
        t.string('encrypted_password').notNullable()
        t.boolean('is_verified').defaultTo(false)
        t.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('accounts')
};
