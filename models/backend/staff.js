/**
 *
 * @desc 员工模块 model
 * @author PDK
 *
 * Created at     : 2019-03-21
 * Last modified  : 2019-03-24
 */
const mysql = require('../../config/connect')
const createTokenString = require('../../utils').createTokenString
/**
 * @获取表的总数
 */
const retrieveLength = async () => {
  const sql = `SELECT * FROM staff_backend ORDER BY id DESC`
  const result = await mysql.query(sql)
  return result
}

/**
 * @desc 获取员工列表
 * @param {Object} params
 */
const retrieveStaffList = async params => {
  const { pageNum, pageSize } = params
  var startCount = pageNum === 1 ? 0 : (pageNum - 1) * pageSize
  var endCount = pageSize
  const sql = `SELECT * FROM staff_backend LIMIT ${startCount}, ${endCount}`
  const list = await mysql.query(sql)
  const count = await retrieveLength()
  // 剔除敏感信息
  for (let i = 0; i < list.length; i++) {
    // delete list[i].password
    delete list[i].token
  }
  let result = {
    current: parseInt(pageNum),
    size: parseInt(pageSize),
    count: count.length,
    list: [...list]
  }
  return result
}

/**
 * @desc 新增员工
 * @param {Object} payload
 */
const createStaff = async payload => {
  const { username, password, email, role, departmentId, grade, job } = payload
  const token = createTokenString(30)
  const sql = `INSERT INTO staff_backend(username, token, password, email, role, departmentId, grade, job) VALUES ('${username}', '${token}', '${password}', '${email}', '${role}', '${departmentId}', '${grade}', '${job}')`

  try {
    await mysql.query(sql) // 执行插入语句
    const result = await retrieveLength()
    return result[0]
  } catch (err) {
    return null
  }
}

/**
 * @desc 编辑员工
 * @param {Object} payload
 */
const updateStaff = async payload => {
  const {
    id,
    username,
    password,
    email,
    role,
    departmentId,
    grade,
    job
  } = payload
  const sql = `UPDATE staff_backend SET username='${username}', password='${password}', email='${email}', role='${role}', departmentId='${departmentId}', grade='${grade}', job='${job}' WHERE id=${id}`
  try {
    await mysql.query(sql)
    return payload
  } catch (err) {
    return null
  }
}

/**
 * @desc 删除员工
 * @param {Number} staffId
 */
const deleteStaff = async staffId => {
  const sql = `DELETE FROM staff_backend WHERE id=${staffId}`
  await mysql.query(sql)
  return null
}

module.exports = {
  retrieveStaffList,
  createStaff,
  updateStaff,
  deleteStaff
}
