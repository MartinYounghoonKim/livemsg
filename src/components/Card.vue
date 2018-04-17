<template>
  <transition name="cardIn" appear>
    <div class="card">
      <div class="card-header">
        <div class="card-num">
          No. {{ postnum + 1 }}
        </div>
        <div class="card-date">
          {{ item.timestamp| moment("MMMM DD, YYYY HH:mm:ss") }}
        </div>
      </div>
      <p class="card-content" :class="{'large-text' : isShort}">{{ item.postMsg }}</p>
      <div class="card-footer">
        <span class="card-score" :class="{active:upVoted}">{{ item.score }}</span>
        <button class="card-up" @click="upvote(item.id, item.score)" :class="{active:upVoted}" :disabled="upVoted">
          <img src="../assets/up_active.svg" v-if="upVoted" alt="">
          <img src="../assets/up_inactive.svg" v-if="!upVoted" alt="">
        </button>
      </div>
    </div>
  </transition>
</template>
<script>
  import db from '../firebaseStore/firebaseInit';

  export default {
    props: ['item', 'trackName', 'postnum'],
    data() {
      return {
        upVoted: false,
      }
    },
    computed: {
      isShort() {
        if (this.item.postMsg.length < 18) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      upvote(docId, upvote) {
        var postRef = db.collection(this.trackName).doc(docId);
        upvote++;
        this.upVoted = true;
        postRef.update({
          score: upvote
        }).then(ref => {
          console.log(ref);
          console.log('upvote')
        });
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import 'card.scss';
</style>

