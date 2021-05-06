const {resource_routes} = require('./helpers/restful_routes')
const accounts = require('../controllers/accounts_controller')
const workflows = require('../controllers/accounts/workflows_controller')
const {getActionParams, getAllActions} = require('../controllers/accounts/workflow_actions_controller')
const { getTriggerParams, getAllTriggers} = require('../controllers/accounts/workflow_triggers_controller')
const {webhookListener} = require('../workflow/triggerTypes/webhook')


module.exports = (router) => {
    // register
    router.post('/auth/register', accounts.create)

    // accounts
    router.get('/accounts', accounts.index)
    router.get('/accounts/:account_id', accounts.show)
    router.put('/accounts/:account_id', accounts.update)

    // actions
    router.get('/actions', getAllActions)
    router.get('/triggers', getAllTriggers)
    router.get('/actions/params/:action_type', getActionParams)
    router.get('/triggers/params/:trigger_type', getTriggerParams)

    //workflows
    resource_routes(router, 'account', 'workflow', workflows)

    //webhook trigger
    router.post('/workflow/trigger/webhook/:workflow_name', webhookListener)
}