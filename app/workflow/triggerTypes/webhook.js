const workflowExecution = require('../execution')

const getRequiredParams = () => {
    return "/workflow/trigger/webhook/:workflow_name"
}

const listener = async (ctx) => {
    const workflowName = ctx.params.workflow_name
    const data = ctx.request.body
    const {access_token} = ctx.request.headers
    const result = await workflowExecution(workflowName, 'webhook', access_token, data).runExecutionLoop()
    //ctx.status = result.status
    //ctx.body = result.body
    return result
}

module.exports = {listener, getRequiredParams} //temp
