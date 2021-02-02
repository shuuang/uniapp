<template>
  <div class="main">
    <page-head :title="log.alintroduction"></page-head>
    <view class="uni-center">
      <span class="info">记录社团：{{ log.club.cname }}</span>
      <span class="info">记录时间：{{ log.aldate }}</span>
    </view>
    <view class="uni-center" style="background:#FFFFFF; font-size:0;padding: 20px;">
      <image class="image mycard" mode="widthFix" :src="'http://localhost:3000/'+ log.img"/>
      <view class="uni-padding-wrap uni-common-mt">
        <view class="mycard">
          <video id="myVideo" src="@/static/videos.mp4"
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
        <uni-card v-for="item in comments" :title="item.users.realname" :isFull="true" :extra="item.createAt" @click="clickCard">
          <text class="content-box-text">{{item.comment}}</text>
        </uni-card>
      </view>
    </view>
  </div>
</template>

<script>
import pageHead from '@/components/page-head/page-head'
import api from "@/utils/requests";

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
      alid: '',
      comments: [],
      comment: ''
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
    getLog() {
      api({
        url: 'activitylog/searchlog',
        method: 'get',
        params: {
          alid: this.alid
        }
      }).then(res => {
        console.log(res)
        this.log = res.data
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
        // console.log(res)
        this.comments = res.data.reverse()
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
        // console.log(res)
        if (res.code==20000){
          this.getComments()
          this.comment = ''
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
/*#endif*/

.main {
  /*width: 80%;*/
  margin: 0 auto;
}

/deep/ .uni-page-head-title {
  color: black;
  /*font-weight: 500;*/
  font-size: 18px;
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