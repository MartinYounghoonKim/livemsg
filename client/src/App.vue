<template>
  <div id="app">
  <!--
    <img src="./assets/logo.png">
	-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Apple SD Gothic', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h1, h2, h3, ul, li, div, span, p, body {
    margin: 0;
    padding: 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
:focus {
  outline: none;
}
</style>
