## 前言

相信很多人都在面试中被问过什么是跨域，怎么解决跨域。本文不列举跨域的几种方式，但是会仔细的讲解cors跨域。

## 跨域

由于浏览器同源策略，浏览器限从脚本内发起的非同源HTTP请求不会得到成功的响应。

### 同源

协议、域名、端口号都相同时，才算是同源。

### 非同源

只要协议或域名或端口有一个不相同，就会形成跨域，也就是非同源。

## CORS

CORS全称跨域资源共享，它解决了当跨域访问资源时，浏览器和服务器的如何沟通的问题。换句话说，就是使用cors可以解决跨域的问题。

## 简单请求

若请求满足所有下述条件，则该请求可视为简单请求。

+ 使用下列方法之一

    - GET
    - HEAD
    - POST

+ 除了下列三种
   
    - 被用户代理自动设置的首部字段（例如Connection，User-Agent）
    - 在Fetch规范中定义为禁用首部名称的其他首部
    - 允许人为设置的字段为Fetch规范定义的对CORS 安全的首部字段集合（Accept、Accept-Language、Content-Language、Content-Type、DPR、Downlink、Save-Data、Viewport-Width、Width）

+ Content-Type的值仅限于下列三者之一

    - text/plain
    - multipart/form-data
    - application/x-www-form-urlencoded

+ 请求中的任意XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。

+ 请求中没有使用 ReadableStream 对象。

例：

简单请求

```
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081130 Minefield/3.1b3pre

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```

## 非简单请求

与简单请求不同，非简单请求要求必须首先使用OPTIONS方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。如果允许，浏览器就会再发起一个实际请求。如果不允许，服务器响应头中是没有cors相关的头信息字段。

例：

### 预检请求

```
OPTIONS /resources/post-here/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081130 Minefield/3.1b3pre
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Connection: keep-alive
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```

### 实际请求

```
POST /resources/post-here/ HTTP/1.1

Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081130 Minefield/3.1b3pre
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Connection: keep-alive
X-PINGOTHER: pingpong
Content-Type: text/xml; charset=UTF-8
Referer: http://foo.example/examples/preflightInvocation.html
Content-Length: 55
Origin: http://foo.example
Pragma: no-cache
Cache-Control: no-cache

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:40 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://foo.example
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 235
Keep-Alive: timeout=2, max=99
Connection: Keep-Alive
Content-Type: text/plain
```

## HTTP 响应首部字段

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

## HTTP 请求首部字段

+ Origin

表明预检请求或实际请求的源站。

+ Access-Control-Request-Method

用于预检请求。其作用是，将实际请求所使用的 HTTP 方法告诉服务器。

+ Access-Control-Request-Headers

用于预检请求。其作用是，将实际请求所携带的首部字段告诉服务器。

谢谢阅读！