/**
 *
 * @desc 城市模块 controller
 * @author PDK
 *
 * Created at     : 2019-03-27
 * Last modified  : 2019-03-27
 */
const types = require('../../utils/error.code')
const cityModel = require('../../models/backend/city')
const showErrorModal = require('../../utils').showErrorModal
const checkAuthToken = require('../../utils').checkAuthToken

/**
 * @desc 获取城市status状态
 */
async function retrieveStatusList(req) {
	const { xauttoken } = req.headers
	await checkAuthToken(xauttoken)
	try {
		const result = await cityModel.retrieveStatusList()
		return showErrorModal(types.city.RETRIEVE_STATUS_LIST_SUCCESS, '获取城市status列表成功', result)
	} catch (err) {
		showErrorModal(types.city.RETRIEVE_STATUS_LIST_FAIL, '获取城市status列表失败', null)
	}
}

/**
 * @desc 分页获取城市列表
 * @param {Number}  pageNum 页数
 * @param {Number}  pageSize 页大小
 */
async function retrieveCityList(req, params) {
	const { xauttoken } = req.headers
	await checkAuthToken(xauttoken)
	try {
		const result = await cityModel.retrieveCityList(params)
		return showErrorModal(types.global.RETRIEVE_LIST_SUCCESS, '获取城市列表成功', result)
	} catch (err) {
		showErrorModal(types.global.RETRIEVE_LIST_FAIL, '获取城市列表失败', null)
	}
}
/**
 * @desc 新增城市
 * @param {Object} payload 新增城市数据
 */
async function createCity(req, payload) {
	console.log('????请求')
	const { xauttoken } = req.headers
	await checkAuthToken(xauttoken)
	try {
		const result = await cityModel.createCity(payload)
		return showErrorModal(types.global.CREATE_SUCCESS, '新增城市成功', result)
	} catch (err) {
		showErrorModal(types.global.CREATE_FAIL, '新增城市失败', null)
	}
}

/**
 * @desc 编辑城市
 * @param {Object} payload 编辑城市数据
 */
async function updateCity(req, payload) {
	const { xauttoken } = req.headers
	await checkAuthToken(xauttoken)
	try {
		const result = await cityModel.updateCity(payload)
		return showErrorModal(types.global.UPDATE_SUCCESS, '编辑城市成功', result)
	} catch (err) {
		return showErrorModal(types.global.UPDATE_FAIL, '编辑城市失败', null)
	}
}

/**
 * @desc 删除城市
 * @param {Number} departId
 */
async function deleteCity(req, departId) {
	const { xauttoken } = req.headers
	await checkAuthToken(xauttoken)
	try {
		const result = await cityModel.deleteCity(departId)
		return showErrorModal(types.global.DELETE_SUCCESS, '删除城市成功', result)
	} catch (err) {
		return showErrorModal(types.global.DELETE_FAIL, '删除城市失败', null)
	}
}

module.exports = {
	retrieveStatusList,
	retrieveCityList,
	createCity,
	updateCity,
	deleteCity
}
