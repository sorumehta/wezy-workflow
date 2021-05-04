

const Http = (options) => {


    const execute = async () => {
        const {url, method, data, params, headers} = options
        console.log(`requesting url ${url} with method ${method} and data:`)
        console.log(data)
        return {status: 200}
    }

    const requiredParams = () => {
        return ['url', 'method', 'data', 'params', 'headers']
    }

    return {execute, requiredParams}
}

module.exports = Http
