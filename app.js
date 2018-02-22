var IScroll = require('./src/iScroll.js')
var App = require('./src/App.vue')
var util = require('./src/util.js')
var util = require('./src/util.js')

var MyPlugin = {}

MyPlugin.install = function (Vue, options) {
  Vue.directive('i-scroll', {
    bind (el, binding, vnode, oldVnode) {
      console.log('bind')
      let options = { preventDefault: false }
      if (binding.value) {
        options = Object.assign({}, options, binding.value)
      }
      el.iscroll = new IScroll(el, options)
      el.iscroll.scrollEnd = function () {
        const height = this.wrapperHeight - this.scrollerHeight
        this.scrollTo(0, height, 300)
      }
      el.iScrollRefresh = function () {
        console.log('iScrollRefresh')
        util.setWindowScrollTop()
        el.iscroll && el.iscroll.refresh()
      }
      el.addEventListener('touchstart', el.iScrollRefresh, false)
      util.setWindowScrollTop()
    },
    unbind: function (el, binding, vnode) {
      util.unsetWindowScrollTop()
      el.removeEventListener('touchstart', el.iScrollRefresh, false)
    }
  })

  // 3. 注入组件
  Vue.mixin(App)
}

module.exports = MyPlugin
