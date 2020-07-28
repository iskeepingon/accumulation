// 实现一个函数，可以对一系列版本号进行从小到大的排序
// 版本号列表 demo: ['1.0.0', '2.12.1', '1.2.3.4.5.6.7', '0.18.1', '1.10', '1.2']

function sortVersion(list) {
    // 实现代码
    let res = []
    let maxLen = 0
    if (!Array.isArray(list)) {
        return res
    }
    for (let i = 0; i < list.length; i++) {
        let item = list[i].split('.')
        res.push(item)
        if (item.length > maxLen) {
            maxLen = item.length
        }
    }
    let arr = []
    for (let i = 0; i < maxLen; i++) {
        arr.push(new Map())
    }
    for (let i = 0; i < res.length; i++) {
        let item = res[i]
        for (let j = 0; j < item.length; j++) {
            arr[j].set(item[j], 1)
        }
    }
    res.sort((a, b) => a[0] - b[0])
    for (let i = 1; i < arr.length; i++) {
        res.sort((a, b) => {
            if (a[i - 1] == b[i - 1]) {
                let ax = a[i], bx = b[i]
                if (typeof a[i] == 'undefined') {
                    ax = ''
                }
                if (typeof b[i] == 'undefined') {
                    bx = ''
                }
                return ax - bx
                // return a[i] - b[i]
            }
            return 0
        })
    }

    for (let i = 0; i < res.length; i++) {
        let item = res[i]
        res[i] = item.join('.')
    }

    return res
}

// let demo = ['1.0.0', '2.12.1', '1.2.3.4.5.6.7', '0.18.1', '1.10', '1.2.0', '1.2.3.3']
let demo = ['1.0.0', '2.12.1', '1.2.3.4.5.6.7', '0.18.1', '1.10', '1.2']
sortVersion(demo)