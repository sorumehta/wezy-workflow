//functionality related to setting up execution stack (and data) and adding/removing node from it

const workflowExecution = (workflow, workflowInput) => {

    const links = workflow.getLinks()
    const trigger = workflow.getTrigger()
    const executionData = {}

    // initialize execution
    executionData[trigger.name] = workflowInput
    let nextAction = trigger.next

    const runExecutionLoop = () => {
        while(nextAction !== null){
            console.log(`next action: ${nextAction}`)
            nextAction = workflow.getNextAction(nextAction)
        }
        return {status: 200, data: executionData}
    }


    return {runExecutionLoop}
}

module.exports = {workflowExecution}