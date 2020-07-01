import Dep from './Dep'
export default class Watcher {
    constructor(data, exp, cb) {
        this.data = data
        this.exp = exp
        this.cb = cb
        this.get()
    }
    get() {
        Dep.target = this
        this.value = (function calcValue(data, prop) {
            for (let i = 0, len = prop.length; i < len; i++ ) {
                data = data[prop[i]]
            }
            return data
        })(this.data, this.exp.split('.'))
        Dep.target = null
        return this.value
    }
}