<template>
  <transition name="cardIn" appear>
    <div class="card">
      <div class="card-header">
        <div class="card-num">
          No. {{ item.postnum }}
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
    props: ['item'],
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
        var postRef = db.collection('section1').doc(docId);
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

<style scoped>
  .card {
    width: 100%;
    padding: 12px 16px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
    margin: 12px 0px;
    transition: all 0.3s;
  }

  .card:hover {
    transform: scale(1.05);
    transform: translateY(-2px);
    box-shadow: 1px 6px 8px 0px rgba(0, 0, 0, 0.10);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-date {
    font-size: 12px;
    color: #aaa;
  }

  .card-num {
    color: #aaa;
    font-size: 13px;
  }

  .card-content {
    margin: 13px 0px 4px;
    font-size: 15px;
    color: #666;
    line-height: 22px;
  }

  .card-content.large-text {
    font-size: 22px;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 8px;
  }

  .card-score {
    font-size: 13px;
    color: #aaa;
    margin-right: 8px;
  }

  .card-score.active {
    color: #5C9CFF;
  }

  .card-up {
    width: 44px;
    height: 44px;
    background-color: #fff;
    border: none;
    border-radius: 44px;
    box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.5s;
  }

  .card-up:hover {
    position: relative;
    transform: scale(1.1);
    transform: translateY(-2px);
    box-shadow: 1px 6px 8px 0px rgba(0, 0, 0, 0.12);

  }

  .card-up.active {
    background-color: #5C9CFF;
  }

  @media ( min-width: 768px ) {
    .card {
      padding: 16px 24px;
    }
  }
</style>


