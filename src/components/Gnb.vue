<template>
  <div class="wrapper-gnb">
      <div class="title-msg">{{ msg }}</div>
      <div class="login-box" v-if="!loginState">
          <button>login</button>
      </div>
      <div class="login-box"  v-if="loginState">
          <div>
              userName
          </div>
          <div>
              <img src="" alt="">
              userPhoto
          </div>
          <button>logout</button>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'LIVE Q&A',
            loginState: true,
        }
    },
}
</script>

<style lang="scss" scoped>
  @import 'gnb.scss';
</style>
