
const ExecResults = (initData) => {
    const execResult = {}
    const context = {}

    if(initData){
        const {name, data} = initData
        execResult[name] = data
    }

    const addActionResult = (actionName, actionResult) => {
        execResult[actionName] = actionResult
    }

    const getActionResult = (actionName) => {
        if(Object.keys(execResult).includes(actionName)){
            console.log(`returning result for action ${actionName}: ${execResult[actionName].result}`)
            return execResult[actionName].result
        }
        throw `no action result for action ${actionName}`
    }

    const getAllActionResults = () => {
        return execResult
    }

    return {addActionResult, getActionResult, getAllActionResults}

}

module.exports = ExecResults
