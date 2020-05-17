## 前言

相信很多人都在面试中被问过什么是跨域，怎么解决跨域。本文不列举跨域的几种方式，但是会用简单的文字描述CORS，力求CORS能被轻松的理解。

## 跨域

由于浏览器同源策略，浏览器直接从脚本内发起的非同源HTTP请求不会得到正常的成功的响应。

### 同源

协议、域名、端口号都相同时，才算是同源。

### 非同源

只要协议或域名或端口有一个不相同，也就是非同源。

## CORS

CORS全称跨域资源共享，它解决了当跨域访问资源时，浏览器和服务器的如何沟通的问题。换句话说，就是使用CORS可以解决跨域的问题。

## 简单请求

若请求满足所有下述条件，则该请求可视为简单请求。

+ 使用下列方法之一

    - GET
    - HEAD
    - POST

+ 除了下列三种
   
    - 被用户代理自动设置的首部字段（例如Connection，User-Agent）
    - 在Fetch规范中定义为禁用首部名称的其他首部
    - 允许人为设置的字段为Fetch规范定义的对CORS安全的首部字段集合（Accept、Accept-Language、Content-Language、Content-Type、DPR、Downlink、Save-Data、Viewport-Width、Width）

+ Content-Type的值仅限于下列三者之一

    - text/plain
    - multipart/form-data
    - application/x-www-form-urlencoded

+ 请求中的任意XMLHttpRequestUpload对象均没有注册任何事件监听器（XMLHttpRequestUpload对象可以使用XMLHttpRequest.upload属性访问）

+ 请求中没有使用ReadableStream对象

## 非简单请求

与简单请求不同，非简单请求要求必须首先使用OPTIONS方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。如果允许，浏览器就会再发起一个实际请求。如果不允许，服务器响应头中是没有CORS相关的头信息字段。

## 浏览器设置

```
import axios from 'axios'

const token = localStorage.getItem('token')
const request = ({ url, method, data, success, error }) => {
    axios({
        url: url,
        method: method,
        data: data,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'B2B-Authorization': token == null ? '' : token
        }
    })
        .then(res => {
            //成功
            if (typeof success === 'function') {
                success(res)
            }
        })
        .catch((err) => {
            //失败
            if (typeof error === 'function') {
                error(err)
            }
        })
}
export default request
```

这段代码调用时，只要不同源，就会产生跨域并且发送非简单请求。

## NGINX服务器配置

```
server
{
    listen 3002;
    server_name localhost;
    location /ok {
        proxy_pass http://localhost:3000;

        #   指定允许跨域的方法，*代表所有
        add_header Access-Control-Allow-Methods *;

        #   预检命令的缓存，如果不缓存每次会发送两次请求
        add_header Access-Control-Max-Age 3600;
        #   带cookie请求需要加上这个字段，并设置为true
        add_header Access-Control-Allow-Credentials true;

        #   表示允许这个域跨域调用（客户端发送请求的域名和端口） 
        #   $http_origin动态获取请求客户端请求的域   不用*的原因是带cookie的请求不支持*号
        add_header Access-Control-Allow-Origin $http_origin;

        #   表示请求头的字段 动态获取
        add_header Access-Control-Allow-Headers 
        $http_access_control_request_headers;

        #   OPTIONS预检命令，预检命令通过时才发送请求
        #   检查请求的类型是不是预检命令
        if ($request_method = OPTIONS){
            return 200;
        }
    }
}
```

## HTTP首部字段

### 请求首部字段

+ Origin

表明预检请求或实际请求的源站。

+ Access-Control-Request-Method

用于预检请求。其作用是，将实际请求所使用的 HTTP 方法告诉服务器。

+ Access-Control-Request-Headers

用于预检请求。其作用是，将实际请求所携带的首部字段告诉服务器。

### 响应首部字段

+ Access-Control-Allow-Origin

表示允许来自所有域的请求/具体域的请求。

+ Access-Control-Expose-Headers

让服务器把允许浏览器访问的头放入白名单。这样浏览器就能够通过getResponseHeader访问白名单中的响应头了。

+ Access-Control-Max-Age

指定了preflight请求的结果能够被缓存多久。

+ Access-Control-Allow-Credentials

指定了当浏览器的credentials设置为true时是否允许浏览器读取response的内容。当用在对preflight预检测请求的响应中时，它指定了实际的请求是否可以使用credentials。请注意：简单 GET 请求不会被预检；如果对此类请求的响应中不包含该字段，这个响应将被忽略掉，并且浏览器也不会将相应内容返回给网页。

+ Access-Control-Allow-Methods

用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。

+ Access-Control-Allow-Headers

用于预检请求的响应。其指明了实际请求中允许携带的首部字段。

谢谢阅读！