## 前言

web安全基本是一个常问的知识点，这里做个简单分享。

## CSRF攻击

CSRF全称Cross-site request forgery，可以翻译为跨站请求伪造。它的原理可以简单理解为攻击者盗用了你的身份，以你的名义发送恶意请求。

## CSRF攻击的例子

### GET请求的攻击

有一个链接http://xxx.yyy.com/publish.php?content=很快回家回家回家后&title=CSRF攻击的例子，是用来发布文章的。

像平时一样，你登录上述链接的平台的账户发文，但是没有退出登录。此时有人给你发了上述链接你点击了，于是你在不知情的情况下受到了一次CSRF攻击。

### POST请求的攻击

由于GET请求的攻击很快被站点开发人员发现了，他们将请求方式改成了POST，于是通过GET请求不能完成CSRF攻击。攻击者也升级了他们的攻击方式，他们在自己的网页中嵌入一个form表单。只要你打开他们的网站并且点击，你还是会不可避免的再次受到CSRF攻击。

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



### 检测Referer



### Token



## XSS攻击

XSS全称Cross-site script，可以翻译为跨站脚本攻击。它的原理可以理解成攻击者向有XSS漏洞的网站中输入恶意的HTML代码，当其它用户浏览该网站时候，该段HTML代码会自动执行，从而达到攻击的目的，如盗取用户的Cookie，破坏页面结构，重定向到其它网站等。

## XSS攻击的防御




谢谢阅读！