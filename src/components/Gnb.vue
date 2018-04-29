<template>
  <div class="wrapper-gnb">
      <div class="title-msg">{{ msg }}</div>
      <div class="login-box" v-if="!user">
          <button @click="signIn()">login</button>
      </div>
      <div class="login-box"  v-if="user">
          <div>
              {{ user.displayName }} 
          </div>
          <div class="user-photo">
              <img :src="user.photoURL">
          </div>
          <button @click="signOut()">logout</button>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
    data() {
        return {
            msg: 'LIVE Q&A',
            user: '',
        }
    },
    beforeCreate: function() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
        }
      })
    },
    methods: {
      signIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider).then((result) => {
          this.user = result.user;
        }).catch(err => console.log(err))
      },
      signOut() {
        firebase.auth().signOut().then(() => {
          this.user = null;
        }).catch(err => console.log(err))
      },
    }
}
</script>

<style lang="scss" scoped>
  @import 'gnb.scss';
</style>
