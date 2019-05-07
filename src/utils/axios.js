import Axios from 'axios'
import { MessageBox, Loading } from './element'
import router from '@/router'
import tools from './tools'

const { getToken, setToken } = tools
let axios = Axios.create({
  baseURL: '/api'
})

let loadingInstance
let toastNoAuth = false
function noAuth () {
  if (toastNoAuth) return
  toastNoAuth = true
  MessageBox.alert('Unauthorized, Please login', 'Error', {
    confirmButtonText: 'OK',
    callback: action => {
      router.replace({ path: '/tmg/login' })
      toastNoAuth = false
    }
  })
}

function DefaultError (msg = 'System error, Please try again later') {
  MessageBox.alert(msg, 'Error', {
    confirmButtonText: 'OK',
    callback: action => {
    }
  })
}

let hasCheckToken = false
window.addEventListener('keyup', refreshToken)
window.addEventListener('click', refreshToken)
async function refreshToken () {
  if (!hasCheckToken) {
    hasCheckToken = true
    let tokenInfo = getToken()
    const remainTime = tokenInfo.expire - new Date().getTime()
    if (remainTime < 1800 * 1000 && remainTime > 5000) {
      const res = await axios.put('/refresh')
      if (res.errcode) {
        setToken({})
        noAuth()
      } else {
        setToken(res.data)
        tokenInfo = getToken()
      }
    }
    setTimeout(() => {
      hasCheckToken = false
    }, 10000)
    return tokenInfo
  }
  return null
}
async function interceptorsRequest (config) {
  let tokenInfo = getToken()
  if (!config.url.match('login') && !config.url.match('refresh')) {
    const newTokenInfo = await refreshToken()
    tokenInfo = newTokenInfo || tokenInfo
    config.headers['Authorization'] = `Bearer ${tokenInfo.token}`
  } else if (config.url.match('refresh')) {
    config.headers['Authorization'] = `Bearer ${tokenInfo.token}`
  }
  return config
}
function interceptorsRequestError (error) {
  return Promise.reject(error)
}
axios.interceptors.request.use(interceptorsRequest, interceptorsRequestError)

function interceptorsResponse (response) {
  const res = response.data
  // if (response.status === 200 && res.errcode) {
  if (response.status === 200 && res.errcode) {
    // if (res.errcode) return res
    loadingInstance = Loading.service()
    console.log('loadingInstance>>>>.', loadingInstance)
    loadingInstance.close()
    DefaultError(res.msg)
    throw new Error(res.msg)
  }
  return response
}
function interceptorsResponseError (error) {
  loadingInstance = Loading.service()
  loadingInstance.close()
  switch (error.response.status) {
    case 401:
      noAuth()
      break
    case 403:
      DefaultError(error.response.data)
      break
    default:
      DefaultError()
      break
  }
  return Promise.reject(error)
}
axios.interceptors.response.use(function (response) {
  return interceptorsResponse(response)
}, interceptorsResponseError)

// preventAxios
const requestPool = {}
const preventTime = 3000
function getRequestKey (method, url, params, data) {
  return `${method.toLowerCase()}/${url}/${data ? JSON.stringify(data) : ''}/${params ? JSON.stringify(params) : ''}`
}
const preventAxios = async function (config) {
  const { method, url, params, data } = config
  const key = getRequestKey(method, url, params, data)
  if (!requestPool[key]) {
    requestPool[key] = 'requesting'
    setTimeout(() => {
      delete requestPool[key]
    }, preventTime)
    const res = await axios(config)
    return res
  } else {
    throw new Error('preventRequest')
  }
}
preventAxios.request = preventAxios
const requestMethodsTwoParams = ['get', 'delete']
for (let method of requestMethodsTwoParams) {
  preventAxios[method] = async function () {
    const url = arguments[0]
    const { params, data } = arguments[1] || {}
    const key = getRequestKey(method, url, params, data)
    if (!requestPool[key]) {
      requestPool[key] = 'requesting'
      setTimeout(() => {
        delete requestPool[key]
      }, preventTime)
      const res = await axios[method](...arguments)
      return res
    } else {
      throw new Error('preventRequest')
    }
  }
}
const requestMethodsThreeParams = ['post', 'put', 'patch']
for (let method of requestMethodsThreeParams) {
  preventAxios[method] = async function () {
    const url = arguments[0]
    const { data } = arguments[1] || {}
    const { params } = arguments[2] || {}
    const key = getRequestKey(method, url, params, data)
    if (!requestPool[key]) {
      requestPool[key] = 'requesting'
      setTimeout(() => {
        delete requestPool[key]
      }, preventTime)
      const res = await axios[method](...arguments)
      return res
    } else {
      throw new Error('preventRequest')
    }
  }
}
axios.prevent = function () {
  return preventAxios
}

axios.interceptors.response.use(function (response) {
  let { method, url, params, data } = response.config
  url = url.split(response.config.baseURL)[1]
  const key = getRequestKey(method, url, params, data)
  if (requestPool[key] === 'requesting') {
    requestPool[key] = 'deleting'
    setTimeout(() => {
      delete requestPool[key]
    }, 2000)
  }
  return response
})

axios.interceptors.response.use(function (response) {
  return response.data
})
export default axios
