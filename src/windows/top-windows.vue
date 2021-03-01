<template>
  <view class="top-window-header">
    <view class="left-header logo">
      <navigator class="logo" open-type="reLaunch" url="/pages/index/index">
        <img src="../static/association.png" mode="heightFix" ></img>
        <text></text>
<!--        <page-head :title="title"></page-head>-->
      </navigator>
    </view>
    <custom-tab-bar class="tab-bar-flex" direction="horizontal" :show-icon="false" :selected="current" @onTabItemTap="toSecondMenu" />
<!--    <uni-link href="https://uniapp.dcloud.io/" text="登录"></uni-link>-->
<!--    <uni-link href="https://uniapp.dcloud.io/" text="注册"></uni-link>-->
<!--    <button class="mybutton" size="mini" @click="login" v-show="islogin==true"><uni-icons type="person" size="25"></uni-icons></button>-->
<!--    <span v-show="islogin==false" @click="login">{{ usersname }}</span>-->
    <button class="mybutton" size="mini" @click="login">{{ usersname }}</button>
    <button class="mybutton" size="mini" @click="logout">注销</button>
    <uni-popup id="popupMessage" ref="popupMessage" type="message">
      <uni-popup-message :type="type" :message="msg" :duration="2000"></uni-popup-message>
    </uni-popup>
  </view>
</template>

<script>
import api from "@/utils/requests";
import {logout} from "@/api/user";
import uniPopupMessage from '@/components/uni-popup-message/uni-popup-message'

export default {
  data() {
    return {
      title: 'modal',
      selected: {
        component: 0,
        API: 1,
        extUI: 2,
        template: 3
      },
      current: 0,
      indexPage: [{
        tabBar: '/pages/tabBar/index/index',
        index: '/pages/index/index'
      },{
        tabBar: '/pages/tabBar/activity/activity',
        index: '/pages/activity/activity'
      }, {
        tabBar: '/pages/tabBar/personal/index',
        index: '/pages/personal/index'
      }],
      islogin: false,
      usersname: '登录',
      token: '',
      msg:'',
      type:''
    }
  },
  props: {
    matchLeftWindow: {
      type: Boolean
    },
    showLeftWindow: {
      type: Boolean
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        if ( this.showLeftWindow ) {
          let comp = newRoute.path.split('/')[2]
          this.current = this.selected[comp]
          for(const item of this.indexPage) {
            if (newRoute.path === item.tabBar) {
              uni.redirectTo({
                url: item.index
              })
            }
          }
        }
      }
    },
  },
  // created() {
  //   if (uni.getStorageSync('token')){
  //     this.islogin = true
  //   }
  // },
  mounted() {
    uni.$on('usersnameChange', res => {
      // this.islogin = res
      // console.log(this.islogin)
      this.usersInfo()
      // console.log(this.usersname)
    })
    uni.$emit('usersnameChange', false)
  },
  methods: {
    toSecondMenu(e) {
      const activeTabBar = '/' + e.pagePath
      for(const item of this.indexPage) {
        if (activeTabBar === item.tabBar) {
          uni.redirectTo({
            url: item.index
          })
        }
      }
    },
    login(){
      uni.navigateTo({
        url: '/pages/login/login'
      })
    },
    usersInfo() {
      api({
        url: 'users/usersinfo',
        method: 'get'
      }).then(res => {
        // console.log(res)
        this.usersname = res.data.realname
        // uni.setStorage({
        //   key: 'usersname',
        //   data: res.data.username
        // })
      })
    },
    logout(){
      logout().then(res=>{
        // console.log('注销')
        if (res.code == 20000){
          // console.log('zhuxiao')
          uni.removeStorageSync('token')
          // #ifdef H5
          uni.reLaunch({
            url: '/pages/index/index'
          })
          location.reload()
          // #endif
          uni.$emit('usersnameChange', false)
          this.msg = res.message
          this.type = "success"
          this.$refs.popupMessage.open()
        }
      })
    }
  }
}
</script>

<style>
.top-window-header {
  height: 60px;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  /*border-bottom: 1px solid #e1e1e1;*/
  /*background-color: rgba(255,255,255,0.4);*/
  background-color: #ffffff;
  color: #333;
}
.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
}
.logo image {
  height: 30px;
  width: 30px;
}
.logo text {
  margin-left: 8px;
}
.right-header {
  display: flex;
  flex-direction: row;
  color: #333;
}
.right-header-item {
  line-height: 25px;
  margin-left: 40px;
  cursor: pointer;
  font-size: 16px;
}
.active {
  color: #4cd964;
  border-bottom: 2px solid;
}
.tab-bar-flex {
  width: 360px;
}
/*/deep/ .uni-top-window uni-tabbar .uni-tabbar{*/
/*  background-color: rgba(255,255,255,0.4) !important;*/
/*}*/
.phone-link {
  padding-left: 20px;
  cursor: pointer;
}
.mybutton{
  background-color: rgba(0,0,0,0);
}
.mybutton:after{
  border: none;
}
</style>
