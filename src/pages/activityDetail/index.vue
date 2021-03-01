<template>
  <div class="main">
    <view>
      <p class="aName">{{ list.aName }}</p>
      <view class="activityInfo">
        <text class="info">承办单位{{ list.club.cname }}</text>
        <text class="info">活动时间：{{ list.startDate }}——{{ list.endDate }}</text>
        <text class="info">举办地点：{{ list.location }}</text>
      </view>
      <p class="aComment">{{ list.aIntroduction }}</p>
      <image mode="widthFix" :src="list.aafile" style="width: 100%"></image>
    </view>
    <!-- #ifdef H5 -->
    <uni-section title="活动记录数量" type="line"></uni-section>
    <echarts></echarts>
<!--    #endif-->
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
import echarts from '@/pages/echarts/index'

export default {
  name: "index",
  components:{
    echarts
  },
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
    lineInit(e) {
      let {
        width,
        height
      } = e;
      let canvas = this.$refs.lineChart.canvas
      echarts.setCanvasCreator(() => canvas);
      let lineChart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      canvas.setChart(lineChart)
      lineChart.setOption(this.line)
      this.$refs.lineChart.setChart(lineChart)
    },
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
.activityInfo{
  font-size: 30rpx;
  display: flex;
  flex-direction: column;
  color: #c8c7cc;
}
.aComment{
  padding: 10px;
  border-top: 1px solid
}
/*#endif*/

/*#ifdef H5*/
.main {
  width: 80%;
}
.info{
  font-size: 13px;
  color: #c8c7cc;
  margin-right: 30px;
}
.aComment{
  padding: 30px;
  border-top: 1px solid
}
/*#endif*/

.aName{
  padding-top: 10px;
  font-weight: 800;
  font-size: 20px;
}

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