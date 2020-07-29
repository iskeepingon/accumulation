## Hybrid App

Hybrid App是运行在安卓/苹果App(也叫Native App)的webview中的Web App。

## Hybrid App优势

Hybrid App结合了Native App良好用户交互体验和Web App跨平台开发的优势，能够显著节省移动应用开发的时间和成本，Hybrid App得到越来越多公司的青睐。

## H5和安卓App的交互

1. JavascriptInterface

在js上下文注入一个名字是wx的JavascriptInterface。

```
WebView webView = (WebView)findViewById(R.id.shop);
webView.getSettings().setJavaScriptEnabled(true);
class JsInterface {
  @JavascriptInterface
  public void showToast(String toast) {
    Toast.makeText(MainActivity.this, toast, Toast.LENGTH_SHORT).show();
  }
}
webView.addJavascriptInterface(new JsInterface(), "wx");
```

在html中调用

```
<div>我是webview</div>
<div id="cs">测试JavascriptInterface</div>
</body>
<script>
  $("#cs").on("click", function(){
    wx.showToast("我是弹窗");
  })
</script>
```

2. loadUrl或者evaluateJavascript

android可以通过loadUrl或者evaluateJavascript直接执行js的方法

在html中声明

```
window.Bridge = {
  callJS(){
    alert("我是callJS")
  }
}
```

在安卓中调用

```
webView.loadUrl("javascript:Bridge.callJS()");
```

在苹果中调用

```
webView.evaluateJavascript("javascript:Bridge.callJS()", new ValueCallback<String>() {
    @Override
    public void onReceiveValue(String value) {
      //此处为 Bridge.callJS返回的结果
    }
});
```

**注意：** webView.evaluateJavascript，只在android4.4以上才能用

## H5和苹果App的交互

1. 使用JavaScriptCore.framework框架

OC里要实现的代码：

```
- (void)webViewDidFinishLoad:(UIWebView *)webView{

  JSContext *context = [webView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];

  context[@"passValue"] = ^{

    NSArray *arg = [JSContext currentArguments];
    for (id obj in arg) {
        NSLog(@"%@", obj);
    }
  };
}
```

其中passValue是JS的函数名，得到的arg数组 里面为JS的passValue函数的参数，即JS要传给OC的参数。

JS里要实现的代码：

```
function testClick() {
  var str1=document.getElementById("text1").value;
  var str2=document.getElementById("text2").value;

  passValue(str1,str2);
}
```

在需要给OC传值的函数里（例如：testClick（））直接调用 passValue（）函数，将值传进去即可。

2. 使用自定义url方法

JS里要实现的代码：

```
function testClick() {
  var str1=document.getElementById("text1").value;
  var str2=document.getElementById("text2").value;

  //  "objc://"为自定义协议头;
  //  str1&str2为要传给OC的值,以":/"作为分隔
  window.location.href="objc://"+":/"+str1+":/"+str2;
}
```

在需要给OC传值的函数里（例如：testClick（））写如上格式的代码。

其中objc://是自定义的协议头，str1与str2为JS要传给OC的值。

OC里要实现的代码：

```
//遵守UIWebViewDelegate代理协议。
-(BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType{
  //拿到网页的实时url
  NSString *requestStr = [[request.URL absoluteString] stringByRemovingPercentEncoding];

  //在url中寻找自定义协议头"objc://"
  if ([requestStr hasPrefix:@"objc://"]) {

    // 以"://"为中心将url分割成两部分，放进数组arr
    NSArray *arr = [requestStr componentsSeparatedByString:@"://"];
    NSLog(@"%@",arr);

    //取其后半段
    NSString *paramStr = arr[1];
    NSLog(@"%@",paramStr);

    //以":/"为标识将后半段url分割成若干部分，放进数组arr2，此时arr2[0]为空，arr2[1]为第一个传参值，arr2[2]为第二个传参值，以此类推
    NSArray *arr2 = [paramStr componentsSeparatedByString:@":/"];
    NSLog(@"%@",arr2);

    //取出参数，进行使用
    if (arr2.count) {
      NSLog(@"有参数");
      [self doSomeThingWithParamA:arr2[1] andParamB:arr2[2]];
    }else{
      NSLog(@"无参数");
    }
    return NO;
  }

  return YES;
}
//对JS传来的值进行调用
- (void)doSomeThingWithParamA:(id)paramA andParamB:(id)paramB{

  NSLog(@"%@    %@", paramA, paramB);
}
```

3. 使用WebViewJavascriptBridge三方库

OC传值给JS

JS里需要实现的代码：

```
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

//调用上面定义的函数
setupWebViewJavascriptBridge(function (bridge){

  //OC传值给JS 'testJavascriptHandler'为双方自定义好的统一方法名；'data'是OC传过来的值；'responseCallback'是JS接收到之后给OC的回调
  bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
      //打印OC传过来的值
      log('ObjC called testJavascriptHandler with', data)

      var responseData = { 'Javascript Says':'Right back atcha!' }

      log('JS responding with', responseData)

      //给OC的回调
      responseCallback(responseData)

  })
})
```

OC里需要实现的代码：

导入第三方库WebViewJavascriptBridge；遵守UIWebViewDelegate；

```
//设置第三方Bridge是否可用
[WebViewJavascriptBridge enableLogging];

//关联webView和bridge
_bridge = [WebViewJavascriptBridge bridgeForWebView:web];

[_bridge setWebViewDelegate:self];

//OC给JS传值，双方自定义一个统一的方法名'testJavascriptHandler'；data里即为要传过去的值
[_bridge callHandler:@"testJavascriptHandler" data:@{@"年龄":@"20"}];
```

JS传值给OC

JS里需要实现的代码：

```
//点击网页上一个按钮时
callbackBt.onclick = function() {  
  var str1=document.getElementById("text1").value;
  var str2=document.getElementById("text2").value;

  //JS给OC传值。'passValue'为双方自定义的统一方法名；'str1'&'str2'为要传的值； response为OC收到后给JS的回调
  bridge.callHandler('passValue', {str1,str2}, function(response) {
  })

}
```

OC里需要实现的代码：

导入第三方库WebViewJavascriptBridge；遵守UIWebViewDelegate；

```
//设置第三方Bridge是否可用
[WebViewJavascriptBridge enableLogging];

//关联webView和bridge
_bridge = [WebViewJavascriptBridge bridgeForWebView:web];

[_bridge setWebViewDelegate:self];

//js给oc传值.'passValue'为双方自定义的统一方法名；'data'为JS传过来的值；'responseCallback'为OC收到值后给JS返回的回调
[_bridge registerHandler:@"passValue" handler:^(id data, WVJBResponseCallback responseCallback) {

  //打印js传过来的值
  NSLog(@"%@", data);

  //返回给js的值
  responseCallback(@"收到了");
}];
```

**注意：** 不论哪方给哪方传值，传值的方法名称与对应接收值的方法名称要保持一致。

## JsBridge

Hybrid App中的JsBridge是上述的交互组合起来的结果。