/**
 * @function 递归
 * @param newInput{Array}
 * @param output{Array}
 * @param count{Number}
 * @param arr{Array}
 */
const recursion = (newInput, output, count, arr) => {
    if (count <= newInput.length - 1) {
        for (let j = 0; j < newInput[count].children.length; j++) {
            arr[count] = j
            if (newInput.length - 1 == count) {
                let temp = {}
                let k = 0
                while (k <= newInput.length - 1) {
                    temp[newInput[k].id] = newInput[k].children[arr[k]]
                    k++
                }
                output.push(temp)
            } else {
                recursion(newInput, output, count + 1, arr)
            }
        }
    }
}
/**
 * @function 多规格商品创建
 * @param input {Array}
 * @returns output {Array}
 */
const createSkus = (input) => {
    let output = []
    let newInput = input.filter(item => item.children.length > 0)
    if (newInput.length == 0) {
        return output
    }
    recursion(newInput, output, 0, [])
    return output
}

let input = [
    { id: '1', name: '颜色', children: [{ tid: '', name: '黑' }, { tid: '', name: '棕' }] },
    { id: '2', name: '材质', children: [{ tid: '', name: '牛皮' }] },
    { id: '3', name: '尺码', children: [{ tid: '', name: '40' }, { tid: '', name: '41' }, { tid: '', name: '42' }] }
]
let output = [
    { '1': { tid: '', name: '黑' }, '2': { tid: '', name: '牛皮' }, '3': { tid: '', name: '40' } },
    { '1': { tid: '', name: '黑' }, '2': { tid: '', name: '牛皮' }, '3': { tid: '', name: '41' } },
    { '1': { tid: '', name: '黑' }, '2': { tid: '', name: '牛皮' }, '3': { tid: '', name: '42' } },
    { '1': { tid: '', name: '棕' }, '2': { tid: '', name: '牛皮' }, '3': { tid: '', name: '40' } },
    { '1': { tid: '', name: '棕' }, '2': { tid: '', name: '牛皮' }, '3': { tid: '', name: '41' } },
    { '1': { tid: '', name: '棕' }, '2': { tid: '', name: '牛皮' }, '3': { tid: '', name: '42' } }
]