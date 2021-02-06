<template>
  <div class="main">
    <!--    #ifdef H5-->
    <page-head title="申请加入社团"></page-head>
    <!--    #endif-->
    <div class="mycard">
      <form>
        <view class="uni-form-item uni-column">
          <view class="title">社团名称</view>
          <input class="myinput" v-model="cname" placeholder="社团名称">
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">指导教师</view>
          <input class="myinput" v-model="teacher" placeholder="指导教师">
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">社团简介</view>
          <input class="myinput" v-model="introduction" placeholder="社团简介">
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">社团Logo</view>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">申请照片</view>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">申请材料</view>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">值班表</view>
        </view>
      </form>
      <view class="uni-btn-v">
        <button class="mybutton" plain="true" @click="change">修改密码</button>
      </view>
    </div>
  </div>
</template>

<script>
export default {
name: "joinClub"
}
</script>

<style scoped>
.main {
  width: 750 rpx;
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

.mybutton {
  line-height: 2.3;
  font-size: 14px;
}

.uni-form-item .title{
  padding: 5px 0px;
}
</style>