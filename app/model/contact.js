const ChatBot = require('dingtalk-robot-sender')
const moment = require('moment')
const { GenListResult } = require('../util/response')
const Contact = require('../entity/contact')
const { Op } = require('sequelize')
const logger = require('../../logger')
const { resolveQueryEntity, resolveSort } = require('../util/resolveParams')

const accessToken =
  '6a1cb72fe42f0a4da601080cd1ec1fb9b2c852074cd226c6579ecd429d93b89b'
const robot = new ChatBot({
  webhook: `https://oapi.dingtalk.com/robot/send?access_token=${accessToken}`,
})
const cooperationTypeMap = {
  1: '广告变现',
  2: '效果营销',
  3: '品牌营销',
  4: '程序化接入',
  5: '小程序营销',
  6: '其他合作'
}

/**
 * @description 新增联系人
 * @param {*} query 
 */
async function saveContact(query) {
  const { username, phone, company, cooperationType, email, other, requestInfo, modifyTime } = query
  try {
    const res = await Contact.create({
      username, phone, company,cooperation_type: cooperationType, email, other, request_info: requestInfo, modify_time: modifyTime
    })
    logger.info(res)
    return true
  } catch (error) {
    return false
  }
}

// 钉钉机器人发送消息
async function dingRobotSendMsg(query) {
  const { username, phone, email, company, cooperationType, other, modifyTime } = query
  const cooperationTypeStr = cooperationTypeMap[cooperationType]
  const title = '意向用户'
  const time = moment(modifyTime).format('YYYY-MM-DD HH:mm:ss')
  const text =
    `#### 用户名: ${username}\n` +
    `#### 手机号: ${phone}\n` +
    `#### 邮箱: ${email}\n` +
    `#### 公司: ${company}\n` +
    `#### 合作类型: ${cooperationTypeStr}\n` +
    `#### 其他: ${other}\n` +
    `#### 时间: ${time}`
  robot.markdown(title, text, undefined)
}

/**
 * @description 分页查询查询联系人列表
 * @param {*} query 
 */
async function getContactList(query) {
  const queryEntity = query.queryEntity
  const { current, size, orders } = query.pageInfo

  const sortArr = resolveSort(orders)
  const queryArr = resolveQueryEntity(queryEntity)

  try {
    const { count, rows } = await Contact.findAndCountAll({
      where: {
        [Op.and]: queryArr
      },
      limit: size,
      offset: (current - 1) * size,
      order: sortArr,
      attributes: ['id', 'username', 'phone', 'company', 'email', 'other', 'modifyTime', 'cooperationType']
    })
    const records = rows.map(item => {
      item.modifyTime = moment(item.modifyTime).format('YYYY-MM-DD HH:mm:ss')
      item.cooperationTypeEnum = cooperationTypeMap[item.cooperationType]
      return item
    })
    return new GenListResult({
      records,
      current,
      size,
      total: count
    })
  } catch (error) {
    return false
  }

}

/**
 * @description 查询联系人列表
 * @param {*} query 
 */
async function queryList(query) {
  const queryArr = resolveQueryEntity(query)

  try {
    const res = await Contact.findAll({
      where: {
        [Op.and]: queryArr
      },
      attributes: ['id', 'username', 'phone', 'company', 'email', 'other', 'modifyTime', 'cooperationType']
    })
    if (res) {
      const result = [
        ['id', '用户名', '手机号', '公司', '邮箱', '合作类型', '其他', '时间']
      ]
      res.forEach(item => {
        const { cooperationType, modifyTime, id, username, phone, company, email, other } = item
        result.push([
          id, 
          username, 
          phone, 
          company,
          email,
          cooperationTypeMap[cooperationType],
          other,
          moment(modifyTime).format('YYYY-MM-DD HH:mm:ss'),
        ])
      })
      return result
    }
  } catch (error) {
    return false
  }
}

module.exports = {
  saveContact,
  dingRobotSendMsg,
  getContactList,
  queryList,
}