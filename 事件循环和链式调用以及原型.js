function Person(name) {
    console.log(name || '')
    this.fns = []
}

Person.prototype = {
    _common: function (callback, name) {
        let len = this.fns.length
        if (len > 0 && this.fns[len - 1].isDelay) {
            this.fns[len - 1].callbacks.push(function () {
                callback(name)
            })
        } else {
            callback(name)
        }
        return this

    },
    eat: function (name) {
        let callback = function (name) {
            console.log(name || '')
        }
        return this._common(callback, name)
    },
    sleep: function (time) {// 开启一个宏任务，并且新建一个任务队列
        let _this = this
        let timeCount = time || 1000
        for (let i = 0; i < _this.fns.length; i++) {
            timeCount += _this.fns[i].time
        }
        let fn = { isDelay: true, callbacks: [], time: timeCount }
        this.fns.push(fn)
        setTimeout(function () {
            console.log(new Date().getTime())
            if (_this.fns.length > 0) {
                let fn = _this.fns.shift()
                for (let i = 0; i < fn.callbacks.length; i++) {
                    typeof fn.callbacks[i] === 'function' && fn.callbacks[i]()
                }
            }
        }, fn.time)
        return this
    },
    play: function (name) {
        let callback = function (name) {
            console.log(name || '')
        }
        return this._common(callback, name)
    },
    cancel: function () {// 删除某个宏任务中的任务队列中最后一个
        let len = this.fns.length
        if (len > 0 && this.fns[len - 1].isDelay) {
            this.fns[len - 1].callbacks.pop()
        }
        return this
    }
}

new Person('Tom')
    .eat('apple')
    .sleep(3000)
    .play('basketball')
    .play('football')
    .cancel()
    .sleep(3000)
    .eat('banana')
/*输出
Tom
apple
(停顿3秒)
basketball
(这里没有football, 因为被下一个方法cancel取消了)
(停顿3秒)
banana
*/