<template>
  <div class="login">
    <div class="mycard">
      <!--    #ifdef H5-->
      <p style="font-size: 16px">{{ title }}</p>
      <!--    #endif-->
          <form>
            <view class="uni-form-item uni-column">
              <view class="title">学号</view>
              <input class="uni-input" v-model="username" placeholder="学号">
            </view>
            <view class="uni-form-item uni-column">
              <view class="title">密码</view>
              <input type="password" class="uni-input" v-model="password" placeholder="密码">
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
<!--                <input class="uni-input" v-model="birthday" placeholder="出生日期">-->
                <view class="uni-list-cell-db">
                  <picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
                    <uni-easyinput v-model="birthday" placeholder="请输入出生日期"> {{ birthday }}
                    </uni-easyinput>
                  </picker>
                </view>
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
      <!--            #ifdef MP-WEIXIN-->
          <button v-show="flag==true" style="line-height: 1.4" plain="true" @click="wxLogin">
            <uni-icons type="weixin" size="20"></uni-icons>
          </button>
      <!--            #endif-->
    </div>
    <uni-popup id="popupMessage" ref="popupMessage" type="message">
      <uni-popup-message :type="type" :message="msg" :duration="2000"></uni-popup-message>
    </uni-popup>
  </div>
</template>

<script>
import Index from "@/pages/index/index";
import api from '@/utils/requests.js'
import uniPopupMessage from '@/components/uni-popup-message/uni-popup-message'
import {getInfo} from "@/api/user";
function getDate(type) {
  const date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (type === 'start') {
    year = year - 30;
  } else if (type === 'end') {
    year = year;
  }
  month = month > 9 ? month : '0' + month;
  ;
  day = day > 9 ? day : '0' + day;

  return `${year}-${month}-${day}`;
}
export default {
  name: "login",
  components: {
    uniPopupMessage
  },
  data() {
    return {
      startDate: getDate('start'),
      endDate: getDate('end'),
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
      current: 0,
      msg: '',
      type: '',
      openid: ''
    }
  },
  methods: {
    login() {
      api({
        url: 'users/login',
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        // console.log(res)
        if (res.code == 50000) {
          this.$refs.popupMessage.open()
          this.type = 'error'
          this.msg = res.message
        }
        if (res.code == 20000) {
          this.$refs.popupMessage.open()
          this.type = 'success'
          this.msg = res.message
        }
        uni.setStorage({
          key: 'token',
          data: res.data.token,
          success: () => {
            uni.$emit('usersnameChange', false)
            let pages = getCurrentPages();
            // #ifdef H5
            if (pages.length>1){
              uni.navigateBack({
                delta: 1,
                success: () => {
                  let beforePage = pages[pages.length - 2];
                  console.log(pages)
                  beforePage.usersInfo();//执行前一个页面的onload方法
                  beforePage.getClubList()
                }
              })
            }
            // #endif
            // #ifdef MP-WEIXIN
            // uni.reLaunch({
            //   url: '/pages/tabBar/personal/index'
            // })
            uni.switchTab({
              url: '/pages/tabBar/personal/index',
              // delta: 1,
              success: ()=>{
                // let beforePage = pages[2];
                // console.log(pages)
                // beforePage.usersInfo()
                if (this.openid) {
                  // console.log('无')
                  this.addOpenid()
                }
                uni.$emit("personal", '5555')
              }
            })
            // console.log(this.openid)
            // #endif
            // history.back()
          }
        })
      })
      // this.$store.dispatch('user/login', {username: this.username, password: this.password}).then(
      //     () => {
      //
      //       uni.navigateBack({
      //         delta: 1
      //       })
      //     }
      // )
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
          this.username = ''
          this.password = ''
          this.realname = ''
          this.email = ''
          this.wechat = ''
          this.qq = ''
          this.phone = ''
          this.home = ''
          this.birthday = ''
          this.classes = ''
          this.nation = ''
          this.gender = ''
          this.$refs.popupMessage.open()
          this.msg = res.message
          this.type = 'seccess'
        }
        if (res.code === 50000) {
          this.$refs.popupMessage.open()
          this.type = 'error'
          this.msg = res.message
        }
      })
    },
    goRegisiter() {
      // console.log('去注册')
      this.flag = false
      this.title = "注册"
    },
    goLogin() {
      // console.log('去登录')
      this.flag = true
      this.title = "登录"
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
    },
    bindDateChange: function (e) {
      // console.log(e)
      this.birthday = e.detail.value
    },
    wxLogin() {
      // console.log('微信登录')
      var that = this
      wx.login({
        success (res) {
          // console.log(res)
          if (res.code) {
            uni.request({
              url: 'http://localhost:3000/users/wechat', //仅为示例，并非真实接口地址。
              method: 'post',
              data: {
                code: res.code
              },
              // header: {
              //   'X-Token': uni.getStorageSync('token')
              // },
              success: (result) => {
                // console.log(result.data);
                var res = result.data
                if (res.code == 20000) {
                  that.$refs.popupMessage.open()
                  that.type = 'success'
                  that.msg = '登录成功'
                  // console.log(res.data.token)
                  uni.setStorage({
                    key: 'token',
                    data: res.data.token,
                    success: () => {
                      uni.$emit('usersnameChange', false)
                      let pages = getCurrentPages();
                      // #ifdef H5
                      if (pages.length > 1) {
                        uni.navigateBack({
                          delta: 1,
                          success: () => {
                            let beforePage = pages[pages.length - 2];
                            console.log(pages)
                            beforePage.usersInfo();//执行前一个页面的onload方法
                            beforePage.getClubList()
                          }
                        })
                      }
                      // #endif
                      // #ifdef MP-WEIXIN
                      uni.switchTab({
                        url: '/pages/tabBar/personal/index',
                        // delta: 1,
                        success: () => {
                          // let beforePage = pages[2];
                          // console.log(pages)
                          // beforePage.usersInfo()
                          uni.$emit("personal", '5555')
                        }
                      })
                      // #endif
                    }
                  })
                }
                if (res.code == 50000){
                  that.$refs.popupMessage.open()
                  that.type = 'warn'
                  that.msg = '没有找到该微信号，登陆后自动绑定用户'
                  that.openid = res.data
                  // console.log(res.data)
                }
              }
            });
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    addOpenid() {
      uni.request({
        url: 'http://localhost:3000/users/updateuser',
        method: 'post',
        header: {
          'X-Token': uni.getStorageSync('token')
        },
        data: {
          openid: this.openid
        },
        success: result => {
          console.log(result)
          if (result.data.code == 20000) {
            this.msg = "绑定成功"
            this.type = "success"
            this.$refs.popupMessage.open()
          }
          if (result.data.code == 50000) {
            this.msg = "绑定失败"
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
.login {
  width: 750rpx;
  margin: 0 auto;
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
.login {
  width: 50%;
  margin: 0 auto;
}
.mycard{
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 10px 4px #888888;
}
.myinput{
  background-color: white;
  border: 1px solid #494949;
  /*height: 10px;*/
  border-radius: 5px;
  padding: 5px;
}
/*#endif*/

.uni-input {
  border: 1px solid #c8c7cc;
  border-radius: 4px;
}

.mybutton {
  line-height: 2.3;
  font-size: 14px;
}
</style>