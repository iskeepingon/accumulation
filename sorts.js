/**
 * 选择排序
 */
// let selectSort = function (arr) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     let min
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i] > arr[j]) {
//         min = arr[j]
//         arr[j] = arr[i]
//         arr[i] = min
//       }
//     }
//   }
// }
// let selectSortArr = [176, 178, 170, 171, 181, 168, 173, 175]
// selectSort(selectSortArr)
// console.log(selectSortArr)

/**
 * 冒泡排序
 */
let bubbleSort = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    let max
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        max = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = max
      }
    }
  }
}
// let bubbleSortArr = [1, 2, -1, -9, 8, -80]
// bubbleSort(bubbleSortArr)
// console.log(bubbleSortArr)

/**
 * 快速排序
 */
let quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr
  }
  let pivotIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}
// let quickSortArr = [1, 2, 9, 0, 3, 6]
// let quickSortArr1 = quickSort(quickSortArr)
// console.log(quickSortArr1)

/**
 * 插入排序
 */
let insertSort = function (arr) {
  if (arr == null || arr.length < 2) {
    return
  }
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
      let temp = arr[j]
      arr[j] = arr[j + 1]
      arr[j + 1] = temp
    }
  }
}
let insertSortArr = [1, 2, 9, 0, 3, 6]
insertSort(insertSortArr)
console.log(insertSortArr)

/**
 * 合并两个已经排好序的数组
 * 归并排序
 */
let mergeSort = function (arr1, arr2) {
  let result = []
  while (arr1.length && arr2.length) {
    if (arr1[0] > arr2[0]) {
      result.push(arr2.shift())
    } else {
      result.push(arr1.shift())
    }
  }
  return result.concat(arr1, arr2)
}

// let mergeSortData1 = [1, 2, 3, 4, 5, 9]
// let mergeSortData2 = [5, 6, 7, 9, 10]
// let mergeData3 = mergeSort(mergeSortData1, mergeSortData2)
// console.log(mergeData3)

/**
 * @function 大数据量排序 先分组排序,然后再依次去取元素,重新生成新的排好序的数组
 * @param arr
 */
let bigDataSort = function (arr, gap) {
  //取最小数
  let getMin = function (arrs) {
    let min
    let index
    let temp
    let temp1
    for (let i = 0; i < arrs.length; i++) {
      if (i === 0) {
        min = arrs[0][0]
        index = 0
      } else {
        temp = arrs[i][0]
        if (temp < min) {
          min = temp
          index = i
        }
      }
    }
    temp1 = arrs[index]
    temp1.shift()
    if (temp1.length === 0) {
      arrs.splice(index, 1)
    }
    return min
  }
  //分组并且对每一组都进行快速排序
  let groupSort = function (arr, gap) {
    let len = gap || 100
    let arrs = []
    let arrsLen = Math.ceil(arr.length / len)
    for (let i = 0; i < arrsLen; i++) {
      if (i === arrsLen - 1) {
        arrs.push(quickSort(arr.slice(i * len, arrsLen * len)))
      } else {
        arrs.push(quickSort(arr.slice(i * len, (i + 1) * len)))
      }
    }
    return arrs
  }
  let result = []
  let arrs = groupSort(arr, gap)
  while (arrs.length > 0) {
    let min = getMin(arrs)
    result.push(min)
  }
  return result
}

//创建大数据
let createBigData = function (len) {
  let bigData = []
  for (let i = 0; i < len; i++) {
    bigData.push(Math.floor(Math.random() * len))
  }
  return bigData
}

//获取当前时间 单位是ms
let getCurrentTime = function () {
  return (new Date()).getTime()
}
// let start = getCurrentTime()
// let bigDataSortData = bigDataSort(createBigData(10000000), 50000)//对一千万个数字排序
// end = getCurrentTime()
// console.log('end-start=', (end - start) / 1000, 's')

