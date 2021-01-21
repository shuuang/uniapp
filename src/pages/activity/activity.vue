<template>
  <div class="main">
    <view class="uni-list">
      <block v-for="(value, index) in listData" :key="index">
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goDetail(value)">
          <view class="uni-media-list">
<!--            <image class="uni-media-list-logo" :src="value.cover"></image>-->
            <image class="uni-media-list-logo" src="../../static/logo.png"></image>
            <view class="uni-media-list-body">
              <view class="uni-media-list-text-top">{{ value.aName }}</view>
              <view class="uni-media-list-text-bottom">
                <text>{{ value.club.cname }}</text>
                <text>{{ value.startDate }} —— {{ value.endDate}}</text>
              </view>
            </view>
          </view>
        </view>
        <!-- #ifdef APP-PLUS -->
        <view class="ad-view" v-if="(index > 0 && (index+1) % 10 == 0)">
          <ad :adpid="adpid" @error="aderror"></ad>
        </view>
        <!-- #endif -->
      </block>
    </view>
  </div>
</template>

<script>
import api from '@/utils/requests.js'
export default {
  name: "activity",
  data(){
    return {
      listData:[]
    }
  },
  created() {
    this.getActivityList()
  },
  methods: {
    getActivityList(){
      api({
        url: 'activity/useractivitylist',
        method: 'get',
        params: {
          astatus: 1
        }
    }).then(res => {
        console.log(res.data)
        this.listData = res.data
      })
    }
  }
}
</script>

<style scoped>
.main{
  width: 80%;
  margin: 0px auto;
  padding: 20px 0px;
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