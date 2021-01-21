<template>
  <div class="login">
    <view class="example-body">
      <view class="example-box">
        <uni-card title="登录" :isFull="true" isShadow='true'>
          <form>
            <view class="uni-form-item uni-column">
              <view class="title">用户名</view>
              <input class="uni-input" v-model="username" placeholder="用户名">
            </view>
            <view class="uni-form-item uni-column">
              <view class="title">密码</view>
              <input class="uni-input" v-model="password" placeholder="密码">
            </view>
            <view class="uni-btn-v">
              <button class="mybutton" plain="true" @click="login">登录</button>
              <button class="mybutton" plain="true" @click="regisiter">注册</button>
            </view>
          </form>
        </uni-card>
      </view>
    </view>
  </div>
</template>

<script>
import Index from "@/pages/index/index";
import api from '@/utils/requests.js'

export default {
  name: "login",
  components: {Index},
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$store.dispatch('user/login', {username: this.username, password: this.password}).then(
          () => {
            uni.navigateBack({
              delta: 1
            })
          }
      )
    },
    register() {
      api({
        url:'users/register'
      })
    }
  }
}
</script>

<style scoped>
.login {
  width: 50%;
  margin: 0 auto;
}
.uni-input{
  border: 1px solid #a2a2a2;
  border-radius: 5px;
}
.mybutton{
  line-height: 2.3;
  font-size: 14px;
}
</style>