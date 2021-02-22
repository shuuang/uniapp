<template>
  <div class="main">
<!--    #ifdef H5-->
    <page-head :title="log.alintroduction"></page-head>

    <view class="uni-center">
      <span class="info">记录社团：{{ log.club.cname }}</span>
      <span class="info">记录时间：{{ log.aldate }}</span>
    </view>
<!--    #endif-->
<!--    #ifdef MP-WEIXIN-->
    <p style="font-size: 17px; font-weight: 500">{{log.alintroduction}}</p>
    <view>
      <span class="info">记录社团：{{ log.club.cname }}</span>
      <span class="info">记录时间：{{ log.aldate }}</span>
    </view>
<!--    #endif-->

    <view class="uni-center" style="background:#FFFFFF; font-size:0;padding: 20px;">
      <view v-for="(item,index) in imgs">
        <image class="image mycard" mode="widthFix" :src="'http://localhost:3000/' + item " />
      </view>
      <view class="uni-padding-wrap uni-common-mt">
        <view v-for="item in videos">
          <video class="mycard" id="myVideo" :src="'http://localhost:3000/' + item "
                 controls poster="@/static/association.png"></video>
        </view>
      </view>
    </view>
    <view class="example-body">
      <view class="example-box">
        <uni-card :isFull="true">
          <view class="uni-textarea" style="border: 1px solid #b0b0b0;margin-bottom: 10px">
            <textarea v-model="comment" placeholder="输入评论内容" auto-height/>
          </view>
          <view style="float: right">
            <button size="mini" type="default" plain="true" @click="handleComment">评论</button>
          </view>
        </uni-card>
        <uni-card v-for="item in comments" :title="item.users.realname" :isFull="true" :extra="decadeTime(item.createAt)">
          <text class="content-box-text">{{item.comment}}</text>
        </uni-card>
      </view>
    </view>
    <uni-popup id="popupMessage" ref="popupMessage" type="dialog">
      <uni-popup-message type="error" :message="errorMsg" :duration="2000"></uni-popup-message>
    </uni-popup>
  </div>
</template>

<script>
import pageHead from '@/components/page-head/page-head'
import api from "@/utils/requests";
function FormmatTime(times) {
  const time = new Date(times)
  const y = time.getFullYear()
  const mounth = time.getMonth()+1
  const d = time.getDate()
  const h = time.getHours();//12
  const m = time.getMinutes(); //12
  const s = time.getSeconds()
  return `${y}--${addZero(mounth)}-${addZero(d)} ${addZero(h)}:${addZero(m)}:${addZero(s)}`
}
function addZero(v) {
  return v < 10 ? '0' + v : v
}
export default {
  name: "index",
  components: {
    pageHead
  },
  data() {
    return {
      title: '社团活动记录',
      log: {
        club: {
          cname: ''
        }
      },
      imgs:[],
      videos: [],
      alid: '',
      comments: [],
      comment: '',
      errorMsg: ''
    }
  },
  created() {
    // #ifdef H5
    this.alid = uni.getStorageSync('alid')
    // console.log(this.aid)
    // #endif
    // #ifdef MP-WEIXIN
    this.alid = uni.getStorageSync('alid')
    // #endif

    this.getLog()
    this.getComments()
  },
  methods: {
    decadeTime:function (time) {
      var date = new Date(time);
      return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
    },
    getLog() {
      api({
        url: 'activitylog/searchlog',
        method: 'get',
        params: {
          alid: this.alid
        }
      }).then(res => {
        console.log(res)
        // res.data = JSON.parse(res.data.img)
        this.log = res.data
        var imglist = JSON.parse(res.data.img).img
        imglist.forEach(item => {
          // console.log(item)
          this.imgs.push(item.replace(/\\/g, '/'))
        })
        var videolist = JSON.parse(res.data.video).video
        videolist.forEach(item => {
          // console.log(item)
          this.videos.push(item.replace(/\\/g, '/'))
        })
        // console.log(this.imgs)
      })
    },
    getComments() {
      api({
        url: 'logcomment/commentlist',
        method: 'get',
        params:{
          alid: this.alid
        }
      }).then(res => {
        console.log(res)
        // this.comments = res.data.filter(item => {
        //   item.createAt = this.decadeTime(item.createAt)
        // })
        // this.comments = res.data.filter(item => {
        //   item.createAt = item.createAt
        // })
        this.comments = res.data.reverse()
        // console.log(list)
        // this.comments = list
      })
    },

    handleComment(){
      // console.log(this.comment)
      api({
        url: 'logcomment/addcomment',
        method: 'post',
        data: {
          comment: this.comment,
          alid: this.alid
        }
      }).then(res => {
        console.log(res)
        if (res.code==20000){
          this.getComments()
          this.comment = ''
        }
        if (res.code==50000){
          this.$refs.popupMessage.open()
          this.errorMsg = res.message
          console.log(this.errorMsg)
        }
      })
    }
  }
}
</script>

<style scoped>
/*#ifdef MP-WEIXIN*/
.main {
  width: 750 rpx;
}
.info{
  font-size: 10px;
  margin-right: 10px;
}
image{
  width: 550rpx;
}
video{
  width: 100%;
}
/*#endif*/

/*#ifdef H5*/
.main {
  width: 80%;
}
.info{
  font-size: 13px;
  margin-right: 30px;
}
.mycard{
  width: 60%;
}
/deep/ .uni-page-head-title {
  color: black;
  /*font-weight: 500;*/
  font-size: 18px;
}
/*#endif*/

.main {
  /*width: 80%;*/
  margin: 0 auto;
}

.info {
  color: #878787;
}

.example-body {
  margin: 20px 0px;
}

/deep/ .uni-card__header {
  padding: 1px 12px;
}

/deep/ .uni-border-bottom:after {
  border-bottom: none;
}

/deep/ .uni-border:after {
  border: 0px;
}

/deep/ .uni-card--full {
  border-bottom: 1px solid #c8c7cc;
  margin-bottom: 10px;
}
</style>