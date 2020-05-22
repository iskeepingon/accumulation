import axios from 'axios'

// 设置超时时间
axios.defaults.timeout = 3000
// http请求拦截器
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})
//http 200 状态码下的异常map
const erorrMap = {
    'CMN00000': '成功',
    'CMN00001': '输入参数为空',
    'CMN00002': '输入参数校验失败'
}
// http响应拦截器
axios.interceptors.response.use(res => {
    //可以根据后端的系统而相应的做调整
    let code = res.data.code
    if (code === 'CMN00000') {
    } else {
        if (erorrMap[code]) {
            //erorrMap[code]
        } else {
            //'未知错误'
        }
    }
    return res
}, async (error) => {
    if (error.request) {
        if (error.request.status === 0) {
            //超时
        }
    } else if (error.response) {
        if (error.response.status === 400) {
            //请求参数有问题
        } else if (error.response.status === 404) {
            //未找到资源
        } else if (error.response.status === 401) {
            //请先登录
        } else if (error.response.status === 500) {
            //服务器异常
        }
    }
    return Promise.reject(error)
})

let request = (config = {}) => {
    //可以根据情况做相应的调整
    let token = window.localStorage.getItem('token')
    axios.defaults.headers.common['token'] = token || ''
    return axios.request(
        config
    )
}

export default request

import request from './request'
import * as url from './url'

request(
    {
        url: url.apiRegister
    }
).then((res) => {
    let code = res.data.code
    if (code === 'CMN00000') {
        //成功
    } else {
    }
}).catch((error) => {
    if (error.response) {
    } else if (error.request) {
    } else {
        console.log(error)
    }
})