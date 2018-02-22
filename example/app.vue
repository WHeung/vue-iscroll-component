<template>
  <div :class="$style.main">
    <IScroll>
      <ul :class="$style.list">
        <li v-for="item in 30" :key="item">{{item}}</li>
      </ul>
    </IScroll>
  </div>
</template>

<script>
import IScroll from './dist/vue-iscroll.vue'

console.dir(IScroll)
export default {
  name: '',
  components: { IScroll }
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
}
.list li {
  margin-bottom: 20px;
}

</style>
