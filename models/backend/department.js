/**
 *
 * @desc 部门模块 model
 * @author PDK
 *
 * Created at     : 2019-03-21
 * Last modified  : 2019-04-10
 */
const mysql = require('../../config/connect')

/**
 * @获取表的总数
 */
const retrieveLength = async () => {
  const sql = `SELECT * FROM department_backend ORDER BY id DESC`
  const result = await mysql.query(sql)
  return result
}

/**
 * @desc 获取部门列表
 * @param {Object} params
 */
const retrieveDepsList = async params => {
  const { pageNum, pageSize } = params
  var startCount = pageNum === 1 ? 0 : (pageNum - 1) * pageSize
  var endCount = pageSize
  const sql = `SELECT * FROM department_backend WHERE depart_status = 'true' LIMIT ${startCount}, ${endCount}`
  const list = await mysql.query(sql)
  const count = await retrieveLength()
  let result = {
    current: parseInt(pageNum),
    size: parseInt(pageSize),
    count: count.length,
    list: [...list]
  }
  return result
}

/**
 * @desc 新增部门
 * @param {Object} payload
 */
const createDepartment = async payload => {
  const { depart_name, depart_content, depart_prefix } = payload
  const sql = `INSERT INTO department_backend(depart_name, depart_content, depart_prefix) VALUES ('${depart_name}', '${depart_content}', '${depart_prefix}')`
  await mysql.query(sql) // 执行插入语句
  const result = await retrieveLength()
  return result[0]
}

/**
 * @desc 编辑部门
 * @param {Object} payload
 */
const updateDepartment = async payload => {
  const { id, depart_name, depart_content, depart_prefix } = payload
  const sql = `UPDATE department_backend SET depart_name='${depart_name}', depart_content='${depart_content}', depart_prefix='${depart_prefix}' WHERE id=${id}`
  await mysql.query(sql)
  return payload
}

/**
 * @desc 删除部门
 * @param {Number} staffId
 */
const deleteDepartment = async departId => {
  const sql = `UPDATE department_backend SET depart_status='false' WHERE id=${departId}`
  await mysql.query(sql)
  return null
}

module.exports = {
  retrieveDepsList,
  createDepartment,
  updateDepartment,
  deleteDepartment
}
