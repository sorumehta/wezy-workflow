const port = Number.parseInt(process.env.PORT) || 8080;

module.exports = {
    port: port,
    hostName: 'http://localhost:' + port,
    serveStatic: false,
    assetHost: '',
    secretKeyBase: process.env.SECRET_KEY_BASE || 'some-secret-hurr',
    emailExchange: 'email-exchange',
    emailQueue: 'email-queue'
};
