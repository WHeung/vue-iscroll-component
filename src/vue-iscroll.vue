<template>
  <div v-if="disabled" :class="$style.main">
    <slot></slot>
  </div>
  <div v-else :class="$style.main" @touchmove.prevent ref="main">
    <div :class="$style.scrollWrap" :style="containerStyle" v-i-scroll="options" ref="scrollWrap">
      <div :class="$style.scrollContent" :style="contentStyle">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import scrollDirective from './iScroll'

export default {
  name: 'vueIcroll',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    containerStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    contentStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    topBounceH: [String, Number],
    bottomBounceH: [String, Number],
  },
  directives: {
    'i-scroll': scrollDirective
  },
  mounted () {
    this.$nextTick(function () { // nextTick在全局VUE DOM結點更新是會調用
      const scrollWrap = this.$refs.scrollWrap
      const self = this
      if (scrollWrap) {
        let containerHeight
        if (!this.containerStyle.height) {
          containerHeight = window.innerHeight - getOffsetTop(this.$refs.main) + 'px'
        }
        const IScroll = scrollWrap.iscroll
        IScroll.on('scroll', function () {
          self.$emit('handleScroll', this)
        })
        IScroll.on('bottomBounce', function (exceedHeight) { // 需要在 下拉超过底部并松手一瞬间监控刷新，scrollEnd则是滑动结束后再执行, 因此不使用scrollEnd
          if (IScroll.isInTransition) { // 入触发bottomBounce是非手动touch操作，而是惯性transition导致，则不处理
            return
          }
          if (self.bottomBounceH) {
            exceedHeight > self.bottomBounceH && self.$emit('handleBottomBounce', this)
          } else {
            self.$emit('handleBottomBounce', this)
          }
        })
        IScroll.on('topBounce', function (exceedHeight) { // 需要在 下拉超过底部并松手一瞬间监控刷新，scrollEnd则是滑动结束后再执行, 因此不使用scrollEnd
          if (IScroll.isInTransition) { // 入触发topBounce是非手动touch操作，而是惯性transition导致，则不处理
            return
          }
          if (self.topBounceH) {
            exceedHeight > self.topBounceH && self.$emit('handleTopBounce', this)
          } else {
            self.$emit('handleTopBounce', this)
          }
        })
        IScroll.refresh() // 更新高度后需要重新计算
        this.$emit('input', IScroll)
      }
    })
  },
  methods: {
  }
}
function getOffsetTop (el) {
  if (typeof el === 'object') {
    var y = el.offsetTop
    while (el.offsetParent) {
      el = el.offsetParent
      y += el.offsetTop
    }
    return y
  } else {
    return 0
  }
}

</script>

<style module>
.main {
  position: relative;
}
.scrollWrap {
  overflow: hidden;
}

.scrollContent {
  position: relative;
  min-height: 100%;
}

</style>
