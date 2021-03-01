<template>
  <div class="main">
<!--    #ifdef MP-WEIXIN-->
    <view class="wxflex">
      <view class="flex-item right">
        <p style="font-size: 20px;font-weight: 500">{{ list.cname }}</p>
        <p class="right-font"><uni-icons type="person" color="#989898" size="17"></uni-icons>指导教师：{{ list.teacher}}</p>
        <p class="right-font"><uni-icons type="contact" color="#989898" size="17"></uni-icons>社团社长：{{ list.users.realname }}</p>
        <p class="right-font"><uni-icons type="circle" color="#989898" size="17"></uni-icons>社团创建时间：{{ list.createAt }}</p>
        <p class="right-font"><uni-icons type="info" color="#989898" size="17"></uni-icons>社团简介{{ list.introduction }}</p>
      </view>
      <view>
        <image :src="list.appImage"></image>
      </view>
    </view>
<!--    #endif-->
<!--    #ifdef H5-->
    <view class="uni-flex uni-row">
      <view class="flex-item left">
        <img class="myimg" :src="list.appImage"></img>
      </view>
      <view class="flex-item right">
        <p style="font-size: 20px;font-weight: 500">{{ list.cname }}</p>
        <p class="right-font"><uni-icons type="person" color="#989898" size="17"></uni-icons>指导教师：{{ list.teacher}}</p>
        <p class="right-font"><uni-icons type="contact" color="#989898" size="17"></uni-icons>社团社长：{{ list.users.realname }}</p>
        <p class="right-font"><uni-icons type="circle" color="#989898" size="17"></uni-icons>社团创建时间：{{ list.createAt }}</p>
        <p class="right-font"><uni-icons type="info" color="#989898" size="17"></uni-icons>社团简介{{ list.introduction }}</p>
      </view>
    </view>
    <uni-section title="社团人数增长" type="line"></uni-section>
    <echarts :charts = "charts"></echarts>
<!--    #endif-->
    <button type="default" @click="sign">报名社团</button>
    <uni-section title="活动相关社团记录" type="line"></uni-section>
    <view class="example-body">
      <uni-card v-for="item in activityLog" @click="logDetail(item.alid)">
        <text class="content-box-text">
          {{ item.alintroduction }}
        </text>
      </uni-card>
    </view>
    <uni-popup id="popupDialog" ref="popupDialog" type="dialog">
      <uni-popup-dialog type="info" title="通知" content="确认报名此社团？" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
    </uni-popup>
    <uni-popup id="popupMessage" ref="popupMessage" type="dialog">
      <uni-popup-message :type="type" :message="msg" :duration="2000"></uni-popup-message>
    </uni-popup>
  </div>
</template>

<script>
import api from '@/utils/requests.js'
import uniPopupDialog from '@/components/uni-popup-dialog/uni-popup-dialog.vue'
import uniPopupMessage from '@/components/uni-popup-message/uni-popup-message.vue'
import echarts from '@/pages/echarts/index'

export default {
  name: "index",
  components:{
    echarts,
    uniPopupDialog,
    uniPopupMessage
  },
  data(){
    return {
      cid:'',
      list: {
        users: {

        }
      },
      activityLog: [],
      msg: '',
      type: '',
      charts: {
        xAxis: [],
        yAxis: []
      }
    }
  },
  created() {
    // console.log('creat')
    // uni.getStorage({
    //   key: 'cid',
    //   success: function (result) {
    //     console.log('123')
    //     console.log('result',result.data)
    //     this.cid=result.data
    //     this.getDetail()
    //   }
    // })
    // #ifdef H5
    this.cid = uni.getStorageSync('cid')
    // #endif
    // #ifdef MP-WEIXIN
    this.cid = uni.getStorageSync('cid').detail.index
    // #endif
    console.log(this.cid)
    this.getDetail()
    this.getMember()
  },
  methods: {
    // onLoad(option){
    //   this.cid = option.cid
    //   console.log(this.cid)
    //   this.getDetail()
    // },
    getDetail() {
      api({
        url: 'activitylog/loglist',
        method: 'get',
        params: {
          cid: this.cid
        }
      }).then(res => {
        // console.log(res.data)
        this.activityLog = res.data
      })
        uni.request({
          url: 'http://localhost:3000/club/userclubinfo',
          method: 'post',
          data: {
            cid: this.cid
          },
          success: (res) => {
            // console.log(res.data.data);
            this.list = res.data.data
            this.list.appImage = res.data.data.appImage.replace(/\\/g, '/')
            this.list.createAt = res.data.data.createAt.replace(/\//g, '-')
            // console.log(this.list)
            // var test = res.data.data[1].appImage
            // console.log(test)
            // var tests = test.replace(/\\/g, '/')
            // console.log(tests)
          }
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
    },
    sign(){
      this.$refs.popupDialog.open()
    },
    dialogConfirm(){
      // 确定按钮
      // console.log(this.cid)
      api({
        url: 'clubuser/addclubuser',
        method: 'post',
        data:{
          cid: this.cid
        }
      }).then(res => {
        // console.log(res)
        if (res.code == 20000){
          this.$refs.popupDialog.close()
        }
        if (res.code == 50000) {
          this.$refs.popupMessage.open()
          this.$refs.popupDialog.close()
          this.type = 'error'
          this.msg = res.message
        }
      })
    },
    dialogClose(){
      // 取消
      this.$refs.popupDialog.close()
      // done()
    },
    getMember() {
      api({
        url: 'clubmember/eaddnum',
        method: 'post',
        data:{
          cid: this.cid
        }
      }).then(res => {
        // console.log(res)
        this.charts.xAxis = res.xAxis
        this.charts.yAxis = res.yAxis
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
.myimg{
  /*width: 750rpx;*/
  /*height: 550rpx;*/
}
button{
  font-size: 13px;
}
image{
  width: 750rpx;
  height: 750rpx;
}
.left{
  padding: 10px 0px;
  width: 750rpx;
  height: 750rpx;
}

.right{
  padding: 10px 10px;
}
.wxflex{
  display: flex;
  flex-direction: column;
}
.right-font{
  font-size: 30rpx;
  font-weight: 500;
  color: #989898;
}
/*.flex-item {*/
/*  width: 30rpx;*/
/*}*/
/*#endif*/

/*#ifdef H5*/
.main{
  width: 80%;
}
button{
  font-size: 15px;
}
.myimg{
  width: 100%;
}

.left{
  padding: 30px 0px;
  width: 30%;
}

.right{
  padding: 30px 30px;
  display: flex;
  flex-direction: column;
}
.right-font{
  font-size: 14px;
  font-weight: 500;
  color: #989898;
}

.flex-item {

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

/deep/ .uni-card{
  margin: 0px;
  border-radius: 0px;
}
/deep/ .uni-border:after{
  border-radius: 0px;
}

</style>