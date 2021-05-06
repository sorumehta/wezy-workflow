const {Action} = require('./actions')
const {Trigger} = require('./trigger')
const Link = require('./links')
const {getWorkflowByName} = require('../controllers/accounts/workflows_controller')


const Workflow = (params) => {
    const {id, name, is_active} = params
    let {links, actions, triggers} = params

    //init actions
    const actionsObj = {}
    actions.forEach(action => {
        actionsObj[action.name] = Action(action)
    })
    actions = actionsObj

    //init triggers
    const triggersArr = []
    triggers.forEach(trigger => {
        triggersArr.push(Trigger(trigger))
    })
    triggers = triggersArr

    //init links
    links = Link(links)

    const isWorkflowActive = () => {
        return is_active
    }

    const getWorkflowName = () => {
        return name
    }

    const getLinks = () => {
        return links
    }

    const _getTrigger = (triggerType) => {
        for(let i = 0; i < triggers.length; i++){
            let trigger = triggers[i]
            if(trigger.getTypeName() === triggerType){
                return trigger
            }
        }
        throw `trigger ${triggerType} does not exist in the workflow`
    }

    const _hasTrigger = (triggerType) => {
        console.log("checking all triggers:")
        for(let i = 0; i < triggers.length; i++){
            let trigger = triggers[i]
            console.log(trigger.getTypeName())
            if(trigger.getTypeName() === triggerType){
                console.log('trigger matched!')
                return true
            }
        }
        console.log(`WARNING: trigger type ${triggerType} not found in workflow, cannot be triggered`)
        return false
    }

    const getAction = (actionName) => {
        if(Object.keys(actions).includes(actionName)){
            return actions[actionName]
        }
        throw `action ${actionName} does not exist in the workflow`
    }

    const canTriggerWorkflow = (triggerType, token) => {
        if(_hasTrigger(triggerType) && is_active){
            return _getTrigger(triggerType).isAuthed(token)
        } else{
            return false
        }
    }

    return {canTriggerWorkflow, getLinks, getAction, isWorkflowActive, getWorkflowName}
}

const initWorkflowByName = (workflowName) => {
    const workflowParams = getWorkflowByName(workflowName)
    if(workflowParams){

        return Workflow(workflowParams)
    }
    else{
        console.log(`WARNING: no workflow found with name ${workflowName}`)
        return null
    }
}


module.exports = {initWorkflowByName}
