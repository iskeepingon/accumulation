/**
 * http封装请求
 */
import {fetch} from 'whatwg-fetch'

let erorrMap = {
  'CMN00000': '成功',
  'CMN00001': '输入参数为空',
  'CMN00002': '输入参数校验失败'
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    if (error.response.status === 401) {
      //'请先登录'
    } else if (error.response.status === 500) {
      //'服务器异常'
    } else if (error.response.status === 504) {
      //'网络超时'
    }
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function clone(jsonObj) {
  try {
    return JSON.parse(JSON.stringify(jsonObj))
  } catch (err) {
    return {}
  }
}

let request = (config) => {
  let token = window.localStorage.getItem('token')
  let options = clone(config)
  options.body = options.data
  delete options.data
  fetch(
    config.url + config.params,
    Object.assign({
      method: 'post',
      headers: {
        token: token || ''
      }
    }, options)
  )
    .then(checkStatus)
    .then(parseJSON)
    .then(function (res) {
      if (res.data.code === 'CMN00000') {
      } else {
        erorrMap
      }
      return res
    })
    .catch(function (error) {
      // 处理异常，
      // 可处理到200之外的异常，
      // http响应拦截器中代码异常，
      // then代码中的异常
      console.log('request failed', error)
    })
}

export default request

request({
  params: {},
  data: {},
  method: 'post'
}).then((res) => {
  if (res.data.code === 'CMN00000') {
  }
}).catch((err) => {
  // 处理异常，
  // 可处理到200之外的异常，
  // http响应拦截器中代码异常，
  // then代码中的异常
})
