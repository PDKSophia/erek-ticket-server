/**
 *
 * @desc 部门模块 controller
 * @author PDK
 *
 * Created at     : 2019-03-24
 * Last modified  : 2019-03-25
 */
const types = require('../../utils/error.code')
const depsModel = require('../../models/backend/department')
const showErrorModal = require('../../utils').showErrorModal
const checkAuthToken = require('../../utils').checkAuthToken

/**
 * @desc 分页获取部门列表
 * @param {Number}  pageNum 页数
 * @param {Number}  pageSize 页大小
 */
async function retrieveDepsList(req, params) {
	const { xauttoken } = req.headers
	await checkAuthToken(xauttoken)
	try {
		const result = await depsModel.retrieveDepsList(params)
		return showErrorModal(types.global.RETRIEVE_LIST_SUCCESS, '获取部门列表成功', result)
	} catch (err) {
		showErrorModal(types.global.RETRIEVE_LIST_FAIL, '获取部门列表失败', null)
	}
}
/**
 * @desc 新增部门
 * @param {Object} payload 新增部门数据
 */
async function createDepartment(req, payload) {
	const { xauttoken } = req.headers
	await checkAuthToken(xauttoken)
	try {
		const result = await depsModel.createDepartment(payload)
		return showErrorModal(types.global.CREATE_SUCCESS, '新增部门成功', result)
	} catch (err) {
		showErrorModal(types.global.CREATE_FAIL, '新增部门失败', null)
	}
}

/**
 * @desc 编辑部门
 * @param {Object} payload 编辑部门数据
 */
async function updateDepartment(req, payload) {
	const { xauttoken } = req.headers
	await checkAuthToken(xauttoken)
	try {
		const result = await depsModel.updateDepartment(payload)
		return showErrorModal(types.global.UPDATE_SUCCESS, '编辑部门成功', result)
	} catch (err) {
		return showErrorModal(types.global.UPDATE_FAIL, '编辑部门失败', null)
	}
}

/**
 * @desc 删除部门
 * @param {Number} departId
 */
async function deleteDepartment(req, departId) {
	const { xauttoken } = req.headers
	await checkAuthToken(xauttoken)
	try {
		const result = await depsModel.deleteDepartment(departId)
		return showErrorModal(types.global.DELETE_SUCCESS, '删除部门成功', result)
	} catch (err) {
		return showErrorModal(types.global.DELETE_FAIL, '删除部门失败', null)
	}
}

module.exports = {
	retrieveDepsList,
	createDepartment,
	updateDepartment,
	deleteDepartment
}
