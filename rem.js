let setRem = function () {
  let doc = window.document
  let docEl = doc.documentElement
  let w = docEl.getBoundingClientRect().width
  let v = (w / 7.5).toFixed(1)
  let fontSize = 'font-size:' + v + 'px'
  docEl.setAttribute('style', fontSize)
}

export default setRem

/*setRem()
window.addEventListener('resize', setRem, false)*/
