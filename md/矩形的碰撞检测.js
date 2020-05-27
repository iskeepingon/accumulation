/**
 * @function 检查两个矩形是否碰撞
 * @param {Object} a 矩形a
 * @param {Object} b 矩形b
 * @returns {Boolean} flag true 表示碰撞了 false 表示没有碰撞
 */
function isCollision(a, b) {
    let flag = !(b.x > a.x + a.width ||
        b.y > a.y + b.height ||
        b.y < a.y - a.height ||
        b.x < a.x - b.width)
    return flag
}