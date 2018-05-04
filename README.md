# vue-iscroll-component

> A vue iScroll component

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Todo

- 移动端模拟浏览器滚动
- 解决网页原生滚动在不同设备上的卡顿（ios)，使滚动更流畅
- 解决页面出现多个滚动块互相冲突，覆层的滚动影响底部滚动等问题
- 禁止原生滚动，防止漏出浏览器背景板

## Install
``` bash
npm install vue-iscroll-component --save
```

## Run example
``` bash
cd example/

# install example dependencies
npm install

# serve with hot reload at localhost:9000
npm run dev
```

## Usage

```html
<template>
  <vueIScroll v-model="IScroll">
    <ul>
      <li v-for="item in 30" :key="item">{{item}}</li>
    </ul>
  </vueIScroll>
</template>

<script>
import vueIScroll from 'vue-iscroll-component'

new Vue({
  el: '#app',
  components: {
    vueIScroll
  }
});
</script>
```
<br>

## Options

#### Props



| Props       | Type          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| options   | Object        | {} | Almost options is base on [iscroll](https://github.com/cubiq/iscroll#configuring-the-iscroll) |
| disabled   | Boolean        | false | if true, it like never existed， but slot content can show |
| containerStyle   | Object        | {} | scroll view container style |
| contentStyle   | Object        | {} | scroll view content style |
| topBounceH   | String, Number | null | what's the distance it have to emit handleTopBounce |
| bottomBounceH   | String, Number | null | what's the distance it have to emit handleBottomBounce |

#### Events
| Name          | Params          | Description  |
| --------------|:--------------|--------------|
| handleScroll     | iScroll  | Tochmove event |
| handleTopBounce  | iScroll| Drag the top event |
| handleBottomBounce|iScroll| Drag the bottom event |
| (iScroll event)|iScroll| [iscroll](https://github.com/cubiq/iscroll#configuring-the-iscroll) |


