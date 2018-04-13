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
                <select class="sort-select" @change="sortFunc">
                    <option :value="option" :selected="option[0]" v-for="option in options" :key="option.key">{{option}}</option>
                </select>
            </div>
        </div>
        <div class="line"></div>
        <div >
            <Card
            v-for="item in history" :key="item.key"
            :item="item"/>
      </div>
    </div>
  </div>
  <div>
  <textarea id="textarea" v-model="postMsg" placeholder="Type your question" :rows="4" :max-rows="4">
  </textarea>
  </div>
  <button @click="submit()">ASK</button>
</div>

</template>

<script>
import db from './firebaseInit';
import Card from './Card';

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
			this.$nextTick(function()
			{
				if ( this.selected == "Recent questions" )
				{
					this.history.sort(function (a, b) {
						if (a.timestamp > b.timestamp) {
							return -1;
						}
						if (a.timestamp < b.timestamp) {
							return 1;
						}
						return 0;
					});
				}
				else if ( this.selected == "Popular questions" )
				{
					this.history.sort(function (a, b) {
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

			postRef.set({
				score		: 0,
				timestamp	: timestamp,
				msg			: this.postMsg
			}).then(ref => {
                this.postMsg = '';
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
.title-msg {
    font-size: 24px;
    font-weight: 800;
    padding: 16px 16px 12px 16px;
}
.sort-select {
    border: none;
    background-color: transparent;
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
    background-color: #ccc;
    height: 1px;
}

</style>
