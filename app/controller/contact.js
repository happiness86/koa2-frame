const Parameter = require('../util/validate')
const { DbException } = require('../../core/http-exception')
const { saveContact, getContactList, dingRobotSendMsg, queryList } = require('../model/contact')
const { GenSuccessResult } = require('../util/response')
const xlsx = require('node-xlsx').default
const moment = require('moment')

const onlineHostList = ['']

const parameter = new Parameter({
  convert: false
})


/**
 * @description 创建联系人
 * @param {*} ctx 
 */
const contact = async (ctx) => {
  const { username, phone, company, cooperationType, email, other, requestInfo } = ctx.request.body
  const rules = {
    username: 'string',
    phone: 'string',
    company: 'string',
    cooperationType: 'int',
    email: 'string',
    other: {
      type: 'string',
      required: false,
      default: ''
    },
    requestInfo: {
      type: 'string',
      required: false,
      default: ''
    },
  }
  const validParams = { username, phone, company, cooperationType, email, other, requestInfo }
  const validateRet = parameter.validate(rules, validParams)
  if (validateRet) {
    throw validateRet
  }
  const modifyTime = new Date()
  const result = await saveContact({
    ...validParams,
    modifyTime
  })
  if (result) {
    ctx.body = new GenSuccessResult()
    const requestInfoObj = requestInfo ? JSON.parse(requestInfo) : null
    if (requestInfoObj && requestInfoObj.host && onlineHostList.includes(requestInfoObj.host)) {
      dingRobotSendMsg({...validParams, modifyTime})
    }
  } else {
    throw new DbException()
  }
}

/**
 * @description 分页查询
 * @param {*} ctx 
 */
const queryContactList = async (ctx) => {
  const { pageInfo = {}, queryEntity } = ctx.request.body
  const rules = {
    pageInfo: 'object',
    queryEntity: 'object',
    current: 'int', 
    size: 'int', 
    orders: 'array'
  }
  const validParams = { pageInfo, queryEntity, ...pageInfo }
  const validateRet = parameter.validate(rules, validParams)
  if (validateRet) {
    throw validateRet
  }
  const result = await getContactList(validParams)
  if (result) {
    ctx.body = new GenSuccessResult(result)
  } else {
    throw new DbException()
  }
}

/**
 * @description 下载联系人列表
 * @param {*} ctx 
 */
const downloadContactList = async (ctx) => {
  const { username, phone, company, cooperationType, email, other, requestInfo } = ctx.request.body
  const rules = {
    username: {
      type: 'string',
      required: false,
    },
    phone: {
      type: 'string',
      required: false,
    },
    company: {
      type: 'string',
      required: false,
    },
    cooperationType: {
      type: 'int',
      required: false,
    },
    email: {
      type: 'string',
      required: false,
    },
    other: {
      type: 'string',
      required: false,
      default: ''
    },
    requestInfo: {
      type: 'string',
      required: false
    },
  }
  const validParams = { username, phone, company, cooperationType, email, other, requestInfo }
  const validateRet = parameter.validate(rules, validParams)
  if (validateRet) {
    throw validateRet
  }

  const result = await queryList(validParams)
  if (result) {
    const wbName = `意向用户_${moment().format('YYYY-MM-DD')}`
    ctx.set('Content-Disposition', `attachment; filename=${encodeURIComponent(wbName)}.xlsx`)
    ctx.set('Content-Type', 'application/vnd.openxmlformats')
    const buffer = xlsx.build([{name: '意向用户', data: result}])
    ctx.body = buffer
  } else {
    throw new DbException()
  }
}

module.exports = {
  contact,
  queryContactList,
  downloadContactList
}