class Playground {
  /**
   * @param w 操场的宽度
   * @param h 操场的长度
   * @param d
   * 该对象待完善
   */
  constructor(w, h, d) {
    this.w = w
    this.h = h
    this.d = d
  }

  /**
   * @param distance
   * @returns {{x: *, y: *}}
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
    let c = Math.floor(distance / unit / a)
    let l

    if (c > 0) {
      l = distance / unit - c * a
    } else {
      l = distance / unit
    }

    if (l >= 0 && l <= h / 2) {
      x = r
      y = l
    } else if (l > h / 2 && l < (h / 2 + PI * r)) {
      let degree = 360 * (l - h / 2) / (2 * PI * r)
      x = r * Math.cos(degree)
      y = h / 2 + r * Math.sin(degree)
    } else if (l >= (h / 2 + PI * r) && l <= ( h + PI * r)) {
      x = -r
      y = l - (h / 2 + PI * r)
    } else if (l > ( h + PI * r) && l <= (3 * h / 2 + PI * r)) {
      x = -r
      y = -(l - ( h + PI * r))
    } else if (l > (3 * h / 2 + PI * r) && l < 2 * h + 2 * PI * r) {
      let degree = 360 * (l - 3 * h / 2 - PI * r) / (2 * PI * r)
      x = -r * Math.cos(degree)
      y = -h / 2 - r * Math.sin(degree)
    } else {
      x = r
      y = l - (2 * h + 2 * PI * r)
    }

    return {
      x: x,
      y: y
    }
  }
}


let p = new Playground(750, 300, 750 * Math.PI + 600)
let json = p.getCoordinate((750 * Math.PI + 600) / 2)
console.log(json)
/*export {
 Playground
 }*/
