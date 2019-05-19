/**
 *
 * @desc 订单模块 controller
 * @author PDK
 *
 * Created at     : 2019-05-19
 * Last modified  : 2019-05-19
 */
const types = require('../../utils/error.code')
const orderModel = require('../../models/backend/order')
const showErrorModal = require('../../utils').showErrorModal
const checkAuthToken = require('../../utils').checkAuthToken

/**
 * @desc 获取当前所有订单
 */
async function retrieveAllOrder(req) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await orderModel.retrieveAllOrder(xauttoken)
    return showErrorModal(
      types.global.RETRIEVE_LIST_SUCCESS,
      '获取当前所有订单成功',
      result
    )
  } catch (err) {
    showErrorModal(
      types.global.RETRIEVE_LIST_FAIL,
      '获取当前所有订单失败',
      null
    )
  }
}

/**
 * @desc 根据订单号搜索订单
 * @param {String} code 用户code
 */
async function retrieveSearchOrder(req) {
  const { xauttoken } = req.headers
  const { code } = req.body
  await checkAuthToken(xauttoken)
  try {
    const result = await orderModel.retrieveSearchOrder(code)
    console.log('???????/', result)
    return showErrorModal(
      types.global.RETRIEVE_LIST_SUCCESS,
      '搜索成功',
      result
    )
  } catch (err) {
    showErrorModal(types.global.RETRIEVE_LIST_FAIL, '搜索失败', null)
  }
}

module.exports = {
  retrieveAllOrder,
  retrieveSearchOrder
}
