const getArr = (num) => {
    let json = {}
    let element = 1
    for (let y = 0; y < num; y++) {
        for (let x = 0; x < num; x++) {
            json[x + '-' + y] = element++
        }
    }

    let arr = []
    let flag = 0// 0表示x轴的正方向 1表示x的反方向 2表示y的正方向 3表示y的反方向
    let x = 0
    let y = 0
    let flags = [0, 2, 1, 3]
    let index = 0
    // 从坐标点开始
    while (arr.length < num * num) {
        if (flag === 0) {
            let key = (x++) + '-' + y
            arr.push(json[key])
            if (x === num) {
                x = num-1
                index++
                if (index == flags.length) {
                    index = 0
                }
                flag = flags[index]
            }
            continue
        }
        if (flag === 1) {
            let key = (x--) + '-' + y
            arr.push(json[key])
            if (x === 0) {
                index++
                if (index == flags.length) {
                    index = 0
                }
                flag = flags[index]
            }
            continue
        }
        if (flag === 2) {
            let key = x + '-' + (y++)
            arr.push(json[key])
            if (y === num - 1) {
                index++
                if (index == flags.length) {
                    index = 0
                }
                flag = flags[index]
            }
            continue
        }
        if (flag === 3) {
            let key = x + '-' + (y--)
            arr.push(json[key])
            if (y === 0) {
                index++
                if (index == flags.length) {
                    index = 0
                }
                flag = flags[index]
            }
            continue
        }
    }
    return arr
}

console.log(getArr(4))