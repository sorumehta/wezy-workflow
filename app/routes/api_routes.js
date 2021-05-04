const {resource_routes} = require('./helpers/restful_routes')
const accounts = require('../controllers/accounts_controller')
const workflows = require('../controllers/accounts/workflows_controller')

module.exports = (router) => {
    // register
    router.post('/auth/register', accounts.create)

    // accounts
    router.get('/accounts', accounts.index)
    router.get('/accounts/:account_id', accounts.show)
    router.put('/accounts/:account_id', accounts.update)

    //workflows
    resource_routes(router, 'account', 'workflow', workflows)

}