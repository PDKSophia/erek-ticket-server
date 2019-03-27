/**
 *
 * @desc 路由整合分发
 * @author PDK
 *
 * Created at     : 2019-03-21
 * Last modified  : 2019-03-24
 */
const backendURL = require('../utils').backendURL

module.exports = function(app) {
  app.use(`${backendURL}/login`, require('./backend/login'))
  app.use(`${backendURL}/department`, require('./backend/department'))
  app.use(`${backendURL}/staff`, require('./backend/staff'))
}
