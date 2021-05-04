
const { Model } = require('objection')

class Workflow extends Model{
    static get tableName(){
        return 'workflows'
    }

    static get relationMappings() {

        const Account = require('./Account')

        return {
            account: {
                relation: Model.BelongsToOneRelation,

                modelClass: Account,

                join: {
                    from: 'workflows.account_id',
                    to: 'accounts.id',
                },
            }

        }
    }

}

module.exports = Workflow