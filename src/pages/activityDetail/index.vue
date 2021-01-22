<template>
  <div class="main">
    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          活动名称
        </view>
        <view class="uni-list-cell-db">
          {{ list.aName }}
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          时间
        </view>
        <view class="uni-list-cell-db">
          {{ list.startDate }}——{{list.endDate}}
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          活动地点
        </view>
        <view class="uni-list-cell-db">
          {{ list.location}}
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          活动社团
        </view>
        <view class="uni-list-cell-db">
          {{ list.club.cname}}
        </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      // aid: ''
      list: {
        club: {

        }
      }
    }
  },
  created() {
    // uni.getStorage({
    //   key: 'aid',
    //   success: function (result) {
    //     console.log('123')
    //     console.log('result',result.data)
    //     this.cid=result.data
    //     this.getDetail()
    //   }
    // })
    // #ifdef H5
    this.aid = uni.getStorageSync('aid')
    // console.log(this.aid)
    // #endif
    // #ifdef MP-WEIXIN
    this.aid = uni.getStorageSync('aid').detail.index
    // #endif
    // console.log(this.aid)
    this.getDetail()
  },
  methods:{
    getDetail(){
      uni.request({
        url: 'http://localhost:3000/activity/userdetailactivity',
        method: 'get',
        data: {
          aid: this.aid
        },
        success: (res) => {
          console.log(res.data);
          this.list = res.data.data
          // this.list.appImage='http://localhost:3000/' + res.data.data.appImage.replace(/\\/g, '/')
        }
      })
    }
  }
}
</script>

<style scoped>
/*#ifdef MP-WEIXIN*/
.main{
  width: 750rpx;
}
/*#endif*/

/*#ifdef H5*/
.main{
  width: 80%;
}
/*#endif*/

.main {
  /*width: 80%;*/
  margin: 0 auto;
}

.uni-list-cell{
  padding: 20px 0px;
  text-align: center;
}
.uni-list-cell-left{
  font-weight: 600;
  /*width: 150px;*/
}
</style>