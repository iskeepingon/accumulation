class Playground {
  /**
   * @param w 操场的宽度
   * @param h 操场的长度
   * @param d 真实距离 比如跑道一圈400
   * @param a,b 圆心
   * @return {x:x,y:y}根据距离返回跑道上某一点的坐标
   */
  constructor(w, h, d, a, b) {
    this.w = w
    this.h = h
    this.d = d
    this.x = a || 0
    this.y = b || 0
  }

  /**
   * @param distance 跑了多少距离
   * @returns {{x: *, y: *}} 坐标
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
    let t = 2 * PI / 360
    let l//一圈半,两圈半,坐标点在同一个位置

    if (c > a) {
      l = c % a
    } else {
      l = c
    }

    if (l >= 0 && l <= h / 2) {
      x = r
      y = l
    } else if (l > h / 2 && l < (h / 2 + PI * r)) {
      let hudu = ((l - h / 2) / r) * t
      x = r * Math.cos(hudu)
      y = h / 2 + r * Math.sin(hudu)
    } else if (l >= (h / 2 + PI * r) && l <= ( h + PI * r)) {
      x = -r
      y = l - (h / 2 + PI * r)
    } else if (l > ( h + PI * r) && l <= (3 * h / 2 + PI * r)) {
      x = -r
      y = -(l - ( h + PI * r))
    } else if (l > (3 * h / 2 + PI * r) && l < 2 * h + 2 * PI * r) {
      let hudu = ((l - 3 * h / 2 - PI * r) / r ) * t
      x = -r * Math.cos(hudu)
      y = -h / 2 - r * Math.sin(hudu)
    } else {
      x = r
      y = l - (2 * h + 2 * PI * r)
    }

    return {
      x: x + a,
      y: y + b
    }
  }
}


let p = new Playground(750, 300, 750 * Math.PI + 600)
// let json = p.getCoordinate(750 * Math.PI / 4 + 150)
let json1 = p.getCoordinate(150 + (Math.PI / 4) * 375)
// console.log(json)
console.log(json1)
/*export {
 Playground
 }*/
