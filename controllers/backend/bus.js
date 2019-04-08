/**
 *
 * @desc 汽车模块 controller
 * @author PDK
 *
 * Created at     : 2019-04-07
 * Last modified  : 2019-04-07
 */
const types = require('../../utils/error.code')
const busModel = require('../../models/backend/bus')
const showErrorModal = require('../../utils').showErrorModal
const checkAuthToken = require('../../utils').checkAuthToken

/**
 * @desc 分页获取汽车站点列表
 * @param {Number}  pageNum 页数
 * @param {Number}  pageSize 页大小
 */
async function retrievePosList(req, params) {
	const { xauttoken } = req.headers
	await checkAuthToken(xauttoken)
	try {
		const result = await busModel.retrievePosList(params)
		return showErrorModal(types.global.RETRIEVE_LIST_SUCCESS, '获取汽车站点列表成功', result)
	} catch (err) {
		showErrorModal(types.global.RETRIEVE_LIST_FAIL, '获取汽车站点列表失败', null)
	}
}
/**
 * @desc 新增汽车站点
 * @param {Object} payload 新增汽车站点数据
 */
async function createPosition(req, payload) {
	const { xauttoken } = req.headers
	await checkAuthToken(xauttoken)
	try {
		const result = await busModel.createPosition(payload)
		return showErrorModal(types.global.CREATE_SUCCESS, '新增汽车站点成功', result)
	} catch (err) {
		showErrorModal(types.global.CREATE_FAIL, '新增汽车站点失败', null)
	}
}

/**
 * @desc 编辑汽车站点
 * @param {Object} payload 编辑汽车站点数据
 */
async function updatePosition(req, payload) {
	const { xauttoken } = req.headers
	await checkAuthToken(xauttoken)
	try {
		const result = await busModel.updatePosition(payload)
		return showErrorModal(types.global.UPDATE_SUCCESS, '编辑汽车站点成功', result)
	} catch (err) {
		return showErrorModal(types.global.UPDATE_FAIL, '编辑汽车站点失败', null)
	}
}

/**
 * @desc 删除汽车站点
 * @param {Number} posId
 */
async function deletePosition(req, posId) {
	const { xauttoken } = req.headers
	await checkAuthToken(xauttoken)
	try {
		const result = await busModel.deletePosition(posId)
		return showErrorModal(types.global.DELETE_SUCCESS, '删除汽车站点成功', result)
	} catch (err) {
		return showErrorModal(types.global.DELETE_FAIL, '删除汽车站点失败', null)
	}
}

module.exports = {
	retrievePosList,
	createPosition,
	updatePosition,
	deletePosition
}
