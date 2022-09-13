const log4js = require('log4js')
const path = require('path')

const LOGGER_NAME = path.basename(process.cwd())

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: `./logs/${LOGGER_NAME}.log`}
  },
  categories: {
    default: {
      appenders: ['out', 'app'],
      level: 'debug'
    }
  }
})
module.exports = log4js.getLogger(LOGGER_NAME)