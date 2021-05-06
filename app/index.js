const Koa = require('koa')
const KoaRouter = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger');
const config = require('../config/config')

require('dotenv').config()
const { spawn } = require('child_process');

const db = require('../config/database')

const { Model } = require('objection')

Model.knex(db)


const registerApi = require('./routes/api_routes')

const router = new KoaRouter({
    prefix: '/api/v1'
})
const app = new Koa()

// serve from optimized build when running in production
if(config.serveStatic){
    const staticPath = __dirname + '/../client/build'
    console.log(`serving static files from: ${staticPath}`)
    app.use(require('koa-static')(staticPath));
}

app.use(logger())
app.use(bodyParser())


// Register our REST API.
registerApi(router)

app.use(router.routes())
app.use(router.allowedMethods())

const server = app.listen(config.port, () => {
    console.log('App listening at port %s', server.address().port)
})

//Start background workers

const email_worker = spawn('node', ['./app/workers/email_worker.js']);

email_worker.stdout.on('data', (data) => {
    console.log(`email_worker stdout:\n${data}`);
});

email_worker.stderr.on('data', (data) => {
    console.error(`email_worker stderr:\n${data}`);
});