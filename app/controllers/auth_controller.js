const Account = require('../models/Account')
const auth_helper = require('../helpers/auth_helpers')

const postLogin = async (ctx) => {
    const email = String(ctx.request.body.email)
    const password = String(ctx.request.body.password)
    const resultArr = await Account.query().select('encrypted_password','id','email').where('email',  email)
    if(resultArr.length > 0){

            const isMatch = await auth_helper.verifyPassword(password, resultArr[0].encrypted_password)
            if (!isMatch) {
                ctx.status = 401
                ctx.body = {success: false}
            }
            else{
                // return the account id associated with the user
                console.log(resultArr[0])

                //const token = jwt.sign({ user_email: resultArr[0].email }, config.secretKeyBase);
                ctx.body = {success: isMatch, data: {id: resultArr[0].id,
                        email: resultArr[0].email, username: resultArr[0].username}}
            }

    } else{
        ctx.status = 404
    }
}


module.exports = {
    postLogin
}