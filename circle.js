var circle = function (x, y, r) {
  this.x = x || 0//圆心的坐标x
  this.y = y || 0//圆心的坐标y
  this.r = r || 100//圆心的半径
}

circle.prototype = {
  /**
   * @param distance 跑了多少距离
   * @returns {{x: *, y: *}} 坐标
   */
  getCoordinate: function (distance) {
    var r = this.r
    var PI = Math.PI
    var l = 2 * PI * r
    var distanceO
    var x, y
    if (distance / l > 1) {
      distanceO = distance
    } else {
      distanceO = this.getRest(distance, l)
    }
    var hudu = distanceO / r
    x = r * Math.cos(hudu)
    y = r * Math.sin(hudu)
    return {
      x: x + this.x,
      y: y + this.y
    }
  },
  /**
   * @function 求余
   * @param num1
   * @param num2
   * @returns {rest}
   */
  getRest: function (num1, num2) {
    var num11 = num1
    var num22 = num2
    var rest
    if (num11 / num22 < 1) {
      rest = num11
    } else {
      while (true) {
        if (num11 / num22 < 1) {
          rest = num11
          break
        } else {
          num11 = num11 - num22
        }
      }
    }
    return rest
  }
}

var r = 100
var c = new circle(100, -100)//创建一个圆形跑道 半径是100 圆心坐标是(100,-100)
var coordinate = c.getCoordinate(3 / 4 * 2 * Math.PI * r) //某人跑了3/4的圆形跑道,计算某人此时所在的位置的坐标
console.log(coordinate)
