/**
 * hash路由
 *
 */

function Router() {
  this.routemap = []
  this.defaultFunc = function () {
  }
}

Router.prototype.setup = function (routemap, defaultFunc) {
  let rule
  this.defaultFunc = defaultFunc
  for (rule in routemap) {
    if (!routemap.hasOwnProperty(rule)) {
      continue
    }
    this.routemap.push({
      rule: new RegExp(rule, 'i'),
      func: routemap[rule]
    })
  }
}

Router.prototype.start = function () {
  let that = this

  function hashChange() {
    let hash = window.location.hash, route, matchResult
    for (let routeIndex in that.routemap) {
      route = that.routemap[routeIndex]
      matchResult = hash.match(route.rule)
      if (matchResult) {
        route.func.apply(window, matchResult.slice(1))
        return
      }
    }
    that.defaultFunc()
  }

  hashChange()
  window.addEventListener('hashchange', hashChange)
}

let router = new Router()
router.setup({
  '#/helin/(.*)/(.*)': function (cate, id) {
    console.log('list', cate, id)
  },
  '#/helinjs/(.*)': function (id) {
    console.log('show', id)
  }
}, function () {
  console.log('default router')
})
router.start()
