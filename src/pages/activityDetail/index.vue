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
          {{ list.startDate }}——{{ list.endDate }}
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          活动地点
        </view>
        <view class="uni-list-cell-db">
          {{ list.location }}
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          活动简介
        </view>
        <view class="uni-list-cell-db">
          {{ list.club.cname }}
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          相关文件
        </view>
        <view class="uni-list-cell-db">
<!--          {{ list.aafile }}-->
          <image :src="list.aafile"></image>
        </view>
      </view>
    </view>
    <uni-section title="活动相关社团记录" type="line"></uni-section>
    <view class="example-body">
      <uni-card v-for="item in activityLog" @click="logDetail(item.alid)">
        <text class="content-box-text">
          {{ item.alintroduction }}
        </text>
      </uni-card>
    </view>
  </div>
</template>

<script>
import api from '@/utils/requests.js'

export default {
  name: "index",
  options: { styleIsolation: 'apply-shared' },
  data() {
    return {
      aid: '',
      list: {
        club: {}
      },
      activityLog: []
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
    this.aid = uni.getStorageSync('aid')
    // console.log(this.aid)
    // #endif
    // console.log(this.aid)
    this.getDetail()
    this.getActivityLog()
  },
  methods: {
    getDetail() {
      uni.request({
        url: 'http://localhost:3000/activity/userdetailactivity',
        method: 'get',
        data: {
          aid: this.aid
        },
        success: (res) => {
          console.log(res.data);
          this.list = res.data.data
          this.list.aafile='http://localhost:3000/' + res.data.data.aafile.replace(/\\/g, '/')
        }
      })
    },
    getActivityLog() {
      api({
        url: 'activitylog/loglistforactivity',
        mothod: 'get',
        params: {
          aid: this.aid
        }
      }).then(res => {
        // console.log(res)
        this.activityLog = res.data
      })
    },
    logDetail(alid){
      uni.setStorage({
        key: 'alid',
        data: alid,
        success: ()=>{
          uni.navigateTo({
            url: '/pages/activityLog/index'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
/*#ifdef MP-WEIXIN*/
.main {
  width: 750rpx;
}
image{
  width: 550rpx;
  height: 550rpx;
}
/*#endif*/

/*#ifdef H5*/
.main {
  width: 80%;
}

/*#endif*/

.main {
  /*width: 80%;*/
  margin: 0 auto;
}

.uni-list-cell {
  padding: 20px 0px;
  text-align: center;
}

.uni-list-cell-left {
  font-weight: 600;
  /*width: 150px;*/
}

/deep/ .uni-card{
  margin: 0px;
  border-radius: 0px;
}
/deep/ .uni-border:after{
  border-radius: 0px;
}

</style>