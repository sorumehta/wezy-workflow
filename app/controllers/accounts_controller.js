const Account = require('../models/Account')
const {hashPassword} = require('../helpers/auth_helpers')

const create = async (ctx) => {
    console.log(' postAccounts')
    const username = ctx.request.body.username
    const email = ctx.request.body.email
    const password = ctx.request.body.password
    if (!username || !email || !password) {
        console.log("Bad Request")
        ctx.status = 400
        ctx.body = {success: false}
    } else {
        const existingUsers = await Account.query().where('username',username).orWhere('email',email)
        if(existingUsers.length > 0){
            ctx.status = 409
        } else {
            const hashedBody = await hashPassword({username, email, password})
            const newAccount = await Account.query().insert(hashedBody)
            console.log(`newAccount.id: ${newAccount.id}`)
            ctx.body = {id: newAccount.id, username: newAccount.username, email: newAccount.email}
        }

    }
}


const index = async (ctx) =>{
    console.log('getAccounts')
    const accounts = await Account.query()
    ctx.body = {success: true, data: {accounts}}

}


const show = async (ctx) => {
    console.log('getAccount')
    const account_id = parseInt(ctx.params.account_id)
    console.log(`account_id: ${account_id}`)
    const account = await Account.query().findById(account_id)
    ctx.body = {success: true, data: {account}}
}


const update = async (ctx) => {
    const accountId = parseInt(ctx.params.account_id)
    const numUpdated = await Account.query().findById(accountId).patch(ctx.request.body)
    ctx.body = {
        success: numUpdated === 1,
    }
}

// deleteAccount not exposed yet
const destroy = async (ctx) => {
    const accountId = parseInt(ctx.params.account_id)

    const deleteCount = await Account.query().deleteById(accountId)
    ctx.body({success: deleteCount === 1})
}


module.exports = {
    create,
    index,
    show,
    update,
    destroy
}
