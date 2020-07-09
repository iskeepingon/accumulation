//方法一
function unique(arr) {
  return [...new Set(arr)]
}
//方法二
function unique(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) != i) {
      arr.splice(i, 1)
      i--
    }
  }
  return arr
}
//方法三
function unique(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    if (arr.indexOf(arr[i]) != i) {
      arr.splice(i, 1)
    }
  }
  return arr
}
//方法四
function unique(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) == index
  })
}


let arr = [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1]
console.log(unique(arr))

let j = 0, i = 0
let res = []
let a = [1, 1, 1, 1]
while (i > -1) {
  i = a.indexOf(1, j++)
  i>-1&&res.push(i)
}
console.log(res)