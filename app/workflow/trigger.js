const Auth = require('./auth')

const Trigger = (params) => {
    console.log(`initialising trigger with params:`)
    console.log(JSON.stringify(params, null, 2))
    const {name, type, is_async, auth_params} = params
    //const auth = Auth(auth_params)
    const getName = () => {
        return name
    }

    const getType = () => {
        return type
    }

    const isTriggerAsync = () => {
        return is_async
    }

    const isAuthed = (credentials) => {
        return true
    }

    return {getName, getType, isAuthed, isTriggerAsync}
}

module.exports = Trigger