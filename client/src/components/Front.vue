<template>
<div class="container">
  <div class="main-view">
    <div class="title-msg">{{ msg }}</div>
    <div>
        <div class="list-header">
            <div class="question-count">
                {{ history.length }} questions
            </div>
            <div>
                <select class="sort-select" @change="sortFunc" v-model="selected">
                    <option :value="option" v-for="option in options" :key="option.key">{{option}}</option>
                </select>
                <img class="ic-downarrow" src="../assets/ic_downarrow.svg" alt="">
            </div>
        </div>
        <div class="line"></div>
        <div>
            <Card
            v-for="item in history" :key="item.timestamp"
            :item="item"/>            
      </div>
    </div>
  </div>
  <div class="float-bar">
    <div class="input-wrapper">
        <textarea class="input-question" id="textarea" v-model="postMsg" placeholder="Type your question" :rows="4" :max-rows="4"></textarea>
    </div>
    <div class="btn-wrapper">
        <button class="btn-ask" @click="submit()" :disabled="!checkEmptyPost" :class="{active:checkEmptyPost}">ASK</button>
    </div>
    
  </div>
  
</div>

</template>

<script>
import db from './firebaseInit';
import Card from './Card';
import moment from 'moment';

export default {
    name: 'HelloWorld',
    data ()
    {
        return {
            msg		: 'LIVE Q&A',
            postMsg	: '',
            history	: [ ],
			selected: 'Popular questions',
            options: [ 'Popular questions', 'Recent questions' ],
        }
    },
    computed: {
      checkEmptyPost() {
          if (this.postMsg == '') {
              return false;
          } else {
              return true;
          }
      } 
    },
    created() {
    },
    mounted()
    {
        this.getTimeline();
        //this.todo();
    },
    methods:
    {
		sortFunc()
		{
			this.$nextTick(() => {
				if ( this.selected == "Recent questions" )
				{
					this.history.sort((a, b) => {
                        var aTime = moment(a.timestamp).format('YYYYMMDDHHmmss')
                        var bTime = moment(b.timestamp).format('YYYYMMDDHHmmss')
                        aTime = Number(aTime)
                        bTime = Number(bTime)
						if (aTime > bTime) {
							return -1;
						}
						if (aTime < bTime) {
							return 1;
						}
						return 0;
					});
				}
				else if ( this.selected == "Popular questions" )
				{
					this.history.sort( (a, b) => {
						if (a.score > b.score) {
							return -1;
						}
						if (a.score < b.score) {
							return 1;
						}
						return 0;
					});
				}
			});
		},

        todo()
        {
            setInterval(() => {
                this.getTimeline();
            }, 3000);
        },
        submit()
        {
            let timestamp = Date();
            var postRef = db.collection('section1').doc();
            var tempMsg = this.postMsg
            this.postMsg = '';
			postRef.set({
				score		: 0,
				timestamp	: timestamp,
                msg			: tempMsg,
                postnum     : this.history.length
			}).then(ref => {
                
			}).catch(err => {
                this.postMsg = tempMsg
                alert(err)
            });
        },
        getTimeline()
        {

			var postRef = db.collection('section1');

			postRef.onSnapshot(( snapshot ) => {
						this.history = [];
						var i = 0;
						snapshot.forEach((doc) => {
							this.history[i] = [];
							this.history[i]['id'] = doc.id;
							this.history[i]['timestamp'] = doc.data().timestamp;
							this.history[i]['postMsg'] = doc.data().msg;
                            this.history[i]['score'] = doc.data().score;
                            this.history[i]['postnum'] = doc.data().postnum;
							i++;
						})
						this.sortFunc();
					}, ( error ) => {
						console.log('Error getting documents', err);
					});
        }
    },
    components: {
        Card: Card,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
    box-sizing: border-box;
}
.container {
    max-width: 768px;
    margin: 0 auto;
}
.main-view {
    padding-bottom: 160px;
}
.title-msg {
    font-family: 'Roboto';
    font-size: 32px;
    font-weight: 100;
    padding: 16px 16px 12px 16px;
}
.sort-select {
    position: relative;
    left: 15px;
    border: none;
    background-color: transparent;
    color: #aaa;
    width: 110px;
}
.question-count {
    font-size: 14px;
    color: #aaa;
}
.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px 12px 16px;
}
.line {
    margin: 0px 16px 4px 16px;
    background-color: #eee;
    height: 1px;
}
.float-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px -4px 24px 0px rgba(0,0,0,0.08);
}
.float-bar .input-question {
    margin: 16px 16px 4px;
    border: none;
    width: calc(100% - 32px);
    font-size: 14px;
    resize: none;
}
.btn-ask {
    width: 100%;
    height: 44px;
    background-color: #aaa;
    color: #fff;
    font-size: 15px;
    font-weight: 800;
    transition: all 0.3s;
}
.btn-ask.active {
    background-color: #5C9CFF;
}
.btn-ask.active:hover {
    background-color: #5c88ff;
}
.input-wrapper {
    max-width: 768px;
    margin: 0 auto;
}
@media (min-width: 768px) {
    .title-msg {
        font-size: 48px;
        font-weight: 100;
        padding: 32px 0px 12px;
    } 
    .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 0px 12px;
    }
}
</style>
