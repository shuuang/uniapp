<template>
  <div class="main">
    <!--    #ifdef H5-->
    <page-head title="申请社团"></page-head>
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
          <view class="content">
            <uploadFile reqUrl="http://localhost:3000/club/upload"
                        reqMode="await"
                        ref="uploadappImage"
                        filed="img"
                        multiple="true">
            </uploadFile>
          </view>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">申请照片</view>
          <view class="content">
            <uploadFile reqUrl="http://localhost:3000/club/upload"
                        reqMode="await"
                        ref="uploadimg"
                        filed="img"
                        multiple="true">
            </uploadFile>
          </view>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">申请材料</view>
          <view class="content">
            <uploadFile reqUrl="http://localhost:3000/club/upload"
                        reqMode="await"
                        ref="uploadfile"
                        filed="img"
                        multiple="true">
            </uploadFile>
          </view>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">值班表</view>
          <view class="content">
            <uploadFile reqUrl="http://localhost:3000/club/upload"
                        reqMode="await"
                        ref="uploadduty"
                        filed="img"
                        multiple="true">
            </uploadFile>
          </view>
        </view>
      </form>
      <view class="uni-btn-v">
        <button class="mybutton" plain="true" @click="submitApply">提交申请</button>
      </view>
    </div>
  </div>
</template>

<script>
import PageHead from "@/components/page-head/page-head";
import uploadFile from '@/components/upload'
import api from "@/utils/requests";

export default {
  name: "applyClub",
  components: {
    PageHead,
    uploadFile
  },
  data(){
    return {
      cname: '',
      teacher: '',
      introduction: '',
      appImage: '',
      img: '',
      file: '',
      duty: ''
    }
  },
  methods:{
    submitApply(){
      api({
        url: 'club/appClub',
        method: 'post',
        data:{
          cname: this.cname,
          teacher: this.teacher,
          introduction: this.introduction,
          appImage: this.appImage,
          img: this,
          file: '',
          duty: ''
        }
      })
    },
    UploadappImage(){
      this.$refs.uploadappImage.uploadFile(res => {
        if (res.code == 20000) {
          this.appImage = res.data
        } else {

        }
      })
    },
    Uploadimg(){
      this.$refs.uploadimg.uploadFile(res => {
        if (res.code == 20000) {
          this.img = res.data
        } else {

        }
      })
    },
    Uploadfile(){
      this.$refs.uploadfile.uploadFile(res => {
        if (res.code == 20000) {
          this.file = res.data
        } else {

        }
      })
    },
    Uploadduty(){
      this.$refs.uploadduty.uploadFile(res => {
        if (res.code == 20000) {
          this.duty = res.data
        } else {

        }
      })
    }
  }
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