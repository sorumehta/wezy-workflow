const {getActionByType,allActions} = require('../../workflow/actions')

const getAllActions = async (ctx) => {
    const data = allActions()
    ctx.body = {data}
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

module.exports = {
    getAllActions, getActionParams
}