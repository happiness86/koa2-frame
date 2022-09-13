const Parameter = require('../app/util/validate')
const { LoginException } = require('../core/http-exception')
const md5 = require('md5')
// const { GenSuccessResult } = require('../app/util/response')

const parameter = new Parameter({
  convert: false
})

const auth = async (ctx, next) => {
  const token = ctx.headers['authorization']

  const rules = {
    token: 'string'
  }

  const validParams = { token }
  const validateRet = parameter.validate(rules, validParams)
  if (validateRet) {
    throw validateRet
  }
  // const currentTimestamp = new Date().getTime()
  // if (currentTimestamp - timestamp > 1000 * 5) {
  //   throw new LoginException('token失效')
  // }
  const access = md5(`${USERNAME}${PASSWORD}`)
  if ( access !== token) {
    throw new LoginException('token失效')
  } else {
    await next()
  }
}

module.exports = auth