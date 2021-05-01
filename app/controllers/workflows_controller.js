
const test_workflow = require('../workflow-client/examples/do_stuff_send_email')

const getWorkflowByName = (workflowName) => {
    if(workflowName==="test"){
        return test_workflow
    }
    return null
}

module.exports = {getWorkflowByName}
