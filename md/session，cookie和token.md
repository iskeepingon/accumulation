## session和cookie

会话管理通常用cookie和session(因为http是无状态的),用来共享某些数据

### session

session(唯一的,跟浏览器绑定):
	a:
		client发送一个请求到server，server接受到请求后建立一个session，并给client一个响应,其中server就会保存cookie等信息(k-v)(比如sessionid等)
		client再次请求server的时候，会自动带上cookie信息(浏览器头ua),server接受请求后校验cookie做下一步工作
	b:(禁用cookie的情况)
		url重写实现
			eg:http://aaa.com/login;sessionid=xxxx
### cookie

cookie:
	用来保持会话管理,记录用户行为,一些定制信息等

### cookie和session的区别

区别:
	session由服务器端产生保存在服务端
	cookie保存在客户端
	时效性一致,都会浏览器绑定
	session是保存一些状态信息,cookie是做凭证

## token

token:
	临时签名,适用于restful api
	一般存放在cookie中或者session或者redis等db中
	token认证流程和cookie类似
	token校验服务器一般采用过滤器一层层校验

## session，cookie和token的区别

区别:
	token可以防止csrf攻击,session cookie不行
	tokenk可以主动续期,session和cookie失效就要重新登录
	token可以很容易做分布式存储,session和cookie不是特别好做(可以用其他方式实现,但是没有token容易)