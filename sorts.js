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
var quickSortArr = [1, 2, 9, 0, 3, 6]
var quickSortArr1 = quickSort(quickSortArr)
console.log(quickSortArr1)

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
var insertSortArr = [1, 2, 9, 0, 3, 6]
var insertSortArr1 = insertSort(insertSortArr)
console.log(insertSortArr1)
