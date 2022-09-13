const Koa = require('koa')
const InitManager = require('./core/init')
const bodyParser = require('koa-bodyparser')
const catchError = require('./middlewares/exception')
const Logger = require('./logger/index')
const cors = require('koa2-cors')
// const { tryPort } = require('./core/checkPort')

const app = new Koa()
const PORT = 5005

app.use(cors())
app.use(bodyParser())
app.use(catchError)
InitManager.InitCore(app)

let server = null
// tryPort(PORT, (port) => {
//   server = app.listen(port, () => {
//     Logger.info(`server is running at port ${PORT}`)
//   })
// })
server = app.listen(PORT, () => {
  Logger.info(`server is running at port ${PORT}`)
})
module.exports = server
