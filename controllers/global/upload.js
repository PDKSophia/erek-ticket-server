/**
 *
 * @desc 文件上传模块 controller
 * @author PDK
 *
 * Created at     : 2019-03-27
 * Last modified  : 2019-03-27
 */

const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const types = require('../../utils/error.code')
const showErrorModal = require('../../utils').showErrorModal
const checkAuthToken = require('../../utils').checkAuthToken
/**
 * @desc 上传文件
 * @param {Blob} files 文件
 */
async function upload(req, res) {
  const { xauttoken } = req.headers
  await checkAuthToken(xauttoken)
  try {
    if (!isFormData(req)) {
      showErrorModal(
        types.deps.CREATE_FAIL,
        '错误请求，请使用multipart/form-data格式',
        null
      )
    }
    var form = new formidable.IncomingForm()
    var targetFile = path.join(__dirname, './files')
    form.uploadDir = targetFile
    form.keepExtensions = true
    var uploadURL = ''
    form.on('file', async (name, file) => {
      // 重命名文件
      let filename = file.name
      let types = filename.split('.')
      let extra = filename.substring(0, filename.lastIndexOf('.'))
      let suffix = types[types.length - 1]
      uploadURL = `/files/${extra}_${new Date().getTime()}.${suffix}`
      await fs.renameSync(
        file.path,
        `./files/${extra}_${new Date().getTime()}.${suffix}`
      )
    })
    form.on('end', () => {
      res.json(
        showErrorModal(
          types.global.UPLOAD_FILE_SUCCESS,
          '图片上传成功',
          `${uploadURL}`
        )
      )
    })
    form.on('error', err => {})
    await form.parse(req, async (err, fields, files) => {
      if (err) {
        res.json(
          showErrorModal(types.global.UPLOAD_FILE_FAIL, '图片上传失败', null)
        )
      }
    })
  } catch (err) {
    res.json(
      showErrorModal(types.global.UPLOAD_FILE_FAIL, '图片上传失败', null)
    )
  }
}

/**
 * @desc 检查文件类型
 */
function isFormData(req) {
  let type = req.headers['content-type'] || ''
  return type.includes('multipart/form-data')
}
module.exports = {
  upload
}
