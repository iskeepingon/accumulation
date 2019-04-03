/**
 * 选择排序
 */
var selectSort = function (arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    var min
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        min = arr[j]
        arr[j] = arr[i]
        arr[i] = min
      }
    }
  }
}
// var selectSortArr = [1, 2, -1, -9, 8, -80]
// selectSort(selectSortArr)
// console.log(selectSortArr)

/**
 * 冒泡排序
 */
var bubbleSort = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var max
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        max = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = max
      }
    }
  }
}
// var bubbleSortArr = [1, 2, -1, -9, 8, -80]
// bubbleSort(bubbleSortArr)
// console.log(bubbleSortArr)

/**
 * 快速排序
 */
var quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr
  }
  var pivotIndex = Math.floor(arr.length / 2)
  var pivot = arr.splice(pivotIndex, 1)[0]
  var left = []
  var right = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}
// var quickSortArr = [1, 2, 9, 0, 3, 6]
// var quickSortArr1 = quickSort(quickSortArr)
// console.log(quickSortArr1)

/**
 * 插入排序
 */
var insertSort = function (arr) {
  var arrTemp = [arr[0]]
  for (var i = 1; i < arr.length; i++) {
    for (var j = 0; j < i; j++) {
      if (arr[i] < arrTemp[j]) {
        arrTemp.splice(j, 0, arr[i])
        break
      } else if (j === i - 1) {
        arrTemp.push(arr[i])
      }
    }
  }
  return arrTemp
}
// var insertSortArr = [1, 2, 9, 0, 3, 6]
// var insertSortArr1 = insertSort(insertSortArr)
// console.log(insertSortArr1)

/**
 * 合并两个已经排好序的数组
 * 归并排序
 */
var mergeSort = function (arr1, arr2) {
  var result = []
  while (arr1.length && arr2.length) {
    if (arr1[0] > arr2[0]) {
      result.push(arr2.shift())
    } else {
      result.push(arr1.shift())
    }
  }
  return result.concat(arr1, arr2)
}

// var mergeSortData1 = [1, 2, 3, 4, 5, 9]
// var mergeSortData2 = [5, 6, 7, 9, 10]
// var mergeData3 = mergeSort(mergeSortData1, mergeSortData2)
// console.log(mergeData3)

/**
 * @function 大数据量排序 先分组排序,然后再依次去取元素,重新生成新的排好序的数组
 * @param arr
 */
var bigDataSort = function (arr, gap) {
  //取最小数
  var getMin = function (arrs) {
    var min
    var index
    var temp
    var temp1
    for (var i = 0; i < arrs.length; i++) {
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
  var groupSort = function (arr, gap) {
    var len = gap || 100
    var arrs = []
    var arrsLen = Math.ceil(arr.length / len)
    for (var i = 0; i < arrsLen; i++) {
      if (i === arrsLen - 1) {
        arrs.push(quickSort(arr.slice(i * len, arrsLen * len)))
      } else {
        arrs.push(quickSort(arr.slice(i * len, (i + 1) * len)))
      }
    }
    return arrs
  }
  var result = []
  var arrs = groupSort(arr, gap)
  while (arrs.length > 0) {
    var min = getMin(arrs)
    result.push(min)
  }
  return result
}

//创建大数据
var createBigData = function (len) {
  var bigData = []
  for (var i = 0; i < len; i++) {
    bigData.push(Math.floor(Math.random() * len))
  }
  return bigData
}

//获取当前时间 单位是ms
var getCurrentTime = function () {
  return (new Date()).getTime()
}
var start = getCurrentTime()
var bigDataSortData = bigDataSort(createBigData(10000000), 50000)//对一千万个数字排序
end = getCurrentTime()
console.log('end-start=', (end - start) / 1000, 's')
