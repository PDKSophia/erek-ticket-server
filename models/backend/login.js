/**
 *
 * @desc 登陆模块 model
 * @author PDK
 *
 * Created at     : 2019-03-21
 * Last modified  : 2019-03-22
 */
const mysql = require('../../config/connect')

/**
 * @获取token
 */
const retrieveToken = async (username, password, email) => {
  const sql = `SELECT * FROM staff_backend WHERE username = "${username}" AND password = "${password}" AND email = "${email}"`

  try {
    const data = await mysql.query(sql)
    return data
  } catch (err) {
    return null
  }
}

/**
 * @获取用户信息
 */
const retrieveUser = token => {
  const sql = `SELECT * FROM staff_backend staff, department_backend depart WHERE token = "${token}" AND staff.departmentId = depart.id`
  return mysql.query(sql)
}
module.exports = {
  retrieveToken,
  retrieveUser
}
