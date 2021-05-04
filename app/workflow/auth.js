
const Auth = (params) => {
    const getAuthByType = (type) => {
        return 'auth'
    }
    const authType = getAuthByType(params.type)

    const authenticate = (credParams) => {
        authType.authenticate(credParams)
    }

    return {authenticate}
}

module.exports = Auth