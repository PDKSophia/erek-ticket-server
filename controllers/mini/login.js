/**
 *
 * @desc 小程序登陆模块 controller
 * @author PDK
 *
 * Created at     : 2019-04-12
 * Last modified  : 2019-04-12
 */
const types = require('../../utils/error.code')
const request = require('request')
const jwt = require('jsonwebtoken')
const loginModel = require('../../models/mini/login')
const showErrorModal = require('../../utils').showErrorModal
const wx = require('../../config/default').wechat

/**
 * @desc 通过code换取openId，返回token
 * @param {String} code 兑换code
 */
async function retrieveCode(req) {
  const { nickname, avatar, code } = req.body
  return new Promise((resolve, reject) => {
    if (code) {
      // 授权登陆，换取openId
      let options = {
        method: 'POST',
        url: 'https://api.weixin.qq.com/sns/jscode2session?',
        formData: {
          appid: wx.APPID,
          secret: wx.APPSECRET,
          js_code: req.body.code,
          grant_type: 'authorization_code'
        }
      }
      request(options, async (error, response, body) => {
        if (error) {
          resolve(
            showErrorModal(
              types.login.GET_OPENID_FAIL,
              '获取用户openId失败',
              null
            )
          )
        } else {
          //返回值的字符串转JSON
          let data = JSON.parse(body)
          let token = jwt.sign(
            {
              code: req.body.code,
              openid: data.openid
            },
            'token',
            { expiresIn: '12h' }
          )

          // 1. 数据库是否存在此openId
          const openIdData = await loginModel.retrieveOpenId(data.openid)
          // 2. 存在openId,更新token
          if (openIdData.length !== 0) {
            const updateToken = await loginModel.updateUserInfo(
              data.openid,
              token
            )
            if (!updateToken) {
              resolve(
                showErrorModal(
                  types.global.UPDATE_FAIL,
                  '获取用户token失败，请重试',
                  null
                )
              )
            } else {
              resolve(
                showErrorModal(
                  types.global.UPDATE_SUCCESS,
                  '获取用户token成功',
                  updateToken
                )
              )
            }
          }
          // 3. 不存在openId, 新增一个openId及token
          if (openIdData.length === 0) {
            const result = await loginModel.createOpenIdToken(
              nickname,
              avatar,
              data.openid,
              token
            )
            if (!result) {
              resolve(
                showErrorModal(
                  types.global.CREATE_FAIL,
                  '新增用户信息失败，请重试',
                  null
                )
              )
            } else {
              resolve(
                showErrorModal(
                  types.global.CREATE_SUCCESS,
                  '新增用户信息成功',
                  result
                )
              )
            }
          }
        }
      })
    } else {
      resolve(
        showErrorModal(
          types.global.INVALID_REQUEST,
          '未携带code，请求失败',
          null
        )
      )
    }
  })
}

/**
 * @desc 通过token获取用户信息
 * @return {Object}
 */
async function retrieveUser(req) {
  const { xauthtoken } = req.headers
  try {
    const user = await loginModel.retrieveUser(xauthtoken)
    delete user[0].openid
    return showErrorModal(
      types.login.GET_USERINFO_SUCCESS,
      '获取用户信息成功',
      user[0]
    )
  } catch (err) {
    showErrorModal(types.login.GET_USERINFO_FAIL, '获取用户信息失败', null)
  }
}

/**
 * @desc 修改用户的prefix
 * @param {String} prefix
 * @return {Object}
 */
async function updateUserField(req) {
  const { xauthtoken } = req.headers
  const { prefix } = req.body
  try {
    const user = await loginModel.updateUserField(xauthtoken, prefix)
    delete user[0].openid
    return showErrorModal(
      types.login.GET_USERINFO_SUCCESS,
      '修改乘客列表成功',
      user[0]
    )
  } catch (err) {
    showErrorModal(types.login.GET_USERINFO_FAIL, '修改乘客列表失败', null)
  }
}

updateUserField

module.exports = {
  retrieveCode,
  retrieveUser,
  updateUserField
}
