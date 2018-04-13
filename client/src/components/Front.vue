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
            <!-- <select class="sort-select" @change="sortFunc" v-model="selected">
              <option :value="option" v-for="option in options" :key="option.key">{{option}}</option>
            </select>
            <img class="ic-downarrow" src="../assets/ic_downarrow.svg" alt=""> -->
            <span class="sort-select" 
            :class="{ selected : option == selected }"
            v-for="option in options" 
            :key="option.key" 
            @click="sortFunc(option)">
            {{ option }}
            </span>
          </div>
        </div>
        <div class="line"></div>
        <div>
          <Card v-for="item in history" :key="item.timestamp" :item="item" />
        </div>
      </div>
    </div>
    <div class="float-modal">
      <textarea class="input-question" id="textarea" v-model="postMsg" placeholder="질문을 남겨주세요" :rows="12" :max-rows="12"></textarea>
      <div class="btn-wrapper">
        <button class="btn-ask" @click="submit()" :disabled="!checkEmptyPost" :class="{active:checkEmptyPost}">ASK</button>
      </div>
    </div>
    <transition name="toggle-input" appear>
      <div class="float-bar" v-if="!mobileInputState">
        <div class="toggle-input" @click="openInput">
          질문을 남겨주세요
        </div>
      </div>
    </transition>
    <transition name="toggle-input" appear>
      <div class="float-bar" v-if="mobileInputState">
        <div class="input-wrapper">
          <span class="btn-close" @click="toggleInput">close</span>
          <textarea class="input-question" id="mobile-textarea" v-model="postMsg" placeholder="질문을 남겨주세요" :rows="6" :max-rows="6"></textarea>
        </div>
        <div class="btn-wrapper">
          <button class="btn-ask" @click="submit()" :disabled="!checkEmptyPost" :class="{active:checkEmptyPost}">ASK</button>
        </div>
      </div>
    </transition>
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
			selected: 'Recent',
            options: [ 'Popular', 'Recent' ],
            mobileInputState: false,
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
    methods: {
        openInput() {
            this.mobileInputState = true
            this.$nextTick(() => {
                var target = document.getElementById('mobile-textarea')
                target.focus()
            })
        },
        toggleInput() {
            this.mobileInputState = !this.mobileInputState
        },
		sortFunc(option)
		{
            this.selected = option
			this.$nextTick(() => {
				if ( this.selected == "Recent" )
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
				else if ( this.selected == "Popular" )
				{
					this.history.sort( (a, b) => {
						if (a.score > b.score) {
							return -1;
						}
						if (a.score < b.score) {
							return 1;
                        }
                        if (a.score = b.score) {
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
						this.sortFunc(this.selected);
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

<style scoped>
div {
    box-sizing: border-box;
}
.container {
    width: 100%;
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
    color: #aaa;
    font-size: 13px;
    padding: 0px 6px;
    cursor: pointer;
    transition: all 0.3s;
}
.sort-select.selected {
    color: #000;
    font-weight: 700;
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
    margin: 32px 16px 4px;
    border: none;
    width: calc(100% - 32px);
    font-size: 14px;
    resize: none;
    line-height: 22px;
}
.float-bar .btn-close {
    position: absolute;
    right: 16px;
    top: 16px;
    color: #999;
}
.float-modal {
    display: none;
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
.toggle-input {
    padding: 16px;
    font-weight: 300;
    color: #bbb;
}
.pos-abs {
    /* position: absolute; */
}
@media (min-width: 902px) {
    .container {
        max-width: 902px;
        width: 82vw;
        display: flex;
        align-items: flex-start;
        margin: 0px 0px 0px 15vw;
    }
    .main-view {
        box-sizing: content-box;
        display: inline-block;
        max-width: 35vw;
        padding: 0px 10vw 100px 0px;
    }
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
    .float-bar {
        display: none;
    }
    .float-modal {
        display: inline-block;
        position: fixed;
        top: 145px;
        left: calc(50vw + 40px);
        width: 340px;
        background-color: #fff;
        box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.08);
    }
    .float-modal .input-question {
        width: 100%;
        font-size: 14px;
        margin: 16px 16px 4px;
        border: none;
        width: calc(100% - 32px);
        font-size: 14px;
        resize: none;
    }
}
</style>
