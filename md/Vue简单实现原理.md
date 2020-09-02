## 数据响应式原理

Vue是通过Object.defineProperty对实例中的data数据做了挟持并且使用Object.defineProperty的getter/setter并对其进行处理之后完成了数据的与视图的同步。

<img src="" style="width:500px"/>

这张图应该不会很陌生，熟悉Vue的同学如果仔细阅读过Vue文档的话应该都看到过。猜想一下Vue使用Object.defineProperty做为ViewModel，对数据进行挟持之后如果View和Model发生变化的话，就会通知其相对应引用的地方进行更新处理，完成视图的与数据的双向绑定。

## Vue实现的原理

1. 需要数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者。
2. 需要指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。
3. 一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图。
4. MVVM入口函数，整合以上三者，实现数据响应。

<img src="" style="width:500px"/>

## 完整的代码

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>简易Vue的实现</title>
  <script>
    class Compile {
      constructor(el, vm) {
        //  要遍历的宿主节点
        this.$el = document.querySelector(el);
        this.$vm = vm;

        //  编译
        if (this.$el) {
          //  转换宿主节点内容为片段Fragment元素
          this.$fragment = this.node2Fragment(this.$el);
          //  执行编译过程
          this.compile(this.$fragment);
          //  将编译完的HTML结果追加至宿主节点中
          this.$el.appendChild(this.$fragment);
        }
      }

      //  将宿主元素中代码片段取出来，遍历，这样做比较高效
      node2Fragment(el) {
        const frag = document.createDocumentFragment();
        //  将宿主元素中所有子元素**（搬家，搬家，搬家）**至frag中
        let child;
        //  如果 el.firstChild 为undefined或null则会停止循环
        while (child = el.firstChild) {
          frag.appendChild(child);
        }
        return frag;
      }

      compile(el) {
        //  宿主节点下的所有子元素
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach((node) => {
          if (this.isElement(node)) {
            //  如果是元素
            console.log("编译元素" + node.nodeName)
            //  拿到元素上所有的执行,伪数组
            const nodeAttrs = node.attributes;
            Array.from(nodeAttrs).forEach((attr) => {
              //  属性名
              const attrName = attr.name;
              //  属性值
              const exp = attr.value;
              //  如果是指令
              if (this.isDirective(attrName)) {
                //  q-text
                //  获取指令后面的内容
                const dir = attrName.substring(2);
                //  执行更新
                this[dir] && this[dir](node, this.$vm, exp);
              }
              //  如果是事件
              if (this.isEvent(attrName)) {
                //  事件处理
                let dir = attrName.substring(1);    //  @
                this.eventHandler(node, this.$vm, exp, dir);
              }
            })
          } else if (this.isInterpolation(node)) {
            //  如果是插值文本
            this.compileText(node);
            console.log("编译文本" + node.textContent)
          }
          //  递归子元素，解决元素嵌套问题
          if (node.childNodes && node.childNodes.length) {
            this.compile(node);
          }
        })
      }
      //  是否为节点
      isElement(node) {
        return node.nodeType === 1;
      }
      //  是否为插值文本
      isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
      }
      //  是否为指令
      isDirective(attr) {
        return attr.indexOf("q-") == 0;
      }
      // 是否为事件
      isEvent(attr) {
        return attr.indexOf("@") == 0;
      }

      //  v-text
      text(node, vm, exp) {
        this.update(node, vm, exp, "text");
      }
      textUpdater(node, value) {
        node.textContent = value;
      }

      //  双向绑定
      //  v-model
      model(node, vm, exp) {
        //  指定input的value属性，模型到视图的绑定
        this.update(node, vm, exp, "model");
        //  试图对模型的响应
        node.addEventListener('input', (e) => {
          vm[exp] = e.target.value;
        })
      }
      modelUpdater(node, value) {
        node.value = value;
      }

      //  v-html
      html(node, vm, exp) {
        this.update(node, vm, exp, "html")
      }
      htmlUpdater(node, value) {
        node.innerHTML = value;
      }

      //  更新插值文本
      compileText(node) {
        let key = RegExp.$1;
        this.update(node, this.$vm, key, "text");
      }
      //  事件处理器
      eventHandler(node, vm, exp, dir) {
        let fn = vm.$options.methods && vm.$options.methods[exp];
        if (dir && fn) {
          node.addEventListener(dir, fn.bind(vm));
        }
      }

      //  更新函数 - 桥接
      update(node, vm, exp, dir) {
        const updateFn = this[`${dir}Updater`];
        //  初始化
        updateFn && updateFn(node, vm[exp]);
        //  依赖收集
        new Watcher(vm, exp, function (value) {
          updateFn && updateFn(node, value);
        })
      }
    }
    //  管理watcher
    class Dep {
      constructor() {
        //  存储
        this.deps = [];
      }
      //  添加watcher
      appDep(dep) {
        this.deps.push(dep);
      }
      //  通知所有的watcher进行更新
      notify() {
        this.deps.forEach((dep) => {
          dep.update();
        })
      }
    }
    //  观察者 做具体更新
    class Watcher {
      constructor(vm, key, cb) {
        //  Vue实例
        this.vm = vm;
        //  需要更新的key
        this.key = key;
        //  更新后执行的函数
        this.cb = cb;
        //  将当前watcher实例指定到Dep静态属性target
        //  用来在类间进行通信
        Dep.target = this;
        //  触发getter,添加依赖
        this.vm[this.key];
        Dep.target = null;
      }
      update() {
        this.cb.call(this.vm, this.vm[this.key]);
      }
    }

    class QVue {
      constructor(options) {
        this.$options = options;
        //  数据响应
        this.$data = options.data || {};
        //  监听数据变化
        this.observe(this.$data);
        //  主要用来解析各种指令，比如v-modal，v-on:click等指令
        new Compile(options.el, this);
        //  执行生命周期
        if (options.created) {
          options.created.call(this);
        }
      }
      // 观察数据变化
      observe(value) {
        if (!value || typeof value !== "object") {
          return;
        }
        let keys = Object.keys(value);
        keys.forEach((key) => {
          this.defineReactive(value, key, value[key]);
          //  代理data中的属性到vue实例上
          this.proxyData(key);
        })
      }
      //  代理Data
      proxyData(key) {
        Object.defineProperty(this, key, {
          get() {
            return this.$data[key];
          },
          set(newVal) {
            this.$data[key] = newVal;
          }
        })
      }
      //  数据响应
      defineReactive(obj, key, val) {
        //  解决数据层次嵌套
        this.observe(val);
        const dep = new Dep();
        Object.defineProperty(obj, key, {
          get() {
            //  向管理watcher的对象追加watcher实例
            //  方便管理
            Dep.target && dep.appDep(Dep.target);
            return val;
          },
          set(newVal) {
            if (newVal === val) {
              return;
            }
            val = newVal;
            // console.log(`${key}更新了：${newVal}`)
            dep.notify();
          }
        })
      }
    }
  </script>
</head>

<body>
  <div id="app">
    <p>{{name}}</p>
    <p q-text="name"></p>
    <p>{{age}}</p>
    <p>{{doubleAge}}</p>
    <input type="text" q-model="name" />
    <button @click="changeName">点击</button>
    <div q-html="html"></div>
  </div>
  <script>
    new QVue({
      el: "#app",
      data: {
        name: "I am test",
        age: 12,
        html: "<button>这是一个后插入的按钮</button>"
      },
      created() {
        console.log("开始吧,QVue");
        setTimeout(() => {
          this.name = "测试数据，更改了么";
        }, 2000)
      },
      methods: {
        changeName() {
          this.name = "点击啦，改变吧";
          this.age = 1000000;
        }
      }
    })
  </script>
</body>

</html>
```
