/**
 *
 * @desc 路由整合分发
 * @author PDK
 *
 * Created at     : 2019-03-21
 * Last modified  : 2019-04-20
 */
const backendURL = require('../utils').backendURL
const miniURL = require('../utils').miniURL

module.exports = function (app) {
  // 后台管理
  app.use(`${backendURL}/files`, require('./global/upload'))
  app.use(`${backendURL}/login`, require('./backend/login'))
  app.use(`${backendURL}/department`, require('./backend/department'))
  app.use(`${backendURL}/staff`, require('./backend/staff'))
  app.use(`${backendURL}/city`, require('./backend/city'))
  app.use(`${backendURL}/bus`, require('./backend/bus'))
  app.use(`${backendURL}/train`, require('./backend/train'))
  app.use(`${backendURL}/plane`, require('./backend/air'))
  // 小程序
  app.use(`${miniURL}/login`, require('./mini/login'))
  app.use(`${miniURL}/city`, require('./mini/city'))
}
