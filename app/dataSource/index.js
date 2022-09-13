const { Sequelize } = require('sequelize')
const { pg } = require('../../config/db')
const logger = require('../../logger')

const sequelize = new Sequelize(pg.database, pg.user, pg.password, {
  host: pg.host,
  port: pg.port,
  dialect: 'postgres',
  logging: (sql) => { logger.info(sql) }
})

module.exports = sequelize
