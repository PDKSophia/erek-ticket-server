/**
 *
 * @desc 员工模块
 * @author PDK
 *
 * Created at     : 2019-03-26
 * Last modified  : 2019-03-26
 */

const express = require('express')
const router = express.Router()
const staffController = require('../../controllers/backend/staff')

/**
 * @desc 分页获取员工列表
 * @param {Number} pageNum 页数
 * @param {Number} pageSize页大小
 */
router.get('/get-all', async (req, res) => {
  try {
    const response = await staffController.retrieveStaffList(req, req.query)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 新增员工
 * @param {Object} jsondata
 */
router.post('/add', async (req, res) => {
  try {
    const response = await staffController.createStaff(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 编辑员工
 * @param {Object} jsondata
 */
router.put('/update', async (req, res) => {
  try {
    const response = await staffController.updateStaff(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 删除员工
 * @param {Number} staffId
 */
router.delete('/delete-id', async (req, res) => {
  try {
    const response = await staffController.deleteStaff(req, req.query.staffId)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
