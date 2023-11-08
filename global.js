import globalConfig from './config/index'
global.globalConfig = globalConfig
global.moment = require('moment')
global.schedule = require('node-schedule')
global.fs = require('fs')
global._ = require('lodash')