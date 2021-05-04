

const Function = (params) => {


    const execute = async () => {
        console.log("executing function")
        return {status: 200, result: params.return_val}
    }

    const requiredParams = () => {
        return ['return_val']
    }

    return {execute, requiredParams}
}

module.exports = Function
