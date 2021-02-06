<template>
  <div class="main">
    <view class="example-body">
      <uni-card :is-shadow="true" :title="list.realname" mode="style" thumbnail="/static/cardbg.png"
                :extra="'班级：' + list.classes +' '+ '学号：' + list.stuNumber" @click="info">
        <text class="content-box-text"></text>
      </uni-card>
    </view>
    <view class="list">
      <uni-section title="已加入社团" type="line"></uni-section>
      <uni-list-item clickable @click="editLog(item.cid,item.club.cname)" v-for="item in club" showArrow :title="item.club.cname" rightText="右侧文字"/>
    </view>
    <view class="list">
      <uni-list-item clickable @click="applyClub" showArrow title="申请创建社团" rightText="右侧文字"/>
      <uni-list-item clickable @click="joinClub" showArrow title="申请加入社团" rightText="右侧文字"/>
      <uni-list-item clickable @click="changepwd" showArrow title="修改密码" rightText="右侧文字"/>
    </view>
  </div>
</template>

<script>
import api from '@/utils/requests.js'

export default {
  name: "index",
  data() {
    return {
      list: {
        realname: '未登录',
        classes: '班级',
        stuNumber: ''
      },
      token: '',
      club: []
    }
  },
  created() {
    this.getToken()
    if (this.token) {
      this.usersInfo()
      this.getClubList()
    }else {
      uni.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  methods: {
    usersInfo() {
      api({
        url: 'users/usersinfo',
        method: 'get'
      }).then(res => {
        // console.log(res)
        this.list = res.data
        this.list.classes = res.data.class
      })
    },
    getToken() {
      uni.getStorage({
        key: 'token',
        success: (res) => {
          console.log(res.data)
          this.token = res.data
        }
      })
    },
    getClubList() {
      api({
        url: 'clubuser/userclublist',
        method: 'get'
      }).then(res => {
        console.log(res)
        this.club = res.data
      })
    },
    changepwd() {
      uni.redirectTo({
        url: '/pages/login/changePwd'
      })
      // api.post('users/repassword',{newpassword: this.newpassword})
    },
    info(){
      console.log('用户信息')
      uni.navigateTo({
        url: '/pages/personal/info'
      })
    },
    applyClub(){
      console.log('申请社团')
      uni.navigateTo({
        url: '/pages/club/applyClub'
      })
    },
    joinClub(){
      console.log('加入社团')
    },
    editLog(cid,cname){
      uni.navigateTo({
        url: `/pages/activityLog/editLog?cid=${cid}&cname=${cname}`
      })
    }
  }
}
</script>

<style scoped>
/*#ifdef MP-WEIXIN*/
.main {
  width: 750 rpx;
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

.list {
  padding: 10px 15px;
}
</style>