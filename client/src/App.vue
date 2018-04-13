<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100');

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateX(20%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.cardIn-enter-active {
  animation: cardIn 0.8s ease;
}
.cardIn-leave-active {
  animation: cardIn 0.8s reverse;
}
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
button {
  border:none;
  background-color: transparent;
  -webkit-appearance:none;
  cursor: pointer;
}
select {
  -webkit-appearance:none;
}


</style>
