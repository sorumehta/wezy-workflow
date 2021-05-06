

const getAllTriggers = async (ctx) => {
    const data = ['webhook']
    ctx.body = {data}
}


const getTriggerParams = async (ctx) => {
    try{
        const triggerTypeName = ctx.params.trigger_type
        let req_params = {}
        if(triggerTypeName === 'webhook'){
            req_params = "/workflow/trigger/webhook/:workflow_name"
        }
        ctx.body = {data: req_params}
    }
    catch (e){
        console.log(e)
        ctx.status = 500
    }

}

module.exports = {getTriggerParams,getAllTriggers}