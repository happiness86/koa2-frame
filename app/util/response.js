class GenResult {
  code
  msg
  data = null
  constructor (code, msg, data) {
    this.code = code
    this.msg = msg
    this.data = data
  }
}

class GenSuccessResult extends GenResult {
  constructor (data = null) {
    super(200, 'success', data)
  }
}

class GenFailedResult extends GenResult {
  requestUrl
  constructor (errorCode, errorMsg = 'request failed', requestUrl) {
    super(errorCode, errorMsg, null)
    this.requestUrl = requestUrl
  }
}

class GenListResult {
  page
  pageSize
  total
  records = []
  constructor (data = {}) {
    this.page = data.page
    this.pageSize = data.pageSize
    this.total = data.total
    this.records = data.records
  }
}

module.exports = {
  GenSuccessResult,
  GenFailedResult,
  GenListResult
}
