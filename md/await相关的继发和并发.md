## 前言

如何使用async、await实现并发和继发

## 继发

继发的含义就是

## 并发

并发的含义就是

## 实现

```
function foo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('foo:' + new Date().toLocaleString())
            resolve('foo')
        }, 2000)
    })
}

function bar() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('bar:' + new Date().toLocaleString())
            resolve('bar')
        }, 2000)
    })
}

//继发执行
async function main() {
    console.log('beginTime:' + new Date().toLocaleString())
    var foostr = await foo()
    console.log(new Date().toLocaleString())
    console.log(foostr)
    var barstr = await bar()
    console.log(new Date().toLocaleString())
    console.log(barstr)
    console.log('endTime:' + new Date().toLocaleString())
}

//继发执行
async function main2() {
    let docs = [foo, bar]
    console.log('beginTime:' + new Date().toLocaleString())
    for (let doc of docs) {
        var str = await doc()
        console.log(new Date().toLocaleString())
        console.log(str)
    }
    console.log('endTime:' + new Date().toLocaleString())
}

//并发执行 
async function async_main() {
    console.log('beginTime:' + new Date().toLocaleString())
    let [get_foo, get_bar] = await Promise.all([foo(), bar()])
    console.log(new Date().toLocaleString())
    console.log(get_foo)
    console.log(get_bar)
    console.log('endTime:' + new Date().toLocaleString())
}

//并发执行 
async function async_main4() {
    let docs = [foo(), bar()]
    console.log('beginTime:' + new Date().toLocaleString())
    for (let doc of docs) {
        var str = await doc
        console.log(new Date().toLocaleString())
        console.log(str)
    }
    console.log('endTime:' + new Date().toLocaleString())
}


//并发执行
async function async_main2() {
    console.log('beginTime:' + new Date().toLocaleString())
    let fooPromise = foo()
    let barPromise = bar()
    let get_foo = await fooPromise
    console.log(new Date().toLocaleString())
    console.log(get_foo)
    let get_bar = await barPromise
    console.log(new Date().toLocaleString())
    console.log(get_bar)
    console.log('endTime:' + new Date().toLocaleString())
}

//并发执行 但是 会先执行 endTime
async function async_main3() {
    let docs = [foo, bar]
    console.log('beginTime:' + new Date().toLocaleString())
    docs.forEach(async (val) => {
        var str = await val()
        console.log(new Date().toLocaleString())
        console.log(str)
    })
    console.log('endTime:' + new Date().toLocaleString())
}
```