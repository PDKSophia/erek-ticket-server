/**
 *
 * @desc 登陆模块 controller
 * @author PDK
 *
 * Created at     : 2019-03-21
 * Last modified  : 2019-04-06
 */
const types = require('../../utils/error.code')
const stmp = require('../../config/smtp')
const loginModel = require('../../models/backend/login')
const redisClient = require('../../config/redis')
const showErrorModal = require('../../utils').showErrorModal

/**
 * @desc 通过email发送验证码
 * @return {Object}
 */
async function retrieveCode(req, payload) {
	try {
		var code = ''
		while (code.length < 5) {
			code += Math.floor(Math.random() * 10)
		}

		var emailOptions = stmp.setMailOptions(payload.email, 'code', code)
		await stmp.transporter.sendMail(emailOptions)


		console.log('妈呀，session 是什么?', req.session)
		if (!req.session) {
			console.log('没session')
			return new Error('oh no') // handle error
		} else {
			req.session.email = payload.email
			req.session.email_code = code
			console.log('缓存session', req.session)
		}
		return showErrorModal(types.login.RETRIEVE_EMAIL_CODE_SUCCESS, '验证码发送成功～', '验证码发送成功～')
	} catch (error) {
		console.info(error)
		return showErrorModal(types.login.RETRIEVE_EMAIL_CODE_FAIL, '验证码发送错误, 请检验邮箱正确性', null)
	}
}

/**
 * @desc 获取token
 * @return {Object}
 */
async function retrieveToken(req) {
	const { username, password, email, code } = req.body
	return new Promise((resolve, reject) => {
		redisClient.keys('sess:*', (error, keyList) => {
			let key = keyList[0]
			console.log('????', key)
			if (!key) {
				resolve(showErrorModal(types.login.CHECK_EMAIL_CODE_ERROR, '服务器错误，请重新获取验证码', '服务器错误，请重新获取验证码'))
			} else {
				redisClient.get(key, async (err, data) => {
					const { email_code } = typeof data == 'string' ? JSON.parse(data) : data
					if (code != email_code) {
						resolve(showErrorModal(types.login.CHECK_EMAIL_CODE_ERROR, '验证码不正确', '验证码不正确'))
					} else {
						const response = await loginModel.retrieveToken(username, password, email)
						console.log('结果: ', response)
						if (response.length === 0) {
							resolve(showErrorModal(types.login.LOGIN_FAIL, '该账号不存在，请联系管理员', null))
						} else {
							req.session.user_name = response[0].username + response[0].email
							let result = {
								username: response[0].username,
								token: response[0].token,
								email: response[0].email,
								role: response[0].role,
								departmentId: response[0].departmentId
							}
							resolve(showErrorModal(types.login.LOGIN_SUCCESS, '登陆成功', result))
						}
					}
				})
			}
		})
	})
}

/**
 * @desc 通过token获取用户信息
 * @return {Object}
 */
async function retrieveUser(req) {
	const { xauttoken } = req.headers
	try {
		const user = await loginModel.retrieveUser(xauttoken)
		delete user[0].password // 去除密码
		return showErrorModal(types.login.GET_USERINFO_SUCCESS, '获取用户信息成功', user[0])
	} catch (err) {
		showErrorModal(types.login.GET_USERINFO_FAIL, '获取用户信息失败', null)
	}
}
module.exports = {
	retrieveCode,
	retrieveToken,
	retrieveUser
}
