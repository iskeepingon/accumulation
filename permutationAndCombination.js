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
 * @function 将input数组中的元素剔除（该元素的children为空数组）
 * @param input {Array}
 * @returns {Array}
 */
const createNewInput = (input) => {
  let newInput = []
  input.forEach((item) => {
    if (item.children.length <= 0) {

    } else {
      newInput.push(item)
    }
  })
  return newInput
}

/**
 * @param input {Array}
 * @returns {Array}
 */

const zh = (input) => {
  let newInput = createNewInput(input)
  if (newInput.length == 0) {
    return []
  } else {
    let output = []
    recursion(newInput, output, 0, [])
    /*if (0 <= newInput.length - 1) {
      for (let i = 0; i < newInput[0].children.length; i++) {
        if (newInput.length - 1 == 0) {
          let temp = {}
          temp[newInput[0].id] = newInput[0].children[i]
          output.push(temp)
        } else {
          if (1 <= newInput.length - 1) {
            for (let j = 0; j < newInput[1].children.length; j++) {
              if (newInput.length - 1 == 1) {
                let temp = {}
                temp[newInput[0].id] = newInput[0].children[i]
                temp[newInput[1].id] = newInput[1].children[j]
                output.push(temp)
              } else {
                if (2 <= newInput.length - 1) {
                  for (let k = 0; k < newInput[2].children.length; k++) {
                    if (newInput.length - 1 == 2) {
                      let temp = {}
                      temp[newInput[0].id] = newInput[0].children[i]
                      temp[newInput[1].id] = newInput[1].children[j]
                      temp[newInput[2].id] = newInput[2].children[k]
                      output.push(temp)
                    }
                  }
                } else {

                }
              }
            }
          }
        }
      }
    }*/
    return output
  }
}



let input = [
  {id: '1', name: '颜色', children: [{tid: '', name: '黑'}, {tid: '', name: '棕'}]},
  {id: '2', name: '材质', children: [{tid: '', name: '牛皮'}]},
  {id: '3', name: '尺码', children: [{tid: '', name: '40'}, {tid: '', name: '41'}, {tid: '', name: '42'}]}
]

console.warn(zh(input))

let output = [
  {'1': {tid: '', name: '黑'}, '2': {tid: '', name: '牛皮'}, '3': {tid: '', name: '40'}},
  {'1': {tid: '', name: '黑'}, '2': {tid: '', name: '牛皮'}, '3': {tid: '', name: '41'}},
  {'1': {tid: '', name: '黑'}, '2': {tid: '', name: '牛皮'}, '3': {tid: '', name: '42'}},
  {'1': {tid: '', name: '棕'}, '2': {tid: '', name: '牛皮'}, '3': {tid: '', name: '40'}},
  {'1': {tid: '', name: '棕'}, '2': {tid: '', name: '牛皮'}, '3': {tid: '', name: '41'}},
  {'1': {tid: '', name: '棕'}, '2': {tid: '', name: '牛皮'}, '3': {tid: '', name: '42'}}
]
