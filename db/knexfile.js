// Update with your config settings.

module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            database: process.env.DATABASE_NAME_DEV || 'wezy_app_dev',
            user:     process.env.DATABASE_USERNAME_DEV || 'saurabh',
            password: process.env.DATABASE_PASSWORD_DEV || 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: `${ __dirname }/migrations`
        }
        //seeds: {
        //  directory: `${ __dirname }/db/seeds`
        //}
    },

    staging: {
        client: 'postgresql',
        connection: {

            database: process.env.DATABASE_NAME_STAGING || 'wezy_app_dev',
            user:     process.env.DATABASE_USERNAME_STAGING || 'saurabh',
            password: process.env.DATABASE_PASSWORD_STAGING || 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: `${ __dirname }/migrations`
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: process.env.DATABASE_NAME_PROD || 'wezy_app_dev',
            user:     process.env.DATABASE_USERNAME_PROD || 'saurabh',
            password: process.env.DATABASE_PASSWORD_PROD || 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: `${ __dirname }/migrations`
        }
    }

};
