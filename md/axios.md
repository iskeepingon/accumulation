## 前言

在几个公司工作过，很少看到考虑的比较全面的ajax封装。

基于这样的一个情况，本人分享一个比较全面的基于axios的ajax封装。

## 代码要点

优秀的ajax封装的全面体现在异常处理方面更加周到。

## 代码实现

```
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
```

## 代码解读

1，http请求拦截器中的第一个参数是一个函数，在其中可以给每一个请求做一些配置项的处理，比如加时间戳等等。

2，http响应拦截器中的第一个参数同样是一个函数，在其中可以处理http响应code是200时正常或者异常的情况。

3，http响应拦截器中的第二个参数同样是一个函数，在其中可以处理除了http响应code是200以外的情况，比如未登录时的401，系统内部报错的500等等。

4，request方法的定义中可以在头headers中加一些token之类配置。

## 代码调用

仅仅知道上面的基于axois的ajax封装还不够，还得知道如何使用，代码如下：

```
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
```

## 调用解读

1，request的返回的是一个promise实例，then方法中是处理http响应code是200的情况，该情况下又分成正常和异常。

2，catch方法中可以处理的异常包括请求异常和其他的异常，其中请求异常包括有数据返回的异常和没数据返回的异常，其他异常包括http请求拦截器中代码异常，http响应拦截器中的代码异常，then方法中代码异常等等。

## 重点解释

很多开发者不会将200状态码下面的异常传递到then方法中，这是一个不好的处理方式，会让代码的适应能力变弱。同理在优秀的ajax封装中能处理的200以外的code异常，在catch中也需要能处理。如此封装，你的代码既可以统一处理异常，也可以单独对某一个请求做异常处理。

谢谢阅读！