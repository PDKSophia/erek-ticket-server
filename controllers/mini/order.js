/**
 *
 * @desc 小程序订单模块 controller
 * @author PDK
 *
 * Created at     : 2019-05-03
 * Last modified  : 2019-05-05
 */
const types = require('../../utils/error.code')
const orderModel = require('../../models/mini/order')
const showErrorModal = require('../../utils').showErrorModal
const checkAuthToken = require('../../utils').checkAuthToken

/**
 * @desc 新增飞机订单
 * @param {Number} typeId       飞机航班的id
 * @param {String} type         类型type
 * @param {String} description  描述
 * @param {String} record       数据
 * @param {String} prefix       保留字段
 */
async function createPlaneOrder(req) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await orderModel.createPlaneOrder(req.body)
    return showErrorModal(
      types.global.CREATE_SUCCESS,
      '新增飞机航班订单成功',
      result
    )
  } catch (err) {
    showErrorModal(types.global.CREATE_FAIL, '新增飞机航班订单失败', null)
  }
}

/**
 * @desc 新增火车订单
 * @param {Number} typeId       飞机航班的id
 * @param {String} type         类型type
 * @param {String} description  描述
 * @param {String} record       数据
 * @param {String} prefix       保留字段
 */
async function createTrainOrder(req) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await orderModel.createTrainOrder(req.body)
    return showErrorModal(
      types.global.CREATE_SUCCESS,
      '新增火车班次订单成功',
      result
    )
  } catch (err) {
    showErrorModal(types.global.CREATE_FAIL, '新增火车班次订单失败', null)
  }
}
/**
 * @desc 新增大巴订单
 * @param {Number} typeId       飞机航班的id
 * @param {String} type         类型type
 * @param {String} description  描述
 * @param {String} record       数据
 * @param {String} prefix       保留字段
 */
async function createBusOrder(req) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await orderModel.createBusOrder(req.body)
    return showErrorModal(
      types.global.CREATE_SUCCESS,
      '新增大巴班次订单成功',
      result
    )
  } catch (err) {
    showErrorModal(types.global.CREATE_FAIL, '新增大巴班次订单失败', null)
  }
}

/**
 * @desc 获取当前用户飞机所有订单
 */
async function retrieveOrderPlane(req) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await orderModel.retrieveOrderPlane()
    return showErrorModal(
      types.global.RETRIEVE_LIST_SUCCESS,
      '获取当前用户飞机所有订单成功',
      result
    )
  } catch (err) {
    showErrorModal(
      types.global.RETRIEVE_LIST_FAIL,
      '获取当前用户飞机所有订单失败',
      null
    )
  }
}

/**
 * @desc 获取当前用户火车所有订单获
 */
async function retrieveOrderTrain(req) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await orderModel.retrieveOrderTrain()
    return showErrorModal(
      types.global.RETRIEVE_LIST_SUCCESS,
      '获取当前用户火车所有订单获成功',
      result
    )
  } catch (err) {
    showErrorModal(
      types.global.RETRIEVE_LIST_FAIL,
      '获取当前用户火车所有订单获失败',
      null
    )
  }
}

/**
 * @desc 获取当前用户大巴所有订单获
 */
async function retrieveOrderBus(req) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await orderModel.retrieveOrderBus()
    return showErrorModal(
      types.global.RETRIEVE_LIST_SUCCESS,
      '获取当前用户大巴所有订单获成功',
      result
    )
  } catch (err) {
    showErrorModal(
      types.global.RETRIEVE_LIST_FAIL,
      '获取当前用户大巴所有订单获失败',
      null
    )
  }
}
module.exports = {
  createPlaneOrder,
  createTrainOrder,
  createBusOrder,
  retrieveOrderPlane,
  retrieveOrderTrain,
  retrieveOrderBus
}
