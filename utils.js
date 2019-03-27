const backendURL = '/wapp-backend/api'
const miniURL = '/wapp/api'
/**
 * 显示提示错误函数
 * @param {Error} error
 * @param {Function} callback
 */
const showErrorModal = (code, msg, data) => {
  return {
    code: code,
    msg: msg || 'sorry, server error',
    data: data || msg
  }
}

/**
 * 随机生成token
 * @return {String} token
 */
const createTokenString = () => {
  var seed = new Array(
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'm',
    'n',
    'p',
    'Q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
  )
  seedlength = seed.length //数组长度
  var _token = ''
  for (i = 0; i < 30; i++) {
    j = Math.floor(Math.random() * seedlength)
    _token += seed[j]
  }
  return _token
}
module.exports = {
  backendURL,
  miniURL,
  showErrorModal,
  createTokenString
}
