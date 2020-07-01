import Dep from './Dep'
export default class Observe {
    constructor(obj) {
        Object.keys(obj).forEach(prop => {
            // debugger
            reactive(obj, prop)
        })
    }
}

function reactive(obj, prop) {
    let value = obj[prop]
    // 闭包绑定依赖
    let dep = new Dep()
    Object.defineProperty(obj, prop, {
        configurable: true,
        enumerable: true,
        get() {
            //利用js单线程，在get时绑定订阅者
            if (Dep.target) {
                // 绑定订阅者
                dep.addSub(Dep.target)
            }
            return value
        },
        set(newVal) {
            value = newVal
            // 更新时，触发订阅者更新
            dep.notify()
        }
    })

    // 对象监听
    if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach(valueProp => {
            reactive(value, valueProp)
        })
    } 
}