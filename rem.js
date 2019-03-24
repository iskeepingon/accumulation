(function () {
  var doc = window.document
  var docEl = doc.documentElement
  var setRem = function () {
    var w = docEl.getBoundingClientRect().width
    var v = (w / 7.5).toFixed(1)
    var fontSize = 'font-size:' + v + 'px'
    docEl.setAttribute('style', fontSize)
  }
  setRem()
  window.addEventListener('resize', setRem, false)
})()
