<template>
  <div class="main">
<!--    <view class="uni-title uni-common-pl">普通选择器</view>-->
    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          社团名称
        </view>
        <view class="uni-list-cell-db">
          {{ list.cname }}
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          社长
        </view>
        <view class="uni-list-cell-db">
          {{ list.users.realname}}
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          指导教师
        </view>
        <view class="uni-list-cell-db">
          {{ list.teacher}}
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          社团图片
        </view>
        <view class="uni-list-cell-db">
          <image class="myimg" :src="list.appImage"></image>
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          社团创建时间
        </view>
        <view class="uni-list-cell-db">
          {{list.creatAt}}
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          社团简介
        </view>
        <view class="uni-list-cell-db">
          {{ list.introduction}}
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
  data(){
    return {
      cid:'',
      list: {
        users: {

        }
      },
      activityLog: []
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
        console.log(res.data)
        this.activityLog = res.data
      })
        uni.request({
          url: 'http://localhost:3000/club/userclubinfo',
          method: 'post',
          data: {
            cid: this.cid
          },
          success: (res) => {
            console.log(res.data.data);
            this.list = res.data.data
            this.list.appImage='http://localhost:3000/' + res.data.data.appImage.replace(/\\/g, '/')
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
  width: 550rpx;
  height: 550rpx;
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

/deep/ .uni-card{
  margin: 0px;
  border-radius: 0px;
}
/deep/ .uni-border:after{
  border-radius: 0px;
}
</style>