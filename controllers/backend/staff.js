/**
 *
 * @desc 员工模块 controller
 * @author PDK
 *
 * Created at     : 2019-03-24
 * Last modified  : 2019-03-25
 */
const types = require('../../utils/error.code')
const staffModel = require('../../models/backend/staff')
const showErrorModal = require('../../utils').showErrorModal
const checkAuthToken = require('../../utils').checkAuthToken

/**
 * @desc 分页获取员工列表
 * @param {Number}  pageNum 页数
 * @param {Number}  pageSize 页大小
 */
async function retrieveStaffList(req, params) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await staffModel.retrieveStaffList(params)
    return showErrorModal(
      types.deps.RETRIEVE_LIST_SUCCESS,
      '获取员工列表成功',
      result
    )
  } catch (err) {
    showErrorModal(types.deps.RETRIEVE_LIST_FAIL, '获取员工列表失败', null)
  }
}
/**
 * @desc 新增员工
 * @param {Object} payload 新增员工数据
 */
async function createStaff(req, payload) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await staffModel.createStaff(payload)
    return showErrorModal(types.deps.CREATE_SUCCESS, '新增员工成功', result)
  } catch (err) {
    showErrorModal(types.deps.CREATE_FAIL, '新增员工失败', null)
  }
}

/**
 * @desc 编辑员工
 * @param {Object} payload 编辑员工数据
 */
async function updateStaff(req, payload) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await staffModel.updateStaff(payload)
    if (!result) {
      return showErrorModal(types.deps.UPDATE_FAIL, '邮箱重复，编辑失败', null)
    } else {
      return showErrorModal(types.deps.UPDATE_SUCCESS, '编辑员工成功', result)
    }
  } catch (err) {
    return showErrorModal(types.deps.UPDATE_FAIL, '编辑员工失败', null)
  }
}

/**
 * @desc 删除员工
 * @param {Number} departId
 */
async function deleteStaff(req, departId) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await staffModel.deleteStaff(departId)
    return showErrorModal(types.deps.DELETE_SUCCESS, '删除员工成功', result)
  } catch (err) {
    return showErrorModal(types.deps.DELETE_FAIL, '删除员工失败', null)
  }
}

module.exports = {
  retrieveStaffList,
  createStaff,
  updateStaff,
  deleteStaff
}
