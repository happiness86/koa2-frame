const Router = require('koa-router')
const { contact, queryContactList, downloadContactList } = require('../../controller/contact')
const auth = require('../../../middlewares/auth')

const router = new Router()
router.post('/v1/contact', contact)
// 分页查询接口
router.post('/v1/contact/list', auth, queryContactList)

router.post('/v1/contact/download', auth, downloadContactList)

module.exports = router