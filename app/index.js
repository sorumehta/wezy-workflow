const koa = require('koa')
const KoaRouter = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger');

require('dotenv').config()
const { spawn } = require('child_process');

const db = require('../config/database')

const { Model } = require('objection')

Model.knex(db)


