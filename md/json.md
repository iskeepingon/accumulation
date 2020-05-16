## 前言

这个知识点面试中被问的概率虽然很低，但是也有可能会问。

## JSON流行原因

1. 拥有与js类似的语法
2. 可以将JSON数据结构解析成js对象
3. 与XML数据结构对比，提取数据更简单

## JSON语法

### 简单值

+ 字符串=>“123”
+ 数值=>123
+ 布尔值=>true
+ null

### 对象

{"name": "helin",“age”: 12}

### 数组

[
  {"name": "iskeeping","age": 12}
]

**注意**：JSON的key一定要用双引号，以及value如果是字符串一定要用双引号

## JSON解析方式

1. 使用eval

```
eval("({\"name\":\"iskeeping\"})")
```

2. 使用Function

```
new Function("", "return ({\"name\":\"iskeeping\"})")()
```

3. 使用JSON.parse

```
JSON.parse("{\"name\":\"iskeeping\"}")
```

## JSON序列化

let json = 简单值/对象/数组

JSON.stringify(json,null/[]/function(key,value){},字符缩进空格长度)

例：

```
let formateJson = JSON.stringify({ name: "iskeeping", age: 12 }, function (key, value) {
    switch (key) {
        case "name": return "iskeepingxx";
        default: return value;
    }
}, 8)
cosnole.log(formateJson)
```

输出formateJson如下图：

<img src="https://user-gold-cdn.xitu.io/2020/5/16/172193c913e452e8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"/>

## JSON原生支持

原生的JSON对象得到以下浏览器支持。

IE8+，Firefox3.5+，Safari 4+，Opera 10.5和chrome

谢谢阅读！