const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  static InitCore (app) {
    InitManager.app = app
    InitManager.InitLoadConfig()
    InitManager.InitLoadRouters()
  }

  static InitLoadConfig () {
    const configPath = `${process.cwd()}/config/index.js`
    const config = require(configPath)
    global.config = config
  }

  static InitLoadRouters () {
    const routerPath = `${process.cwd()}/app/api`
    requireDirectory(module, routerPath, {
      visit: whenModuleLoad
    })
    
    function whenModuleLoad (r) {
      if (r instanceof Router) {
        InitManager.app.use(r.routes())
      }
    }
  }
}

module.exports = InitManager
