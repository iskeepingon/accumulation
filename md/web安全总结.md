## 前言

web安全基本是一个常问的知识点，这里分享一下CSRF和XSS。

## CSRF攻击

CSRF全称Cross-site request forgery，可以翻译为跨站请求伪造。它的原理可以简单理解为攻击者盗用了你的身份，以你的名义发送恶意请求。

## CSRF攻击的例子

### GET请求的攻击

有一个链接http://xxx.yyy.com/publish.php?content=很快回家回家回家后&title=CSRF攻击的例子，是用来发布文章的。

像平时一样，你登录上述链接的平台的账户发文，但是没有退出登录。此时有人给你发了上述链接你点击了，于是你在不知情的情况下受到了一次CSRF攻击。

### POST请求的攻击

由于GET请求的攻击很快被站点开发人员发现了，他们将请求方式改成了POST，于是通过GET请求不能完成CSRF攻击。攻击者也升级了他们的攻击方式，他们在自己的网页中嵌入一个form表单。只要你打开他们的网站，你还是会不可避免的再次受到CSRF攻击。

```
<!DOCTYPE html>
<html>

<head>
    <title>CSRF攻击</title>
</head>

<body onload="attack()">
    　　<form method="POST" name="transfer" 　action="http://xxx.yyy.com/publish.php">
        　　<input type="hidden" name="title" value="CSRF攻击的例子">
        　　<input type="hidden" name="content" value="很快回家回家回家后">
    　　</form>
</body>

</html>
```

## CSRF攻击的防御

### 关键操作只接受POST请求+验证码

CSRF 攻击的过程，往往是在用户不知情的情况下发生的，在用户不知情的情况下构造网络请求，所以如果使用验证码，那么每次操作都需要用户进行互动，从而简单有效地防御了CSRF的攻击。

### 检测Referer

通过检查Referer的值，我们就可以判断这个请求是合法的还是非法的，但是问题出在服务器不是任何时候都接受到Referer的值，所以Referer Check一般用于监控CSRF攻击的发生，而不用来抵御攻击。

### Token

CSRF攻击成功与否，在于攻击者是否能够准确地预测所有的参数从而构造出合法的请求，所以根据不可预测性原则，我们可以对参数进行加密从而防止CSRF攻击，可以保存其原有参数不变，另外添加一个参数Token，其值是随机的，这样攻击者因为不知道Token而无法构造出合法的请求进行攻击。

### 注意

过滤用户输入的内容不能阻挡CSRF攻击，我们需要做的事过滤请求的来源，因为有些请求是合法，有些是非法的，所以CSRF防御主要是过滤那些非法伪造的请求来源。

## XSS攻击

XSS全称Cross-site script，可以翻译为跨站脚本攻击。它的原理可以理解成攻击者向有XSS漏洞的网站中输入恶意的HTML代码，当其它用户浏览该网站时候，该段HTML代码会自动执行，从而达到攻击的目的，如盗取用户的Cookie，破坏页面结构，重定向到其它网站等。

## XSS攻击的防御

### 不需要用户输入HTML的时候，可以直接对用户的输入进行HTML转义

```
<script>
  window.location.href="http://www.xss.com.cn";
</script>
```

转义成

```
&lt;script&gt;window.location.href=&quot;http://www.xss.com.cn&quot;&lt;/script&gt;
```

### 当用户需要输入HTML代码的时候

仅仅粗暴地去掉script标签是没有用的，任何一个合法HTML标签都可以添加onclick一类的事件属性来执行js脚本。

更好的方法可能是，将用户的输入使用HTML解析库进行解析，获取其中的数据。然后根据用户原有的标签属性，重新构建HTML元素树。构建的过程中，所有的标签、属性都只从白名单中拿取。

谢谢阅读！

需要加微信交流，可留言！