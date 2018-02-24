<template>
  <div :class="$style.main">
    <IScroll v-model="IScroll"
    :options="options"
    :containerStyle="containerStyle"
    :topBounceH="topBounceH"
    :bottomBounceH="bottomBounceH"
    @handleScroll="handleScroll"
    @handleTopBounce="handleTopBounce"
    @handleBottomBounce="handleBottomBounce">
      <div :class="$style.topOver">
        <i></i><span>{{topTips}}</span>
      </div>
      <ul :class="$style.list">
        <li v-for="item in 30" :key="item">{{item}}</li>
      </ul>
      <div :class="$style.bottomOver">
        <i></i><span>{{bottomTips}}</span>
      </div>
    </IScroll>
  </div>
</template>

<script>
import IScroll from 'vue-iscroll-component'//'./dist/vue-iscroll.vue'//
const OVERHEIGHT = 50

export default {
  name: 'example',
  components: { IScroll },
  data () {
    return {
      IScroll: {},
      topTips: '',
      bottomTips: '',
      containerStyle: {
        height: '400px'
      },
      topBounceH: OVERHEIGHT,
      bottomBounceH: OVERHEIGHT,
      options: {}
    }
  },
  methods: {
    handleScroll (iScroll) {
      let tips = ''
      if (iScroll.y > 0) { // 下拉过顶
        tips = '松开不触发handleTopBounce'
        if (iScroll.y > this.topBounceH) {
          tips = '松开触发handleTopBounce'
        }
        this.topTips = tips
      }
      console.log(iScroll.maxScrollY - iScroll.y)
      if (iScroll.maxScrollY - iScroll.y > 0) { // 上拉过底
        tips = '松开不触发handleBottomBounce'
        if (iScroll.maxScrollY - iScroll.y > this.bottomBounceH) {
          tips = '松开触发handleBottomBounce'
        }
        this.bottomTips = tips
      }
    },
    handleTopBounce (iScroll) {
      console.log('假装下拉刷新')
    },
    handleBottomBounce (iScroll) {
      console.log('假装上拉加载更多')
    }
  }
}
</script>

<style module>
body {
  margin: 0;
  padding: 0;
}
.list {
  margin: 0;
  padding: 0;
  padding-top: 20px;
}
.list li {
  list-style: none;
  margin: 0 20px 20px;
  text-align: center;
  background: #eee;
}

.topOver {
  position: absolute;
  top: -40px;
  height: 40px;
  width: 100%;
  line-height: 41px;
  text-align: center;
}
.bottomOver {
  position: absolute;
  bottom: -40px;
  height: 40px;
  width: 100%;
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
