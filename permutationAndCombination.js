//排列组合


const oneArr = function (arr) {
  //一个规格维度时创建规格组合
  let res = []
  arr.forEach((item) => {
    item.forEach((item1) => {
      res.push([item1])
    })
  })
  return res
}

const mergeArr = function (arr, arr1) {
  //两种规格维度时创建规格组合
  let resultArr = []
  for (let i = 0; i < arr.length; i++) {
    if (arr1.length == 0) {
      return this.oneArr([arr])
    } else {
      for (let j = 0; j < arr1.length; j++) {
        resultArr.push([arr[i], arr1[j]])
      }
    }
  }
  return resultArr
}

const flat = function (arr) {
  //将数组[1,2,[3,4]]转成[1,2,3,4]
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      for (let j = 0; j < arr[i].length; j++) {
        res.push(arr[i][j])
      }
    } else {
      res.push(arr[i])
    }
  }
  return res
}

const permutationAndCombination = function (arr) {
  //规格维度创建规格组合
  if (arr.length == 1) {
    return oneArr(arr)
  } else if ((arr.length == 2)) {
    return mergeArr(arr[0], arr[1])
  } else if (arr.length > 2) {
    let res
    let i = 0
    let tempArr = arr[i]
    while (i < arr.length - 1) {
      tempArr = mergeArr(tempArr, arr[i + 1])
      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i] = flat(tempArr[i])//如果支持数组支持flat的话 tempArr[i] = tempArr[i].flat()
      }
      i++
    }
    return tempArr
  }
}
//输入
let arr1 = [
  [{id: '1', specValue: '白色'}, {id: '1', specValue: '黑色'}]
]

let arr2 = [
  [{id: '1', specValue: '白色'}, {id: '1', specValue: '黑色'}],
  [{id: '2', specValue: 'M'}, {id: '2', specValue: 'L'}]
]

let arr3 = [
  [{id: '1', specValue: '白色'}, {id: '1', specValue: '黑色'}],
  [{id: '2', specValue: 'M'}, {id: '2', specValue: 'L'}],
  [{id: '3', specValue: '大'}, {id: '3', specValue: '小'}],
  [{id: '4', specValue: '100cc'}, {id: '4', specValue: '200cc'}]
]

let res1 = permutationAndCombination(arr1)
let res2 = permutationAndCombination(arr2)
let res3 = permutationAndCombination(arr3)
//输出
console.log(res1)
console.log(res2)
console.log(res3)


