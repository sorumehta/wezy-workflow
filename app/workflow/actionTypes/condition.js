
const Condition = (params) => {


    const execute = () => {
        console.log("params to condition:")
        console.log(JSON.stringify(params, null, 2))
        const {condition} = params
        console.log(`executing condition ${condition.type} to compare ${condition.value1} to ${condition.value2}`)
        if(condition.type === "boolean"){
            return {result: condition.value1 === condition.value2, status: 200}
        }
        throw `condition type ${condition.type} invalid`
    }

    const requiredParams = () => {
        return ['condition']
    }

    return {execute, requiredParams}

}

module.exports = Condition
