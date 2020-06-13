
export default class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        if (this.subs.indexOf(sub) === -1) {
            this.subs.push(sub)
        }
    }
    notify() {
        this.subs.forEach(sub => {
            const oldVal = sub.value
            sub.cb && sub.cb(sub.get(), oldVal)
        })
    }
}