import localStorage from './localStorage'

const tokenKey = 'access_token'
const getToken = function () {
  return localStorage.get(tokenKey) || {}
}
const setToken = function (data) {
  localStorage.set(tokenKey, { token: data.access_token, expire: new Date().getTime() + data.expires_in * 1000 })
}
const delToken = function () {
  localStorage.del(tokenKey)
}

const userInfoKey = 'userInfo'
const getUserInfo = function () {
  return localStorage.get(userInfoKey) || {}
}
const setUserInfo = function (data) {
  localStorage.set(userInfoKey, data)
}

const parseQueryString = function (url) {
  var regUrl = /^[^?]+\?([\w\W]+)$/
  var regPara = /([^&=]+)=([\w\W]*?)(&|$)/g
  var arrArl = regUrl.exec(url)
  var ret = {}
  if (arrArl && arrArl[1]) {
    var strPara = arrArl[1]; var result
    while ((result = regPara.exec(strPara)) != null) {
      ret[result[1]] = result[2]
    }
  }
  return ret
}
export const downloadFile = function (href, filename) {
  var eleLink = document.createElement('a')
  eleLink.href = href
  eleLink.style.display = 'none'
  eleLink.download = filename
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}

export default {
  getToken,
  setToken,
  delToken,
  getUserInfo,
  setUserInfo,
  parseQueryString,
  downloadFile
}
