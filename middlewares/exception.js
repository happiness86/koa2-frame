const { ParameterException, DbException, LoginException } = require('../core/http-exception')
const { GenFailedResult } = require('../app/util/response')
const Logger = require('../logger/index')
const { JSON_HEADER } = require('../app/util/commonHeader')

const catchError = async (ctx, next) => {
  const requestUrl = `${ctx.method} ${ctx.path}`
  try {
    await next()
    Logger.info(requestUrl, 'request host->', ctx.request.host, 'params->', ctx.params, 'body->', JSON.stringify(ctx.request.body))
  } catch (error) {
    if (global.config.env === 'dev') {
      throw error
    }
    ctx.set(JSON_HEADER)
    if (error instanceof ParameterException) {
      ctx.body = new GenFailedResult(error.errorCode, error.msg, requestUrl)
      ctx.status = error.code
    } else if (error instanceof DbException) {
      ctx.body = new GenFailedResult(error.errorCode, error.msg, requestUrl)
      ctx.status = error.code
    } else if (error instanceof LoginException) {
      ctx.body = new GenFailedResult(error.errorCode, error.msg, requestUrl)
      ctx.status = error.code
    } else {
      ctx.body = new GenFailedResult(9999, 'we made a mistake!', requestUrl)
      ctx.status = 500
    }
    Logger.error(requestUrl, error.msg , 'request host->', ctx.request.host ,'params->', ctx.params, 'body->', JSON.stringify(ctx.request.body))
    Logger.error(error)
  }
}

module.exports = catchError