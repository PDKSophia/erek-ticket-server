/**
 *
 * @desc 部门模块
 * @author PDK
 *
 * Created at     : 2019-03-24
 * Last modified  : 2019-03-25
 */

const express = require('express')
const router = express.Router()
const depsController = require('../../controllers/backend/department')

/**
 * @desc 分页获取部门列表
 * @param {Number} pageNum 页数
 * @param {Number} pageSize页大小
 */
router.get('/get-all', async (req, res) => {
  try {
    const response = await depsController.retrieveDepsList(req, req.query)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 新增部门
 * @param {Object} jsondata
 */
router.post('/add', async (req, res) => {
  try {
    const response = await depsController.createDepartment(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 编辑部门
 * @param {Object} jsondata
 */
router.put('/update', async (req, res) => {
  try {
    const response = await depsController.updateDepartment(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 删除部门
 * @param {Number} departId
 */
router.delete('/delete-id', async (req, res) => {
  try {
    const response = await depsController.deleteDepartment(
      req,
      req.query.departId
    )
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
