const port = Number.parseInt(process.env.PORT) || 8080;

module.exports = {
    port: port,
    hostName: process.env.HOST_NAME_PRO,
    serveStatic: process.env.SERVE_STATIC_PRO || true,
    assetHost: process.env.ASSET_HOST_PRO || '',
    secretKeyBase: process.env.SECRET_KEY_BASE || 'some-secret-hurr',
    emailExchange: 'email-exchange',
    emailQueue: 'email-queue'
};
