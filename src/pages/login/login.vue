<template>
  <div class="login">
    <view class="example-body">
      <view class="example-box">
        <uni-card :title="title" :isFull="true" isShadow='true'>
          <form>
            <view class="uni-form-item uni-column">
              <view class="title">学号</view>
              <input class="uni-input" v-model="username" placeholder="学号">
            </view>
            <view class="uni-form-item uni-column">
              <view class="title">密码</view>
              <input class="uni-input" v-model="password" placeholder="密码">
            </view>
            <span v-show="flag==false">
              <view class="uni-form-item uni-column">
                <view class="title">真实姓名</view>
                <input class="uni-input" v-model="realname" placeholder="真实姓名">
              </view>
              <view class="uni-form-item uni-column">
                <view class="title">邮箱</view>
                <input class="uni-input" v-model="email" placeholder="邮箱">
              </view>
              <view class="uni-form-item uni-column">
                <view class="title">微信</view>
                <input class="uni-input" v-model="wechat" placeholder="微信">
              </view>
              <view class="uni-form-item uni-column">
                <view class="title">QQ</view>
                <input class="uni-input" v-model="qq" placeholder="QQ">
              </view>
              <view class="uni-form-item uni-column">
                <view class="title">Tel</view>
                <input class="uni-input" v-model="phone" placeholder="Tel">
              </view>
              <view class="uni-form-item uni-column">
                <view class="title">住址</view>
                <input class="uni-input" v-model="home" placeholder="住址">
              </view>
              <view class="uni-form-item uni-column">
                <view class="title">出生日期</view>
                <input class="uni-input" v-model="birthday" placeholder="出生日期">
              </view>
              <view class="uni-form-item uni-column">
                <view class="title">班级</view>
                <input class="uni-input" v-model="classes" placeholder="班级">
              </view>
              <view class="uni-form-item uni-column">
                <view class="title">民族</view>
                <input class="uni-input" v-model="nation" placeholder="民族">
              </view>
              <view class="uni-form-item uni-column">
                <view class="title">性别</view>
                <view>
                  <radio-group @change="radioChange">
                      <label v-for="(item, index) in items" :key="item.value">
                          <radio :value="item.value" :checked="index === current"
                                 style="transform: scale(0.7)"/>{{ item.name }}
                      </label>
                  </radio-group>
                </view>
              </view>
            </span>
          </form>
          <view class="uni-btn-v">
            <button v-show="flag==true" class="mybutton" plain="true" @click="login">登录</button>
            <button v-show="flag==true" class="mybutton" plain="true" @click="goRegisiter">没有账号，需要注册</button>

            <button v-show="flag==false" class="mybutton" plain="true" @click="goLogin">已有账号，直接登录</button>
            <button v-show="flag==false" class="mybutton" plain="true" @click="register">注册</button>
          </view>
        </uni-card>
      </view>
    </view>
  </div>
</template>

<script>
import Index from "@/pages/index/index";
import api from '@/utils/requests.js'
import { getInfo } from "@/api/user";

export default {
  name: "login",
  components: {Index},
  data() {
    return {
      username: '',
      password: '',
      realname: '',
      email: '',
      wechat: '',
      qq: '',
      phone: '',
      home: '',
      birthday: '',
      classes: '',
      nation: '',
      gender: '',
      title: '登录',
      flag: true,
      items: [{
        value: '0',
        name: '男',
        checked: 'true'
      },
        {
          value: '1',
          name: '女'
        }
      ],
      current: 0
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
        url: 'users/register',
        method: 'post',
        data: {
          stuNumber: this.username,
          password: this.password,
          realname: this.realname,
          email: this.email,
          wechat: this.wechat,
          qq: this.qq,
          phone: this.phone,
          home: this.home,
          birthday: this.birthday,
          uclass: this.classes,
          nation: this.nation,
          gender: this.gender
        }
      }).then(res => {
        // console.log(res)
        if (res.code === 20000) {
          this.username = '',
          this.password = '',
          this.realname = '',
          this.email = '',
          this.wechat = '',
          this.qq = '',
          this.phone = '',
          this.home = '',
          this.birthday = '',
          this.classes = '',
          this.nation = '',
          this.gender = ''
        }
      })
    },
    goRegisiter() {
      // console.log('去注册')
      this.flag = false
    },
    goLogin() {
      // console.log('去登录')
      this.flag = true
    },
    radioChange: function (evt) {
      // console.log(evt.target.value)
      this.gender = evt.target.value
      // for (let i = 0; i < this.items.length; i++) {
      //   if (this.items[i].value === evt.target.value) {
      //     this.current = i;
      //     break;
      //   }
      // }
    }
  }
}
</script>

<style scoped>
.login {
  width: 50%;
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
</style>