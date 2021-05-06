const {enqueueMail} = require('../../services/email_service')

const Email = (params) => {

    const execute = async () => {
        console.log("executing email action")
        await enqueueMail(params)
        return {status: 200, result: `Email sent from ${params.from} to ${params.to}`}
    }

    const requiredParams = () => {
        return ['to', 'subject', 'text']
    }

    return {execute, requiredParams}
}

module.exports = Email
