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


