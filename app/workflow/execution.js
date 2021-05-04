const {initWorkflowByName} = require('./workflow')
const Action = require('./actions')
const ExecData = require('./execResults')

const WorkflowExecution = (workflowName, triggerType, token, workflowInput) => {
    let executionData = {}
    let canTrigger = false
    const workflow = initWorkflowByName(workflowName)
    if(workflow.canTriggerWorkflow(triggerType, token)){
        executionData = ExecData({name: 'start', data: workflowInput})
        canTrigger = true
    }

    const runExecutionLoop = async () => {
        if(canTrigger && workflow){
            const links = workflow.getLinks()
            let startAction = Action({name: 'start', type: 'start'})
            let nextActionName = links.getNextActionName(startAction, executionData)
            while(nextActionName !== 'nil'){
                console.log(`next action: ${nextActionName}`)
                let action = workflow.getAction(nextActionName)

                let result = await action.execAction(executionData)
                if(result.status !== 200){
                    console.log(`ERROR: problem while executing action ${action.getName()}; status: ${result.status}`)
                    return result
                } else{
                    executionData.addActionResult(action.getName(), result)
                    nextActionName = links.getNextActionName(action, executionData)
                }

            }
            console.log("Finished! Returning results...")
            return {status: 200, data: executionData.getAllActionResults()}
        } else {
            return {status: 422}
        }

    }
    return {runExecutionLoop}
}

module.exports = WorkflowExecution
