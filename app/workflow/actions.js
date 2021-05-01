
const getActionByType = (actionType) => {
    if (actionType === "http"){
        return 'http'
    }
    return null
}


module.exports = {
    getActionByType
}