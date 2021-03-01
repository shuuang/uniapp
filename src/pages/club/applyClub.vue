<template>
  <div class="main">
    <!--    #ifdef H5-->
    <page-head title="申请社团"></page-head>
    <!--    #endif-->
    <div class="mycard">
      <form>
        <view class="uni-form-item uni-column">
          <view class="title">社团名称</view>
          <input class="uni-input myinput" v-model="cname" placeholder="社团名称">
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">指导教师</view>
          <input class="uni-input myinput" v-model="teacher" placeholder="指导教师">
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">社团简介</view>
          <input class="uni-input myinput" v-model="introduction" placeholder="社团简介">
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">社团Logo</view>
          <lfile ref="img" @up-success="onSuccess" reqUrl='http://localhost:3000/club/upload'
                 filed="file"></lfile>
          <view class="padding">
            <!--              #ifdef MP-WEIXIN-->
            <button class="uploadButton" @tap="UploadappImage">上传</button>
            <p class="uploadP">
              {{ appImage }}
            </p>
            <!--              #endif-->
            <!--              #ifdef H5-->
            <img style="width: 21%;margin-right: 10px" :src=appImage />
            <button class="uploadButton" @tap="UploadappImage">+</button>
            <!--              #endif-->
          </view>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">申请照片</view>
<!--          <img v-show="img == true " :src="'http://localhost:3000/' + img" />-->
          <view class="padding">
            <!--              #ifdef MP-WEIXIN-->
            <button class="uploadButton" @tap="Uploadimg">上传</button>
            <p class="uploadP">
              {{img}}
            </p>
            <!--              #endif-->
            <!--              #ifdef H5-->
            <img style="width: 21%;margin-right: 10px" :src=img />
            <button class="uploadButton" @tap="Uploadimg">+</button>
            <!--              #endif-->
          </view>

<!--          <view class="content">-->
<!--            <uploadFile reqUrl="http://localhost:3000/club/upload"-->
<!--                        reqMode="await"-->
<!--                        ref="uploadimg"-->
<!--                        filed="img"-->
<!--                        multiple="true">-->
<!--            </uploadFile>-->
<!--          </view>-->
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">申请材料</view>
          <view class="padding">
            <!--              #ifdef MP-WEIXIN-->
            <button class="uploadButton" @tap="Uploadafile">上传</button>
            <p class="uploadP">
              {{file}}
            </p>
            <!--              #endif-->
            <!--              #ifdef H5-->
            <img style="width: 21%;margin-right: 10px" :src=file />
            <button class="uploadButton" @tap="Uploadafile">+</button>
            <!--              #endif-->
          </view>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">值班表</view>
          <view class="padding">
            <!--              #ifdef MP-WEIXIN-->
            <button class="uploadButton" @tap="Uploadduty">上传</button>
            <p class="uploadP">
              {{duty}}
            </p>
            <!--              #endif-->
            <!--              #ifdef H5-->
            <img style="width: 21%;margin-right: 10px" :src=duty />
            <button class="uploadButton" @tap="Uploadduty">+</button>
            <!--              #endif-->
          </view>
        </view>
      </form>
      <view class="uni-btn-v">
        <button class="mybutton" plain="true" @click="submitApply">提交申请</button>
      </view>
    </div>
    <uni-popup id="popupMessage" ref="popupMessage" type="message">
      <uni-popup-message :type="type" :message="msg" :duration="2000"></uni-popup-message>
    </uni-popup>
  </div>
</template>

<script>
import PageHead from "@/components/page-head/page-head";
import uploadFile from '@/components/upload'
import api from "@/utils/requests";
import lfile from '@/components/l-file'
import uniPopupMessage from '@/components/uni-popup-message/uni-popup-message'

export default {
  name: "applyClub",
  components: {
    PageHead,
    uploadFile,
    lfile,
    uniPopupMessage
  },
  data() {
    return {
      cname: '',
      teacher: '',
      introduction: '',
      appImage: '',
      img: '',
      file: '',
      duty: '',
      type: '',
      msg: ''
    }
  },
  // updated() {
  //   appImage(){
  //
  //   }
  // },
  methods: {
    submitApply() {
      api({
        url: 'club/appClub',
        method: 'post',
        data: {
          cname: this.cname,
          teacher: this.teacher,
          introduction: this.introduction,
          appImage: this.appImage,
          img: this.img,
          file: this.file,
          duty: this.duty
        }
      }).then(res => {
        // console.log(res)
        if (res.code === 20000){
          this.cname = ''
          this.teacher = ''
          this.introduction = ''
          this.appImage = ''
          this.img = ''
          this.file = ''
          this.duty = ''
          this.msg = "已提交创建社团申请"
          this.type = "success"
          this.$refs.popupMessage.open()
        }
      })
    },
    UploadappImage() {
      this.$refs.img.upload({
        url: 'http://127.0.0.1:3000/club/upload',
        name: 'file',
        header: {"x-token": 'appImage'}
        // data: {
        //   filetype: 'img'
        // }
      })
    },
    onSuccess(res){
      if (res.data.code === 20000){
        // console.log(res)
        if (res.data.type === 'appImage'){
          this.appImage = 'http://localhost:3000/' + res.data.data.path
          console.log(this.appImage)
        }
        if (res.data.type === 'img'){
          this.img = 'http://localhost:3000/' + res.data.data.path
          console.log(this.img)
        }
        if (res.data.type === 'file'){
          this.file = 'http://localhost:3000/' + res.data.data.path
          console.log(this.file)
        }
        if (res.data.type === 'duty'){
          this.duty = 'http://localhost:3000/' + res.data.data.path
          console.log(this.duty)
        }
      }
    },
    Uploadimg() {
      this.$refs.img.upload({
        url: 'http://127.0.0.1:3000/club/upload',
        name: 'file',
        header: {"x-token": 'img'}
      })
    },
    // imgSuccess(res){
    //   console.log('img',res)
    // },
    Uploadafile() {
      this.$refs.img.upload({
        url: 'http://127.0.0.1:3000/club/upload',
        name: 'file',
        header: {"x-token": 'file'}
      })
    },
    Uploadduty() {
      this.$refs.img.upload({
        url: 'http://127.0.0.1:3000/club/upload',
        name: 'file',
        header: {"x-token": 'duty'}
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

.mycard {
  background-color: rgba(0, 0, 0, 0);
  padding: 10px;
  /*width: 750rpx;*/
}
.uploadButton {
  line-height: 2;
  /*width: 400rpx;*/
  margin-left: 0px;
  font-size: 14px;
}
.myinput {
  border: 1px solid black;
  height: 10px;
  border-radius: 5px;
  padding: 5px;
}
.uploadP{
  font-size: 10px;
}
/*#endif*/

/*#ifdef H5*/
.main {
  width: 50%;
}

.mycard {
  background-color: #fff;
  padding: 20px;
  box-shadow: 11px -8px 7px #888888;
}
.uploadButton {
  display: inline-block;
  line-height: 5;
  width: 21%;
  margin-left: 0px;
  border: 1px dashed #665959;
  font-size: 30px;
  font-weight: 200;
  background-color: #fcfcfc;
}
.myinput {
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

.uni-form-item .title {
  padding: 5px 0px;
}
/deep/ .uni-page-head-title {
  color: black;
  font-weight: 300;
  font-size: 18px;
}
</style>