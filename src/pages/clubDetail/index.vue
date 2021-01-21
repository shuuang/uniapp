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
          社团图片
        </view>
        <view class="uni-list-cell-db">
          <image :src="list.appImage"></image>
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
    uni.getStorage({
      key: 'cid',
      success: function (res) {
        console.log(res.data);
      }
    });
  },
  methods: {
    // onLoad(option){
    //   this.cid = option.cid
    //   console.log(this.cid)
    //   this.getDetail()
    // },
    getDetail() {
      // api({
      //   url: 'club/userclubinfo',
      //   method: 'post',
      //   data: {
      //     cid: this.cid
      //   }
      // }).then(res => {
      //   console.log(res.data)
      //   this.list = res.data
      //   this.list.appImage='http://localhost:3000/' + res.data.appImage.replace(/\\/g, '/')
      // })
      uni.request({
        url: 'http://localhost:3000/club/userclubinfo',
        method: 'post',
        data: {
          cid: this.cid
        },
        success: (res) => {
          // console.log(res.data.data);
          this.list = res.data.data
          this.list.appImage='http://localhost:3000/' + res.data.data.appImage.replace(/\\/g, '/')
          // console.log(this.list)
          // var test = res.data.data[1].appImage
          // console.log(test)
          // var tests = test.replace(/\\/g, '/')
          // console.log(tests)
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