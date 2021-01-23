<template>
  <div class="main">
    <view class="example-body">
      <uni-card :is-shadow="true" :title="list.realname" mode="style" thumbnail="/static/cardbg.png"
                :extra="list.classes" @click="clickCard">
        <text class="content-box-text"></text>
      </uni-card>
    </view>
  </div>
</template>

<script>
import api from '@/utils/requests.js'
import store from '@/store'
import getters from "@/store/getters";

export default {
  name: "index",
  data() {
    return {
      list: {
        realname: '未登录',
        classes: '班级'
      },
      token: ''
    }
  },
  mounted() {
    this.getToken()
    if (this.token) {
      this.usersInfo()
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
        // this.list.classes = res.data.class
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
</style>