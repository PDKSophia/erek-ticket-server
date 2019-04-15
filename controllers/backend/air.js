/**
 *
 * @desc 飞机模块 controller
 * @author PDK
 *
 * Created at     : 2019-04-11
 * Last modified  : 2019-04-11
 */
const types = require('../../utils/error.code')
const airModel = require('../../models/backend/air')
const showErrorModal = require('../../utils').showErrorModal
const checkAuthToken = require('../../utils').checkAuthToken

/**
 * @desc 分页获取飞机机场列表
 * @param {Number}  pageNum 页数
 * @param {Number}  pageSize 页大小
 */
async function retrievePosList(req, params) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await airModel.retrievePosList(params)
    return showErrorModal(types.global.RETRIEVE_LIST_SUCCESS, '获取飞机机场列表成功', result)
  } catch (err) {
    showErrorModal(types.global.RETRIEVE_LIST_FAIL, '获取飞机机场列表失败', null)
  }
}
/**
 * @desc 新增飞机机场
 * @param {Object} payload 新增飞机机场数据
 */
async function createPosition(req, payload) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await airModel.createPosition(payload)
    return showErrorModal(types.global.CREATE_SUCCESS, '新增飞机机场成功', result)
  } catch (err) {
    showErrorModal(types.global.CREATE_FAIL, '新增飞机机场失败', null)
  }
}

/**
 * @desc 编辑飞机机场
 * @param {Object} payload 编辑飞机机场数据
 */
async function updatePosition(req, payload) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await airModel.updatePosition(payload)
    return showErrorModal(types.global.UPDATE_SUCCESS, '编辑飞机机场成功', result)
  } catch (err) {
    return showErrorModal(types.global.UPDATE_FAIL, '编辑飞机机场失败', null)
  }
}

/**
 * @desc 删除飞机机场
 * @param {Number} posId
 */
async function deletePosition(req, posId) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await airModel.deletePosition(posId)
    return showErrorModal(types.global.DELETE_SUCCESS, '删除飞机机场成功', result)
  } catch (err) {
    return showErrorModal(types.global.DELETE_FAIL, '删除飞机机场失败', null)
  }
}

/**
 * @desc 分页获取飞机航班列表
 * @param {Number}  pageNum 页数
 * @param {Number}  pageSize 页大小
 */
async function retrieveLineList(req, params) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await airModel.retrieveLineList(params)
    return showErrorModal(types.global.RETRIEVE_LIST_SUCCESS, '获取飞机航班列表成功', result)
  } catch (err) {
    showErrorModal(types.global.RETRIEVE_LIST_FAIL, '获取飞机航班列表失败', null)
  }
}
/**
 * @desc 新增飞机航班
 * @param {Object} payload 新增飞机航班数据
 */
async function createLine(req, payload) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await airModel.createLine(payload)
    return showErrorModal(types.global.CREATE_SUCCESS, '新增飞机航班成功', result)
  } catch (err) {
    showErrorModal(types.global.CREATE_FAIL, '新增飞机航班失败', null)
  }
}

/**
 * @desc 编辑飞机航班
 * @param {Object} payload 编辑飞机航班数据
 */
async function updateLine(req, payload) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await airModel.updateLine(payload)
    return showErrorModal(types.global.UPDATE_SUCCESS, '编辑飞机航班成功', result)
  } catch (err) {
    return showErrorModal(types.global.UPDATE_FAIL, '编辑飞机航班失败', null)
  }
}

/**
 * @desc 删除飞机航班
 * @param {Number} posId
 */
async function deleteLine(req, posId) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await airModel.deleteLine(posId)
    return showErrorModal(types.global.DELETE_SUCCESS, '删除飞机航班成功', result)
  } catch (err) {
    return showErrorModal(types.global.DELETE_FAIL, '删除飞机航班失败', null)
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
