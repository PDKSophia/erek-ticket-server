/**
 *
 * @desc 火车模块 controller
 * @author PDK
 *
 * Created at     : 2019-04-10
 * Last modified  : 2019-04-10
 */
const types = require('../../utils/error.code')
const trainModel = require('../../models/backend/train')
const showErrorModal = require('../../utils').showErrorModal
const checkAuthToken = require('../../utils').checkAuthToken

/**
 * @desc 分页获取火车站点列表
 * @param {Number}  pageNum 页数
 * @param {Number}  pageSize 页大小
 */
async function retrievePosList(req, params) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await trainModel.retrievePosList(params)
    return showErrorModal(types.global.RETRIEVE_LIST_SUCCESS, '获取火车站点列表成功', result)
  } catch (err) {
    showErrorModal(types.global.RETRIEVE_LIST_FAIL, '获取火车站点列表失败', null)
  }
}
/**
 * @desc 新增火车站点
 * @param {Object} payload 新增火车站点数据
 */
async function createPosition(req, payload) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await trainModel.createPosition(payload)
    return showErrorModal(types.global.CREATE_SUCCESS, '新增火车站点成功', result)
  } catch (err) {
    showErrorModal(types.global.CREATE_FAIL, '新增火车站点失败', null)
  }
}

/**
 * @desc 编辑火车站点
 * @param {Object} payload 编辑火车站点数据
 */
async function updatePosition(req, payload) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await trainModel.updatePosition(payload)
    return showErrorModal(types.global.UPDATE_SUCCESS, '编辑火车站点成功', result)
  } catch (err) {
    return showErrorModal(types.global.UPDATE_FAIL, '编辑火车站点失败', null)
  }
}

/**
 * @desc 删除火车站点
 * @param {Number} posId
 */
async function deletePosition(req, posId) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await trainModel.deletePosition(posId)
    return showErrorModal(types.global.DELETE_SUCCESS, '删除火车站点成功', result)
  } catch (err) {
    return showErrorModal(types.global.DELETE_FAIL, '删除火车站点失败', null)
  }
}

/**
 * @desc 分页获取火车班次列表
 * @param {Number}  pageNum 页数
 * @param {Number}  pageSize 页大小
 */
async function retrieveLineList(req, params) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await trainModel.retrieveLineList(params)
    return showErrorModal(types.global.RETRIEVE_LIST_SUCCESS, '获取火车班次列表成功', result)
  } catch (err) {
    showErrorModal(types.global.RETRIEVE_LIST_FAIL, '获取火车班次列表失败', null)
  }
}
/**
 * @desc 新增火车班次
 * @param {Object} payload 新增火车班次数据
 */
async function createLine(req, payload) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await trainModel.createLine(payload)
    return showErrorModal(types.global.CREATE_SUCCESS, '新增火车班次成功', result)
  } catch (err) {
    showErrorModal(types.global.CREATE_FAIL, '新增火车班次失败', null)
  }
}

/**
 * @desc 编辑火车班次
 * @param {Object} payload 编辑火车班次数据
 */
async function updateLine(req, payload) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await trainModel.updateLine(payload)
    return showErrorModal(types.global.UPDATE_SUCCESS, '编辑火车班次成功', result)
  } catch (err) {
    return showErrorModal(types.global.UPDATE_FAIL, '编辑火车班次失败', null)
  }
}

/**
 * @desc 删除火车班次
 * @param {Number} posId
 */
async function deleteLine(req, posId) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await trainModel.deleteLine(posId)
    return showErrorModal(types.global.DELETE_SUCCESS, '删除火车班次成功', result)
  } catch (err) {
    return showErrorModal(types.global.DELETE_FAIL, '删除火车班次失败', null)
  }
}

module.exports = {
  retrievePosList,
  createPosition,
  updatePosition,
  deletePosition,
  retrieveLineList,
  createLine,
  updateLine,
  deleteLine
}
