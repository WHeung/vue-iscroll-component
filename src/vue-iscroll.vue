<template>
  <div v-if="disabled" :class="$style.main">
    <slot></slot>
  </div>
  <div v-else :class="$style.main" @touchmove.prevent ref="main">
    <div :class="$style.scrollWrap" :style="scrollWrapStyle" v-i-scroll="options" ref="scrollWrap">
      <div :class="$style.scrollContent" :style="contentStyle">
        <div v-if="downRefreshabled" :class="[$style.downFresh, downFreshTip.class]">
          <i></i><span>{{downFreshTip.text}}</span>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import scrollDirective from './iScroll'
const DOWN_REFRESH_EXCCED_HEIGHT = 70

export default {
  name: 'vueIcroll',
  props: ['contentStyle', 'options', 'disabled', 'downRefreshabled', 'scrollWrapStyle'],
  directives: {
    'i-scroll': scrollDirective
  },
  data () {
    return {
      downFreshStatus: 'waitFresh'
    }
  },
  computed: {
    downFreshTip () {
      switch (this.downFreshStatus) {
      case 'readyFresh':
        return {
          class: this.$style.readyFresh,
          text: '松开立即刷新',
          canFresh: true
        }
      case 'waitFresh':
      default:
        return {
          class: this.$style.waitFresh,
          text: '下拉可以刷新',
          canFresh: true
        }
      }
    }
  },
  mounted () {
    /* 因爲在組件掛載時，頂部導航欄還沒掛載上DOM，因此會出現元素offsetTop爲0，需要在DOM刷新時再調用得出頁面高度
    */
    this.$nextTick(function () { // nextTick在全局VUE DOM結點更新是會調用
      const scrollWrap = this.$refs.scrollWrap
      const self = this
      if (scrollWrap) {
        scrollWrap.style.height = window.innerHeight - getOffsetTop(this.$refs.main) + 'px'
        console.log(getOffsetTop(this.$refs.main))
        const IScroll = scrollWrap.iscroll
        IScroll.on('scroll', function () {
          self.$emit('handleScroll', this)
          if (this.y > 0) {
            self.downFresh(this.y)
          }
        })
        IScroll.on('bottomBounce', function () { // 需要在 下拉超过底部并松手一瞬间监控刷新，scrollEnd则是滑动结束后再执行, 因此不使用scrollEnd
          self.$emit('handleBottomBounce', this)
        })
        IScroll.on('topBounce', function (exceedHeight) { // 需要在 下拉超过底部并松手一瞬间监控刷新，scrollEnd则是滑动结束后再执行, 因此不使用scrollEnd
          if (self.downRefreshabled && exceedHeight > DOWN_REFRESH_EXCCED_HEIGHT) {
            window.location.reload()
          }
        })
        IScroll.refresh() // 更新高度后需要重新计算
        this.$emit('input', IScroll)
      }
    })
  },
  methods: {
    downFresh (distance) {
      if (distance > DOWN_REFRESH_EXCCED_HEIGHT) {
        this.downFreshStatus = 'readyFresh'
      } else {
        this.downFreshStatus = 'waitFresh'
      }
    }
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

.downFresh {
  position: absolute;
  top: -40px;
  height: 40px;
  line-height: 41px;
  text-align: center;
}

.waitFresh,.readyFresh {
  width: 100%;
  position: absolute;
  bottom: -40px;
}

.readyFresh i {
  transform: rotate(90deg);
}

</style>
