import config from './config/index'
global.config = config
global.moment = require('moment')
global.schedule = require('node-schedule')
global.fs = require('fs')
global._ = require('lodash')