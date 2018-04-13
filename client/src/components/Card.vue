<template>
    <div class="card">
        <div class="card-header">
            <div class="card-num">
                {{ item.key }}
            </div>
            <div class="card-date">
                {{ item.timestamp| moment("MMMM DD, YYYY HH:mm:ss") }}
            </div>
        </div>
        <p class="card-content">{{ item.postMsg }}</p>
        <div class="card-footer">
            <span class="card-score">{{ item.score }}</span>
            <button class="card-up" @click="upvote(item.id, item.score)" :class="{active:upVoted}" :disabled="upVoted">
                <img src="../assets/up_active.svg" v-if="upVoted" alt="">
                <img src="../assets/up_inactive.svg" v-if="!upVoted" alt="">
            </button>
        </div>
    </div>
</template>
<script>
import db from './firebaseInit';

export default {
    props: ['item'],
    data() {
        return {
            upVoted: false,
        }
    },
    methods: {
        upvote(docId, upvote)
        {
            var postRef = db.collection('section1').doc(docId);
			upvote++;
            this.upVoted = true;
			postRef.update({
				score	: upvote
			}).then(ref => {
                console.log( ref );
			});
        },
    }
}
</script>

<style scoped>
.card {
    width: 100%;
    padding: 12px 16px;
    box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.08);
    margin: 8px 0px;
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
.card-content {
    margin: 4px 0px;
    font-size: 14px;
    color: #666;
}
.card-footer {
    display:flex;
    align-items: center;
    justify-content: flex-end;
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
    box-shadow: 1px 2px 8px 0px rgba(0,0,0,0.08);
    cursor: pointer;
    transition: all 0.3s;
}
.card-up.active {
    background-color: #5C9CFF;
}
</style>


