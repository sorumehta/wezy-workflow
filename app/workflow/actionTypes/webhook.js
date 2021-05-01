const {Workflow} = require('../../workflow/workflow')
const {workflowExecution} = require('../execution')

const listener =  (ctx) => {
    const workflowName = ctx.params.workflow_name
    const data = ctx.request.body
    const workflowFunctions = Workflow()
    const canRun = workflowFunctions.checkWorkflowAndTrigger(workflowName, 'webhook')
    console.log(`canRun: ${canRun}`)
    if(canRun){
        const result = workflowExecution(workflowFunctions, data).runExecutionLoop()
        ctx.body = result.data
    } else{
        ctx.status = 422
    }
}

module.exports = {listener} //temp
