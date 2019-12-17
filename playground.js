class Playground {
  /**
   * @param w 操场的宽度
   * @param h 操场的长度
   * @param d 真实距离 比如跑道一圈400
   * @param a,b 圆心
   */
  constructor(w, h, d, a, b) {
    this.w = w
    this.h = h
    this.d = d
    this.x = a || 0
    this.y = b || 0
  }

  /**
   * @function 求余
   * @param num1
   * @param num2
   * @returns {rest}
   */

  getRest(num1, num2) {
    let num11 = num1
    let num22 = num2
    let rest
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

  /**
   * @param distance 跑了多少距离
   * @return {x:x,y:y}根据距离返回跑道上某一点的坐标
   */
  getCoordinate(distance) {
    let x, y
    let w = this.w
    let h = this.h
    let d = this.d
    let PI = Math.PI
    let r = w / 2
    let a = 2 * h + 2 * PI * r//操场距离
    let unit = d / a
    let c = distance / unit
    let l//一圈半,两圈半,坐标点在同一个位置

    l = this.getRest(c, a)

    if (l >= 0 && l <= h / 2) {
      x = r
      y = l
    } else if (l > h / 2 && l < (h / 2 + PI * r)) {
      let hudu = (l - h / 2) / r
      x = r * Math.cos(hudu)
      y = h / 2 + r * Math.sin(hudu)
    } else if (l >= (h / 2 + PI * r) && l <= (h + PI * r)) {
      x = -r
      y = l - (h / 2 + PI * r)
    } else if (l > (h + PI * r) && l <= (3 * h / 2 + PI * r)) {
      x = -r
      y = -(l - (h + PI * r))
    } else if (l > (3 * h / 2 + PI * r) && l < 2 * h + 2 * PI * r) {
      let hudu = (l - 3 * h / 2 - PI * r) / r
      x = -r * Math.cos(hudu)
      y = -h / 2 - r * Math.sin(hudu)
    } else {
      x = r
      y = l - (2 * h + 2 * PI * r)
    }
    return {
      x: x + this.x,
      y: y + this.y
    }
  }
}

let w = 750
let h = 300
let r = w / 2
let p = new Playground(w, h, 2 * Math.PI * r + 600)
let coordinate = p.getCoordinate(h / 2 + 2 * Math.PI * r / 4)
console.log(coordinate)
/*export {
 Playground
 }*/
