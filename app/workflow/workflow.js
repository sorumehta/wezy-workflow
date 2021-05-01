const {getWorkflowByName} = require('../controllers/workflows_controller')
const {getActionByType} = require('./actions')


const Workflow = () => {
    //workflowParams = {id, name, connections, actions, isActive}
    const workflowObj = {}

    const _initWorkflow = (params) => {

        const {id, name, links, actions, trigger, is_active} = params
        Object.keys(actions).forEach(action => {
            actions[action].type = getActionByType(action.type)
        })

        workflowObj.id = id
        workflowObj.name = name
        workflowObj.links = links
        workflowObj.actions = actions
        workflowObj.isActive = is_active
        workflowObj.trigger = trigger

    }

    const initWorkflowByName = (workflowName) => {
        const workflowParams = getWorkflowByName(workflowName)
        if(workflowParams){
            _initWorkflow(workflowParams)
        } else{
            return null
        }
    }

    const isWorkflowActive = () => {
        return workflowObj.isActive
    }

    const getLinks = () => {
        return workflowObj.links
    }

    const getTrigger = () => {
        return workflowObj.trigger
    }

    const checkWorkflowAndTrigger = (workflowName, triggerType) => {
        initWorkflowByName(workflowName)
        console.log(`workflow initialized:`)
        console.log(JSON.stringify(workflowObj, null, 2))
        if(Object.keys(workflowObj).length !== 0){
            console.log(`isActive: ${workflowObj.isActive}`)
            return workflowObj.isActive && workflowObj.trigger.type === triggerType;
        }else{
            return false
        }

    }

    const getNextAction = (currentAction) => {
        if(workflowObj.links.hasOwnProperty(currentAction)){
            return workflowObj.links[currentAction].next
        } else{
            throw "Action not present in links"
        }
    }


    return {checkWorkflowAndTrigger, getNextAction, getTrigger, getLinks, getNextAction}
}

module.exports = {Workflow}