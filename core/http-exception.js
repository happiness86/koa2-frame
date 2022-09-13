class HttpException extends Error {
  constructor (msg = '服务器异常', errorCode = 10001, code = 500) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}
class ParameterException extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10002
    this.code = 400
  }
}

class DbException extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.msg = msg || '数据库执行失败'
    this.errorCode = errorCode || 10003
    this.code = 500
  }
}

class LoginException extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.msg = msg || '登录失败'
    this.errorCode = errorCode || 1004
    this.code = 200
  }
}

module.exports = {
  HttpException,
  ParameterException,
  DbException,
  LoginException
}