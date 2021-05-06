const {getActionByType} = require('../../workflow/actions')
const {getTriggerByType} = require('../../workflow/trigger')

const getAllActions = async (ctx) => {
    ctx.body = {data: ['email','http']}
}

const getAllTriggers = async (ctx) => {
    ctx.body = {data: ['webhook','poll', 'cron']}
}

const getActionParams = async (ctx) => {
    try{
        const actionTypeName = ctx.params.action_type
        const actionTypeObj = getActionByType(actionTypeName)
        const req_params = actionTypeObj(null).requiredParams()
        ctx.body = {data: req_params}
    }
    catch (e){
        console.log(e)
        ctx.status = 500
    }

}

const getTriggerParams = async (ctx) => {
    try{
        const triggerTypeName = ctx.params.trigger_type
        const triggerType = getTriggerByType(triggerTypeName)
        const req_params = triggerType.getRequiredParams()
        ctx.body = {data: req_params}
    }
    catch (e){
        console.log(e)
        ctx.status = 500
    }

}

module.exports = {
    getAllActions, getActionParams, getAllTriggers, getTriggerParams
}