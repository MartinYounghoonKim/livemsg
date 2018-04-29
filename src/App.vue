<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { store } from './vuex/store'
export default {
  store,
  name: 'App'
}
</script>

<style lang="scss">
  @import 'app.scss';
</style>
