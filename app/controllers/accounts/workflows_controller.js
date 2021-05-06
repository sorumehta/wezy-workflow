
const Account = require('../../models/Account')


const getWorkflowByName = (workflowName) => {
    if(workflowName==="test"){
        return 'test'
    }
    return null
}


const create = async (ctx) => {
    const account_id = parseInt(ctx.params.account_id)
    const {workflow, name} = ctx.request.body
    if(!workflow || !workflow.actions || !workflow.links || !workflow.triggers || !name){
        ctx.status = 400
        ctx.body = {success: false}
    } else{
        if (typeof workflow.actions === 'object' && typeof workflow.links === 'object' && typeof workflow.triggers === 'object') {
            console.log("looks good!")
            const new_workflow = await Account.relatedQuery('workflows').for(account_id).insert({workflow, name})
            ctx.body = {success: true, data: {new_workflow}}
        } else {
            ctx.status = 400
            ctx.body = {success: false}
        }
    }
}

const index = async (ctx) => {
    const accountId = parseInt(ctx.params.account_id)
    const workflows = await Account.relatedQuery('workflows').for(parseInt(accountId))
    ctx.body = {success: true, data: {workflows}}
}

const show = async (ctx) => {
    const workflow_id = parseInt(ctx.params.workflow_id)
    const accountId = parseInt(ctx.params.account_id)
    const workflow = await Account.relatedQuery('workflows').for(accountId).findById(workflow_id)
    ctx.body = {success: true, data: {workflow}}
}

const update = async (ctx) => {
    const workflow_id = parseInt(ctx.params.workflow_id)
    const accountId = parseInt(ctx.params.account_id)
    await Account.relatedQuery('workflows').for(accountId).findById(workflow_id).patch(ctx.request.body)
    ctx.body = {success: true}
}

const destroy = async (ctx) => {
    const workflow_id = parseInt(ctx.params.workflow_id)
    const accountId = parseInt(ctx.params.account_id)
    const account = await Account.query().findById(accountId)
    await account.$relatedQuery('workflows').for(accountId).deleteById(workflow_id)
    ctx.body = {success: true}
}

module.exports = {
    create,
    index,
    show,
    update,
    destroy
}

