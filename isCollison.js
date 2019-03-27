/**
 * 判断两个矩形是否相交(只要有一个点重叠,都算是相交)
 * 矩形表示 {x:x轴的坐标,y:y轴的坐标,w:矩形的宽度,h:矩形的高度}
 * @param a,b 都表示矩形
 * @return true表示相交,false表示不相交
 */
var isCollison = function (a, b) {
  if (a.x > b.x + b.w || b.x > a.x + a.w || a.y > b.y + b.h || b.y > a.y + a.h) {
    return false
  } else {
    return true
  }
}


var flag = isCollison({x: 0, y: 0, w: 2, h: 2}, {x: 3, y: 2, w: 2, h: 2})
var flag1 = isCollison({x: 0, y: 0, w: 2, h: 2}, {x: 1, y: 1, w: 2, h: 2})
console.log(flag)
console.log(flag1)
