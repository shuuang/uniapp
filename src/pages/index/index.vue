<template>
  <view>
    <view class="uni-margin-wrap">
      <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item v-for="item in imgList">
          <image class="swiper-image" mode="widthFix" :src="'http://localhost:3000/' + item.aafile" width="100%"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="example-body">
      <uni-grid :column="4" :highlight="true">
        <uni-grid-item style="height: 220px; width: 220px;margin: 15px" v-for="(item, index) in list" :index="index" :key="index" >
          <view class="grid-item-box" :style="{backgroundImage: 'url('+item.appImage+')'}" @click="Detail(item.cid)">
<!--            <image :src="item.url" class="image" mode="aspectFill" style="vertical-align: middle"/>-->
            <text class="text">{{ item.cname }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>
  </view>
</template>
<script>
// import axios from "axios";
import api from '@/utils/requests.js'
// import {login} from '@/api/user'

export default {
  name: "index",
  data() {
    return {
      background: ['color1', 'color2', 'color3'],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      list: [],
      imgList: []
    }
  },
  created() {
    this.getClubList()
    this.getImg()
  },
  methods: {
    changeIndicatorDots(e) {
      this.indicatorDots = !this.indicatorDots
    },
    changeAutoplay(e) {
      this.autoplay = !this.autoplay
    },
    intervalChange(e) {
      this.interval = e.detail.value
    },
    durationChange(e) {
      this.duration = e.detail.value
    },
    getClubList(){
      //原生axios
      // console.log(axios.default.baseURL)
      // this.$axios({
      //   url: axios.default.baseURL + 'club/userclublist',
      //   method: 'post',
      //   data: {
      //     appStatus: 1
      //   }
      //   // headers: {
      //   //   'x-token':this.token
      //   // }
      // }).then(res => {
      //   this.list = res.data.data.filter(item => item.appImage = item.appImage.replace(/\\/g, '/'))
      // })

      //封装axios
      api.post('club/userclublist',{appStatus: 1})
          .then(res => {
        this.list = res.data.filter(item => item.appImage = item.appImage.replace(/\\/g, '/'))
            console.log(this.list)
      })
      //uni.request开始
      // uni.request({
      //   url: 'http://localhost:3000/club/userclublist',
      //   method: 'post',
      //   data: {
      //     appStatus: 1
      //   },
      //   success: (res) => {
      //     // console.log(res);
      //     this.list = res.data.data.filter(item => item.appImage = item.appImage.replace(/\\/g, '/'))
      //     // console.log(this.list)
      //     // var test = res.data.data[1].appImage
      //     // console.log(test)
      //     // var tests = test.replace(/\\/g, '/')
      //     // console.log(tests)
      //   }
      // })
      // uni.request结束
    },
    getImg(){
      api({
        url: 'activity/useractivitylist',
        method: 'get',
        params:{
          astatus: 1
        }
      }).then(res=>{
        // console.log(res)
        const list = res.data.filter(item => item.aafile = item.aafile.replace(/\\/g, '/')).reverse()
        // console.log(list.slice(0,3))
        this.imgList = list.slice(0,3)
        // console.log(this.imgList)
      })
    },
    Detail(cid) {
      // console.log(cid)
      // let cid = JSON.stringify(encodeURIComponent(id))
      // uni.redirectTo({
      //   url: '/pages/clubDetail/index?cid=' + cid
      // })
      uni.setStorage({
        key: 'cid',
        data: cid,
        success: function (cid){
          uni.navigateTo({
            url: '/pages/clubDetail/index'
          })
        }
      })
      // uni.setStorage({
      //   key: 'cid',
      //   data: cid,
      //   success: function () {
      //     console.log("test")
      //   }
      // });
      // uni.navigateTo({
      //   url: '/pages/test1/index'
      // });
    }
  }
}
</script>

<style scoped>
.uni-margin-wrap {
  width:690rpx;
  width: 100%;
  /*height: 400px;*/
}
.swiper {
  height: 300rpx;
  height: 400px;
}

.text{
  background-color: rgba(0, 0, 0, 0.1);
  /*box-shadow: 0px 2px 3px 0px black;*/
  /*padding: 0px 18px;*/
  color: #ffffff !important;
  line-height: 11;
  width: 100%;
  text-align: center;
}

.swiper-item {
  display: block;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
}

.swiper-list {
  margin-top: 40rpx;
  margin-bottom: 0;
}

.uni-common-mt{
  margin-top:60rpx;
  position:relative;
}

.info {
  position: absolute;
  right:20rpx;
}

.uni-padding-wrap {
  width:550rpx;
  padding:0 100rpx;
}

/*grid*/
@charset "UTF-8";

/* 头条小程序组件内不能引入字体 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  font-weight: normal;
  font-style: normal;
  src: url("~@/static/uni.ttf") format("truetype");
}

/* #endif */
/* #ifndef APP-NVUE */
page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #efeff4;
  min-height: 100%;
  height: auto;
}

view {
  font-size: 14px;
  line-height: inherit;
}

.example {
  padding: 0 15px 15px;
}

.example-info {
  padding: 15px;
  color: #3b4144;
  background: #ffffff;
}

.example-body {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 14px;
  background-color: #ffffff;
}

/* #endif */
.example {
  padding: 0 15px;
}

.example-info {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  padding: 15px;
  color: #3b4144;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 20px;
}

.example-info-text {
  font-size: 14px;
  line-height: 20px;
  color: #3b4144;
}

.example-body {
  flex-direction: column;
  background-color: #ffffff;
  padding: 0px 250px;
}

.word-btn-white {
  font-size: 18px;
  color: #FFFFFF;
}

.word-btn {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  height: 48px;
  margin: 15px;
  background-color: #007AFF;
}

.word-btn--hover {
  background-color: #4ca2ff;
}

.image {
  /*width: 50rpx;*/
  /*height: 50rpx;*/
  width: 100%;
  height: 100%;
}

.text {
  font-size: 40rpx;
  color: white;
}

.example-body {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
}

.grid-dynamic-box {
  margin-bottom: 15px;
}

.grid-item-box {
  flex: 1;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*padding: 15px 0;*/

  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.grid-dot {
  position: absolute;
  top: 5px;
  right: 15px;
}

/deep/ .uni-grid--border{
  border: none;
}
/deep/ .uni-grid-item--border{
  border: none;
}

.uni-margin-wrap {

  height:100%;
  margin:0 0upx;
}
.swiper {
  height: 680upx;
}
.swiper-item {
  display: block;
  /*line-height: 550upx;*/
  text-align: center;
}
/*图片宽度设置100% ，高度300upx（设为auto图片无法显示）*/
.swiper-image{
  width:100%;
  /*height:550upx;*/
}
</style>
