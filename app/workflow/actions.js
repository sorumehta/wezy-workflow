const ActionConfig = require('./actionConfig')
const Http = require('./actionTypes/http')
const Condition = require('./actionTypes/condition')
const Function = require('./actionTypes/function')
const Email = require('./actionTypes/email')
//const Auth = require('./auth')


const allActions = (ctx) => {
    return ['email','http','condition']
}

const getActionByType = (type) => {
    if(type === 'start'){
        return 'start'
    }
    else if(type === 'http'){
        return Http
    }
    else if(type === 'condition'){
        return Condition
    }
    else if(type === 'function') {
        return Function
    }
    else if(type === 'email') {
        return Email
    }
    throw `no matching action type object for ${type}`
}

const Action = (params) => {
    console.log(`initialising action with params:`)
    console.log(JSON.stringify(params, null, 2))
    const name = params.name
    //const authParams = params.auth_params
    const typeName = params.type



    const actionType = getActionByType(params.type)
    const actionConfig = ActionConfig(params.config)

    const getName = () => {
        return name
    }

    const getType = () => {
        return actionType
    }

    const getTypeName = () => {
        return typeName
    }

    const getParams = () => {
        return actionConfig
    }

    const execAction = async (execData) => {
        if(actionConfig.validateConfig(actionType)){
            const resolvedParams = actionConfig.resolveConfig(execData.getAllActionResults())
            return actionType(resolvedParams).execute();
        }
        else{
            return {status: 400, message: `required parameters not present for action ${name}`}
        }
    }

    return {execAction, getName, getType, getTypeName, getParams}
}


module.exports = {Action, getActionByType,allActions}
