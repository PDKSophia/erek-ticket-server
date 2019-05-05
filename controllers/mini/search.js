/**
 *
 * @desc 小程序搜索模块 controller
 * @author PDK
 *
 * Created at     : 2019-04-30
 * Last modified  : 2019-04-30
 */
const types = require('../../utils/error.code')
const searchModel = require('../../models/mini/search')
const showErrorModal = require('../../utils').showErrorModal
const checkAuthToken = require('../../utils').checkAuthToken

/**
 * @desc 获取飞机航班列表
 * @param {String} fromCity  起始城市
 * @param {String} toCity    目的城市
 * @param {String} startTime 起始时间
 */
async function retrievePlaneLine(req) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await searchModel.retrievePlaneLine(req.query)
    return showErrorModal(
      types.global.RETRIEVE_LIST_SUCCESS,
      '获取飞机航班列表成功',
      result
    )
  } catch (err) {
    showErrorModal(
      types.global.RETRIEVE_LIST_FAIL,
      '获取飞机航班列表失败',
      null
    )
  }
}

/**
 * @desc 获取火车班次列表
 * @param {String} fromCity  起始城市
 * @param {String} toCity    目的城市
 * @param {String} startTime 起始时间
 */
async function retrieveTrainLine(req) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await searchModel.retrieveTrainLine(req.query)
    return showErrorModal(
      types.global.RETRIEVE_LIST_SUCCESS,
      '获取火车班次列表成功',
      result
    )
  } catch (err) {
    showErrorModal(
      types.global.RETRIEVE_LIST_FAIL,
      '获取火车班次列表失败',
      null
    )
  }
}

/**
 * @desc 获取大巴班次列表
 * @param {String} fromCity  起始城市
 * @param {String} toCity    目的城市
 * @param {String} startTime 起始时间
 */
async function retrieveBusLine(req) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await searchModel.retrieveBusLine(req.query)
    return showErrorModal(
      types.global.RETRIEVE_LIST_SUCCESS,
      '获取大巴班次列表成功',
      result
    )
  } catch (err) {
    showErrorModal(
      types.global.RETRIEVE_LIST_FAIL,
      '获取大巴班次列表失败',
      null
    )
  }
}

module.exports = {
  retrievePlaneLine,
  retrieveTrainLine,
  retrieveBusLine
}
