var barcode = require('./barcode')
var qrcode = require('./qrcode')

function convert_length(length) {
  return Math.round(wx.getSystemInfoSync().windowWidth * length / 750)
}

function barc(id, code, width, height, callback) {
  barcode.code128(wx.createCanvasContext(id), code, convert_length(width), convert_length(height), callback)
}

function qrc(id, code, width, height, callback) {
  qrcode.api.draw(code, {
    ctx: wx.createCanvasContext(id),
    width: convert_length(width),
    height: convert_length(height),
    callback
  })
}

module.exports = {
  barcode: barc,
  qrcode: qrc
}
