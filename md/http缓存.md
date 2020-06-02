## 前言

HTTP缓存的内容是大部分的面试中都会问到的知识点，这里做一个分享。

## HTTP缓存

HTTP缓存分为2种，一种是强缓存，另一种是协商缓存。主要作用是可以加快资源获取速度，提升用户体验，减少网络传输，缓解服务端的压力。

## 强缓存

不需要发送请求到服务端，直接读取浏览器本地缓存，在Chrome的Network中显示的HTTP状态码是200。是否强缓存由Expires、Cache-Control和Pragma 3个Header属性共同来控制。

### Expires

Expires的值是一个HTTP日期，在浏览器发起请求时，会根据系统时间和Expires的值进行比较，如果系统时间超过了Expires的值，缓存失效。由于和系统时间进行比较，所以当系统时间和服务器时间不一致的时候，会有缓存有效期不准的问题。

### Cache-Control

Cache-Control是HTTP/1.1中新增的属性，在请求头和响应头中都可以使用，常用的属性值有：

+ max-age：单位是秒，缓存时间计算的方式是距离发起的时间的秒数，超过间隔的秒数缓存失效
+ no-cache：不使用强缓存，需要与服务器验证缓存是否新鲜
+ no-store：禁止使用缓存（包括协商缓存），每次都向服务器请求最新的资源
+ private：专用于个人的缓存，中间代理、CDN等不能缓存此响应
+ public：响应可以被中间代理、CDN等缓存
+ must-revalidate：在缓存过期前可以使用，过期后必须向服务器验证

### Pragma

Pragma只有一个属性值，就是no-cache，效果和Cache-Control中的no-cache一致，不使用强缓存，需要与服务器对比缓存是否新鲜。

### 优先级

Expires < Cache-Control < Pragma，这也意味着当设置Pragma为no-cache时，Catch-Control设置为无效。类似于css中的优先级，优先级高的样式才会生效。

## 协商缓存

当浏览器的强缓存失效的时候或者请求头中设置了不走强缓存，并且在请求头中设置了If-Modified-Since或者If-None-Match的时候，会将这两个属性值传到服务端去验证是否命中协商缓存，如果命中了协商缓存，会返回304状态，加载浏览器缓存，并且响应头会设置Last-Modified或者ETag属性。

+ ETag/If-None-Match

ETag/If-None-Match的值是一串hash码，代表的是一个资源的标识符，当服务端的文件变化的时候，它的hash码会随之改变，通过请求头中的If-None-Match和当前文件的hash值进行比较，如果相等则表示命中协商缓存。ETag又有强弱校验之分，如果hash码是以"W/"开头的一串字符串，说明此时协商缓存的校验是弱校验的，只有服务器上的文件差异（根据ETag计算方式来决定）达到能够触发hash值后缀变化的时候，才会真正地请求资源，否则返回304并加载浏览器缓存。

+ Last-Modified/If-Modified-Since

Last-Modified/If-Modified-Since的值代表的是文件的最后修改时间，第一次请求服务端会把资源的最后修改时间放到Last-Modified响应头中，第二次发起请求的时候，请求头会带上上一次响应头中的Last-Modified的时间，并放到If-Modified-Since请求头属性中，服务端根据文件最后一次修改时间和If-Modified-Since的值进行比较，如果相等，返回304，并加载浏览器缓存。

## HTTP缓存的运用

知道HTTP缓存在web前端项目中如何运用，才算真正地理解HTTP缓存。

### 场景一

web前端的资源包括css，js，html，image等，这些资源响应到浏览器都是index.css、index.html、index.js、index.png之类的。此时可以这样设置HTTP缓存，对于长期不变化的资源可以设置成强缓存，而对于短期内变化多的可以设置成协商缓存。

### 场景二

当web前端的资源经过了gulp/webpack之类的工具处理，响应到浏览器都是index.hash.css之类的时候，你可以将这些资源设置成强缓存。为什么这种情况下要设置强缓存呢？你可以这样理解，index.hash.css设置成强缓存，只有过期时间超出了，该文件才会重新从服务器请求获取一次。可能你会说该文件在过期时间没超出的时候重新修改了，不是有问题吗？其实不会，因为文件修改了，你会重新使用gulp/webpack处理一次，处理后的文件的hash值改变了，也就是文件不同了，浏览器当然没有该文件的缓存，自然会重新从服务器请求一次。

## 总结

2020年了，单应用的index.html可以设置为不缓存，其他的经过了webpack/gulp处理了并添加了hash值文件都设置成强缓存。其他的没有经过webpack/gulp处理的文件，就根据上述场景一描述的设置。
