<template>
  <div class="main">
<!--    <view style="background-color: rgba(255,255,255,0.5)">-->
    <view class="activity" v-for="(item,index) in listData" :key="index"
          :style="{backgroundImage: 'url(http://localhost:3000/'+item.aafile+')'}" @click="goDetail(item.aid)">
      <view class="activitybg">
        <text style="font-size: 25px;font-weight: 300;">{{ item.aName }}</text>
        <text style="font-size: 12px">{{ item.club.cname }}</text>
        <text style="font-size: 12px">{{ item.startDate }} -- {{ item.endDate }}</text>
      </view>
    </view>
<!--    </view>-->
<!--    <view class="page">-->
<!--      <view class="image-list">-->
<!--        <view class="image-item" v-for="(item,index) in listData" :key="index">-->
<!--          <view class="image-content">-->
<!--&lt;!&ndash;            <view class="grid-item-box" mode="aspectFill" :style="{backgroundImage: 'url(http://localhost:3000/'+item.aafile+')'}">&ndash;&gt;-->
<!--&lt;!&ndash;              <text class="text">{{ item.aName }}</text>&ndash;&gt;-->
<!--&lt;!&ndash;            </view>&ndash;&gt;-->
<!--            <image style="width: 100%; height: 200px; background-color: #eeeeee;" mode="aspectFill" :src="'http://localhost:3000/'+item.aafile"-->
<!--                   @error="imageError">-->
<!--            </image>-->
<!--          </view>-->
<!--          <view class="image-title">{{item.text}}</view>-->
<!--        </view>-->
<!--      </view>-->
<!--    </view>-->
<!--    <view class="uni-list">-->
<!--      <block v-for="value in listData" :key="value.aid">-->
<!--        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goDetail(value.aid)">-->
<!--          <view class="uni-media-list">-->
<!--&lt;!&ndash;            <image class="uni-media-list-logo" :src="value.cover"></image>&ndash;&gt;-->
<!--            <image class="uni-media-list-logo" :src="'http://localhost:3000/'+value.aafile"></image>-->
<!--            <view class="uni-media-list-body">-->
<!--              <view class="uni-media-list-text-top">{{ value.aName }}</view>-->
<!--              <view class="uni-media-list-text-bottom">-->
<!--                <text>{{ value.club.cname }}</text>-->
<!--                <text>{{ value.startDate }} —— {{ value.endDate}}</text>-->
<!--              </view>-->
<!--            </view>-->
<!--          </view>-->
<!--        </view>-->
<!--      </block>-->
<!--    </view>-->
  </div>
</template>

<script>
import api from '@/utils/requests.js'
export default {
  name: "activity",
  data(){
    return {
      listData:[],
      src: ''
    }
  },
  created() {
    this.getActivityList()
  },
  methods: {
    getActivityList(){
      // api.get('activity/useractivitylist',{astatus: 1}).then(res=>{
      //   console.log(res)
      //   const list = res.data.filter(item => item.aafile = item.aafile.replace(/\\/g, '/'))
      //   console.log(list)
      //   this.listData = list
      //   // this.listData = res.data.filter(item => item.aafile = item.aafile.replace(/\\/g, '/'))
      // })
      api({
        url: 'activity/useractivitylist',
        method: 'get',
        params: {
          astatus: 1
        }
    }).then(res => {
        // console.log(res)
        // const list = res.data.filter(item => item.aafile = item.aafile.replace(/\\/g, '/'))
        // console.log(list)
        this.listData = res.data.filter(item => item.aafile = item.aafile.replace(/\\/g, '/'))
        // console.log(listDate)
        // this.listData = res.data
        // this.listData = res.data.filter(item => {
        //   item.aafile = item.aafile.replace(/\\/g, '/')
        // })
      })
    },
    goDetail(aid){
      console.log(aid)
      uni.setStorage({
        key: 'aid',
        data: aid,
        success: function (aid){
          uni.navigateTo({
            url: '/pages/activityDetail/index'
          })
        }
      })
      // uni.setStorageSync('aid','aid')
    }
  }
}
</script>

<style scoped>
.activity{
  height: 200px;
  text-align: center;
  box-shadow: inset 0px 0px 20px 0px black;
}
.activitybg{
  background-color: rgba(255,255,255,0.5);
  /*line-height: 10;*/
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.main{
  width: 80%;
  margin: 0px auto;
  padding: 20px 0px;
}
.image-content{
  text-align: center;
}
.banner {
  height: 360rpx;
  overflow: hidden;
  position: relative;
  background-color: #ccc;
}

.banner-img {
  width: 100%;
}

.banner-title {
  max-height: 84rpx;
  overflow: hidden;
  position: absolute;
  left: 30rpx;
  bottom: 30rpx;
  width: 90%;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 42rpx;
  color: white;
  z-index: 11;
}

.uni-media-list-logo {
  width: 180rpx;
  height: 140rpx;
}

.uni-media-list-body {
  height: auto;
  justify-content: space-around;
}

.uni-media-list-text-top {
  height: 74rpx;
  font-size: 28rpx;
  overflow: hidden;
}

.uni-media-list-text-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>