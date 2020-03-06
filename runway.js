class Runway {
  /**
   * @param w 虚拟跑道的宽度
   * @param h 虚拟跑道的长度
   * @param gap 虚拟跑道之间的距离
   * @param ox,oy 虚拟跑道中心坐标
   * @param d 最里面的跑道的真实距离
   * 注意：
   * 1，w, h, gap, n, x, y都是虚拟数值，d是真实数值 不明白问我
   * 2，运动员是逆时针跑动
   */
  constructor(w, h, gap, ox, oy, d) {
    this.w = w
    this.h = h
    this.gap = gap
    this.ox = ox
    this.oy = oy
    this.d = d
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
   * @function 获取运动员的在页面上的位置坐标
   * @param distance 跑了多少距离
   * @param which 在哪一个跑道 从里到外依次是 1 2 3 4 ...
   * @return {x:x,y:y} 跑道上某一点的坐标
   */
  getCoordinate(distance, which = 1) {
    let x, y

    let w = this.w
    let h = this.h
    let d = this.d
    let gap = this.gap

    let PI = Math.PI
    let r = w / 2
    let r0 = r + (which - 1) * gap//半径
    let a = 2 * h + 2 * PI * r0 //虚拟跑道的距离
    let unit = d / a //实际跑道的距离除以虚拟跑道的距离
    let c = distance / unit //运动员实际运动的距离distance转成虚拟跑道上的距离
    let l = this.getRest(c, a) //一圈半,两圈半,坐标点在同一个位置

    if (l >= 0 && l <= h / 2) {
      x = r0
      y = h / 2 - l
    } else if (l > h / 2 && l < h) {
      x = r0
      y = l - h / 2
    } else if (l >= h && l < h + PI * r0) {
      let hudu = (l - h) / r0
      x = r0 * Math.cos(hudu)
      y = h / 2 + r0 * Math.sin(hudu)
    } else if (l >= h + PI * r0 && l <= 3 * h / 2 + PI * r0) {
      x = -r0
      y = h / 2 - (l - h - PI * r0)
    } else if (l > 3 * h / 2 + PI * r0 && l <= 2 * h + PI * r0) {
      x = -r0
      y = -(l - 3 * h / 2 - PI * r0)
    } else {
      let hudu = (PI + (l - 2 * h - PI * r0)) / r0
      x = r0 * Math.cos(hudu)
      y = -h / 2 + r0 * Math.sin(hudu)
    }

    return {
      x: x + this.ox,
      y: y + this.oy
    }
  }
}

export default Runway

let w = 600
let h = 1200
let r = w / 2
let p = new Runway(w, h, 30, 375, 800, 2 * Math.PI * r + 2 * h)
let coordinate = p.getCoordinate(h / 2, 1)
console.log(coordinate)//{x:675,y:800}
