const workflowExecution = require('../execution')

const getRequiredParams = () => {
    return "/workflow/trigger/webhook/:workflow_name"
}

const webhookListener = async (ctx) => {
    const workflowName = ctx.params.workflow_name
    console.log(`attempting to trigger workflow ${workflowName}`)
    const data = ctx.request.body
    const {access_token} = ctx.request.headers
    const workflowExecObj = await workflowExecution(workflowName, 'webhook', access_token, data)
    const result = await workflowExecObj.runExecutionLoop()
    console.log("workflow result:")
    console.log(result)
    ctx.status = result.status
    ctx.body = result
}

module.exports = {webhookListener, getRequiredParams}
