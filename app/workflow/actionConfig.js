

const ActionConfig = (params) => {

    const validateConfig = (actionType) => {
        const requiredParams = actionType().requiredParams()
        const paramKeys = Object.keys(params)
        for(let i=0; i<requiredParams.length; i++){
            let reqParam = requiredParams[i]
            if(!paramKeys.includes(reqParam)){
                return false
            }
        }
        return true
    }

    const resolveConfig = (execData, inputConfig=null) => {
        if(inputConfig === null){
            inputConfig = Object.assign({}, params)
        }
        console.log("initial params:")
        console.log(JSON.stringify(inputConfig, null, 2))
        Object.keys(inputConfig).forEach(key => {
            if (typeof inputConfig[key] === 'object' && inputConfig[key] !== null){
                resolveConfig(execData, inputConfig[key])
            } else {
                if(typeof inputConfig[key] === "string" && inputConfig[key].startsWith("__")){
                    let keyList = inputConfig[key].slice(2).split(".")
                    let val = execData
                    for(let i = 0; i < keyList.length; i++){
                        if(Object.keys(val).includes(keyList[i])){
                            val = val[keyList[i]]
                        }
                        else{
                            throw `key ${keyList[i]} not found in execution data`
                        }
                    }
                    inputConfig[key] = val
                }
            }
        })
        console.log("resolved inputConfig:")
        console.log(JSON.stringify(inputConfig, null, 2))
        return inputConfig
    }

    return {validateConfig, resolveConfig}
}

module.exports = ActionConfig