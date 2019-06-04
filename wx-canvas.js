function drawCanvas(canvasId, callback) {
  // canvas 生成分享出去的带小程序码的图片
  let info = wx.getSystemInfoSync()
  let rate = 750 / info.windowWidth
  const ctx = wx.createCanvasContext(canvasId)
  ctx.drawImage(
    '../../image/we.png',
    0,
    0,
    780,
    780,
    0, 0,
    520 / rate,
    520 / rate
  )
  ctx.setFillStyle('rgba(256,256,256,1)')
  ctx.fillRect(
    0,
    520 / rate,
    520 / rate,
    872 / rate
  )
  ctx.setTextAlign('center')
  ctx.setFillStyle('rgba(51,51,51,1)')
  ctx.setFontSize(30 / rate)
  ctx.fillText(
    '贺林 邀请您一起来赚钱啦！',
    520 / rate / 2,
    520 / rate + 50 / rate
  )
  ctx.drawImage(
    '../../image/icon_logo.png',
    0,
    0,
    188,
    188,
    (520 / rate - 188 / rate) / 2,
    520 / rate + 50 / rate + 20 / rate,
    188 / rate,
    188 / rate
  )
  ctx.setFontSize(24 / rate)
  ctx.fillText(
    '长按扫码查看详情',
    520 / rate / 2,
    520 / rate + 50 / rate + 188 / rate + 70 / rate
  )
  ctx.draw(true, () => {
    if (typeof callback === 'function') {
      callback()
    }
  })
}

function createTempFilePath(canvasId) {
  //生成图片的临时路径
  return new Promise((resolve, reject) => {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: canvasId,
      success: (res) => {
        resolve(res.tempFilePath)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

let canvasId = 'canvas'
drawCanvas(canvasId, () => {
  createTempFilePath(canvasId).then(imgUrl => {
    console.log(imgUrl)
  }).catch(err => {
    console.log(err)
  })
})


