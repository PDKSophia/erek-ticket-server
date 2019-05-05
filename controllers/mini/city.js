/**
 *
 * @desc 小程序城市列表模块 controller
 * @author PDK
 *
 * Created at     : 2019-04-20
 * Last modified  : 2019-04-20
 */
const types = require('../../utils/error.code')
const cityModel = require('../../models/mini/city')
const showErrorModal = require('../../utils').showErrorModal
const checkAuthToken = require('../../utils').checkAuthToken

/**
 * @desc 获取当季旅游地城市列表
 */
async function retrieveTravelList(req) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await cityModel.retrieveTravelList()
    return showErrorModal(
      types.global.RETRIEVE_LIST_SUCCESS,
      '获取当季旅游地城市列表成功',
      result
    )
  } catch (err) {
    showErrorModal(
      types.global.RETRIEVE_LIST_FAIL,
      '获取当季旅游地城市列表失败',
      null
    )
  }
}

/**
 * @desc 获取热门推荐城市列表
 */
async function retrieveRecommendList(req) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await cityModel.retrieveRecommendList()
    return showErrorModal(
      types.global.RETRIEVE_LIST_SUCCESS,
      '获取热门推荐城市列表成功',
      result
    )
  } catch (err) {
    showErrorModal(
      types.global.RETRIEVE_LIST_FAIL,
      '获取热门推荐城市列表失败',
      null
    )
  }
}

/**
 * @desc 获取旅游主题城市列表
 */
async function retrieveStyleList(req) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    const result = await cityModel.retrieveStyleList()
    return showErrorModal(
      types.global.RETRIEVE_LIST_SUCCESS,
      '获取旅游主题城市列表成功',
      result
    )
  } catch (err) {
    showErrorModal(
      types.global.RETRIEVE_LIST_FAIL,
      '获取旅游主题城市列表失败',
      null
    )
  }
}

/**
 * @desc 根据 cityId 获取某一城市信息
 * @param {Number} cityId
 */
async function retrieveCityInfo(req) {
  const { xauttoken } = req.headers
  const { cityId } = req.query
  await checkAuthToken(xauttoken)
  try {
    const result = await cityModel.retrieveCityInfo(cityId)
    return showErrorModal(
      types.global.RETRIEVE_LIST_SUCCESS,
      '获取城市信息成功',
      result
    )
  } catch (err) {
    showErrorModal(types.global.RETRIEVE_LIST_FAIL, '获取城市信息失败', null)
  }
}

module.exports = {
  retrieveTravelList,
  retrieveRecommendList,
  retrieveStyleList,
  retrieveCityInfo
}
