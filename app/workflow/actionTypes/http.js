const axios = require('axios').default;


const Http = (options) => {

    const execute = async () => {
        const {url, method, data, params, headers} = options
        console.log(`requesting url ${url} with method ${method} and data:`)
        console.log(data)
        const result = await axios(options);
        return {status: 200, data: result.data}
    }

    const requiredParams = () => {
        return ['url', 'method', 'data']
    }

    return {execute, requiredParams}
}

module.exports = Http
