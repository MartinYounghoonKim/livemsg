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
    transform: translateY(20%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes toggleInput {
  from {
    opacity: 0;
    transform: translateY(20%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.cardIn-enter-active {
  animation: cardIn 0.8s ease;
}
.cardIn-leave-active {
  animation: cardIn 0.8s reverse;
}
.toggle-input-enter-active {
  animation: toggleInput 0.3s;
}
.toggle-input-leave-active {
  animation: toggleInput 0.3s reverse;
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
::placeholder {
  color: #bbb;
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
