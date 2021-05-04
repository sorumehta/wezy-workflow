const { Model } = require('objection')

class Account extends Model {

    static get tableName() {
        return 'accounts'
    }

    static get relationMappings() {
        const Workflow = require('./Workflow')

        return {
            workflows: {
                relation: Model.HasManyRelation,
                modelClass: Workflow,
                join: {
                    from: 'accounts.id',
                    to: 'workflows.account_id'
                }
            }
        }
    }
}

module.exports = Account
