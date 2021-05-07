const Account = require('../models/Account')
const auth_helper = require('../helpers/auth_helpers')
const jwt = require('jsonwebtoken');
const config = require('../../config/config')

const postLogin = async (ctx) => {
    const email = String(ctx.request.body.email)
    const password = String(ctx.request.body.password)
    const resultArr = await Account.query().select('encrypted_password','id','email','username').where('email',  email)
    if(resultArr.length > 0){

            const isMatch = await auth_helper.verifyPassword(password, resultArr[0].encrypted_password)
            if (!isMatch) {
                ctx.status = 401
                ctx.body = {success: false}
            }
            else{
                const token = jwt.sign({ username: resultArr[0].username, account_id: resultArr[0].id }, config.secretKeyBase);
                ctx.body = {success: isMatch, data: {id: resultArr[0].id,
                        email: resultArr[0].email, username: resultArr[0].username, token: token}}
            }

    } else{
        ctx.status = 404
    }
}


module.exports = {
    postLogin
}