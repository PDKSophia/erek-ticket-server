/**
 *
 * @desc stmp服务器
 * @author PDK
 *
 * Created at     : 2019-03-21
 * Last modified  : 2019-03-21
 */

const nodemailer = require('nodemailer')

// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  secureConnection: false,
  port: 465, //qq邮件服务所占用的端口
  auth: {
    user: '1063137960@qq.com',
    pass: '你的邮箱验证密码，不是qq密码'
  }
})

// 发送内容设置
const setMailOptions = function (email, type = 'code', data) {
  let text = ''
  switch (type) {
    case 'code':
      text = `<h3>hello，您本次的登陆验证码为 ${data} </h3>`
      break
    default:
      break
  }
  return {
    from: '1063137960@qq.com', // 你的qq号
    to: email,
    subject: 'erek-ticket-manage 订单后台管理登陆验证码',
    html: text
  }
}

module.exports = {
  transporter,
  setMailOptions
}
