const Parameter = require('parameter')
const { ParameterException } = require('../../core/http-exception')

const validate = Parameter.prototype.validate 
Parameter.prototype.validate = function (rules, params) {
  if (rules && params) {
    const result =  validate.call(this, rules, params)
    if (result) {
      const msg = []
      result.forEach(item => {
        let errorMsg = ''
        if (item.code === 'missing_field') {
          errorMsg = `'${item.field}' is ${item.message}`
          msg.push(errorMsg)
        } else if (item.code === 'invalid') {
          errorMsg = `${item.field}' ${item.message}`
        }
        msg.push(errorMsg)
      })
      return new ParameterException(msg.join(';'))
    } else {
      return null
    }
  }
  return validate.call(this)
}

module.exports = Parameter