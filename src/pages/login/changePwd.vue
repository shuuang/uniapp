<template>
  <div class="main">
    <div class="mycard">
      <!--    #ifdef H5-->
      <p style="font-size: 16px">修改密码</p>
      <!--    #endif-->
      <form>
        <view class="uni-form-item uni-column">
          <view class="title">旧密码</view>
          <input type="password" class="myinput" v-model="password" placeholder="旧密码">
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">新密码</view>
          <input type="password" class="myinput" v-model="newpassword" placeholder="新密码">
        </view>
      </form>
      <view class="uni-btn-v">
        <button class="mybutton" plain="true" @click="change">修改密码</button>
      </view>
    </div>
<!--    <view class="example-body">-->
<!--      <view class="example-box">-->
<!--        <uni-card title="修改密码" :isFull="true" isShadow='true'>-->
<!--          <form>-->
<!--            <view class="uni-form-item uni-column">-->
<!--              <view class="title">旧密码</view>-->
<!--              <input class="uni-input" v-model="password" placeholder="旧密码">-->
<!--            </view>-->
<!--            <view class="uni-form-item uni-column">-->
<!--              <view class="title">新密码</view>-->
<!--              <input class="uni-input" v-model="newpassword" placeholder="新密码">-->
<!--            </view>-->
<!--          </form>-->
<!--          <view class="uni-btn-v">-->
<!--            <button class="mybutton" plain="true" @click="change">修改密码</button>-->
<!--          </view>-->
<!--        </uni-card>-->
<!--      </view>-->
<!--    </view>-->
    <uni-popup id="popupMessage" ref="popupMessage" type="message">
      <uni-popup-message :type="type" :message="msg" :duration="2000"></uni-popup-message>
    </uni-popup>
  </div>
</template>

<script>
import api from '@/utils/requests.js'
import uniPopupMessage from '@/components/uni-popup-message/uni-popup-message'

export default {
  name: "changePwd",
  components: {
    uniPopupMessage
  },
  data() {
    return {
      password: '',
      newpassword: '',
      msg: '',
      type: ''
    }
  },
  methods: {
    change() {
      // api({
      //   url: 'users/repassword',
      //   method: 'post',
      //   data: {
      //     password: this.password,
      //     newpassword: this.newpassword
      //   }
      // }).then(res => {
      //   // console.log(res)
      //   if (res.code == 20000) {
      //     this.$refs.popup.open()
      //     this.password = ''
      //     this.newpassword = ''
      //   }
      // })
      // api.post('users/repassword', {password: this.password, newpassword: this.newpassword}).then(res => {
      //   // console.log(res)
      //   if (res.code == 20000) {
      //     this.$refs.popup.open()
      //     this.password = ''
      //     this.newpassword = ''
      //   }
      // })
      console.log('1')
      uni.request({
        url: 'http://localhost:3000/users/repassword',
        method: 'post',
        header: {
          'X-Token': uni.getStorageSync('token')
        },
        data: {
          password: this.password,
          newpassword: this.newpassword
        },
        success: res => {
          // console.log(res)
          console.log(2)
          if (res.data.code == 20000) {
            this.msg = res.data.message
            this.type = "success"
            this.$refs.popupMessage.open()
            this.password = ''
            this.newpassword = ''
            uni.removeStorageSync('token')
            // #ifdef H5
            location.reload()
            uni.navigateTo({
              url: '/pages/index/index'
            })
            // #endif
            // #ifdef MP-WEIXIN
            uni.reLaunch({
              url: '/pages/tabBar/index/index'
            });
            // #endif
            location.reload()
          }
          if (res.data.code === 50000) {
            this.msg = res.data.message
            this.type = "error"
            this.$refs.popupMessage.open()
          }
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
.mycard{
  background-color: rgba(0,0,0,0);
  padding: 20px;
}
.myinput{
  border: 1px solid black;
  /*height: 10px;*/
  border-radius: 5px;
  padding: 5px;
}
/*#endif*/

/*#ifdef H5*/
.main {
  width: 50%;
}
.mycard{
  background-color: #fff;
  padding: 20px;
  box-shadow: 10px 10px 5px #888888;
}
.myinput{
  background-color: white;
  border: 1px solid #494949;
  /*height: 10px;*/
  border-radius: 5px;
  padding: 5px;
}
/*#endif*/

.main {
  /*width: 80%;*/
  margin: 0 auto;
}

.uni-input {
  border: 1px solid #a2a2a2;
  border-radius: 5px;
}

.mybutton {
  line-height: 2.3;
  font-size: 14px;
}

.uni-form-item .title{
  padding: 5px 0px;
}
</style>