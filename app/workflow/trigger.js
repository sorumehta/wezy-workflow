const Auth = require('./auth')
const webhook = require('./triggerTypes/webhook')
const poll = require('./triggerTypes/poll')
const cron = require('./triggerTypes/cron')

const getTriggerByType = (typeName) => {
    if(typeName==='webhook'){
        return webhook
    }
    else if(typeName==='poll'){
        return poll
    }
    else if(typeName==='cron'){
        return cron
    }
    throw `no matching trigger type found for ${typeName}`
}

const Trigger = (params) => {
    console.log(`initialising trigger with params:`)
    console.log(JSON.stringify(params, null, 2))
    const {name, type, is_async, auth_params} = params
    //const auth = Auth(auth_params)
    const getName = () => {
        return name
    }

    const getTypeName = () => {
        return type
    }

    const isTriggerAsync = () => {
        return is_async
    }

    const isAuthed = (credentials) => {
        return true
    }

    return {getName, getTypeName, isAuthed, isTriggerAsync}
}

module.exports = {Trigger, getTriggerByType}