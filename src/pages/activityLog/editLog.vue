<template>
  <div class="main">
    <!--    #ifdef H5-->
    <page-head title="社团活动记录编辑"></page-head>
    <!--    #endif-->
    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          活动名称
        </view>
        <view class="uni-list-cell-db">
          <input v-model="alintroduction" placeholder="请输入活动名称"/>
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          社团名称
        </view>
        <view class="uni-list-cell-db">
          {{ cname }}
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          活动名称
        </view>
        <view class="uni-list-cell-db">
          <view class="uni-list-cell-db">
            <view class="uni-list-cell-db">
              <picker @change="bindPickerChange" :value="index" :range="array" range-key="aName">
                <view class="uni-input cname">{{ array[index].aName }}</view>
              </picker>
            </view>
          </view>
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          活动图片
        </view>
        <view class="uni-list-cell-db">
          <lfile ref="lFileimg" @up-success="imgSuccess" reqUrl='http://localhost:3000/activitylog/logupload'
                 filed="img"></lfile>
          <view class="padding">
            <!--              #ifdef MP-WEIXIN-->
            <button class="mybutton" @tap="imgUpload">上传</button>
            <p class="uploadP" v-for="item in img">
              {{ item }}
            </p>
            <!--              #endif-->
            <!--              #ifdef H5-->
            <img style="width: 21%;margin-right: 10px" v-for="item in img" :src="'http://localhost:3000/'+item"/>
            <button class="mybutton" @tap="imgUpload">+</button>
            <!--              #endif-->
          </view>
        </view>
        <!--        <view class="uni-list-cell-db">-->
        <!--          <view class="content">-->
        <!--            <uploadFile reqUrl="http://localhost:3000/activitylog/logupload"-->
        <!--                        reqMode="await"-->
        <!--                        ref="upload"-->
        <!--                        filed="img"-->
        <!--                        multiple="true">-->
        <!--            </uploadFile>-->
        <!--          </view>-->
        <!--        </view>-->
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          活动视频
        </view>
        <view class="uni-list-cell-db">
          <!--          <lfile ref="lFilevideo" @up-success="videoSuccess" reqUrl='http://localhost:3000/activitylog/logupload'-->
          <!--                 filed="img"></lfile>-->
          <view class="padding text-center">
            <view class="padding">
              <!--              #ifdef MP-WEIXIN-->
              <button class="mybutton" @tap="videoUpload">上传</button>
              <p class="uploadP" v-for="videos in video">
                {{ videos }}
              </p>
              <!--              #endif-->
              <!--              #ifdef H5-->
              <video v-for="videos in video" :src="'http://localhost:3000/'+videos"></video>
              <button class="mybutton" @tap="videoUpload">+</button>
              <!--              #endif-->
            </view>
          </view>
        </view>
        <!--        <view class="uni-list-cell-db">-->
        <!--          <view class="content">-->
        <!--            <uploadFile reqUrl="http://localhost:3000/activitylog/logupload"-->
        <!--                        reqMode="await"-->
        <!--                        ref="uploadvideo"-->
        <!--                        filed="img"-->
        <!--                        multiple="true">-->
        <!--            </uploadFile>-->
        <!--          </view>-->
        <!--        </view>-->
      </view>
    </view>
    <button @click="formSubmit">提交</button>
  </div>
</template>

<script>
import PageHead from "@/components/page-head/page-head";
import uploadFile from '@/components/upload'
import api from "@/utils/requests";
import lfile from '@/components/l-file'

export default {
  name: "editLog",
  components: {
    uploadFile,
    lfile
  },
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    // console.log(option); //打印出上个页面传递的参数。
    this.cid = option.cid
    this.cname = option.cname
  },
  data() {
    return {
      img: [],
      alintroduction: '',
      aid: '',
      cid: '',
      video: [],
      cname: '',
      array: [{
        aName: ''
      }],
      index: 0
    }
  },
  created() {
    this.getActivity()
  },
  methods: {
    imgSuccess(res) {
      console.log('上传成功回调', JSON.stringify(res));
      console.log(res)
      if (res.data.code === 20000) {
        // this.img = this.img.concat(res.data.data[0].path)
        // console.log(this.img)
        var list = res.data.data
        if (res.data.file === "img") {
          list.forEach(item => {
            this.img = this.img.concat(item.path)
          })
          // this.img = this.img.concat(res.data.data[0].path)
          console.log(this.img)
        } else {
          list.forEach(item => {
            this.video = this.video.concat(item.path)
          })
          console.log(this.video)
        }

      }
      // uni.showToast({
      //   title: JSON.stringify(res),
      //   icon: 'none'
      // })
    },
    videoSuccess(res) {
      console.log('上传成功回调', JSON.stringify(res));
      console.log(res)
      if (res.data.code === 20000) {
        this.video = this.video.concat(res.data.data[0].path)
        console.log(this.video)
      }
      // uni.showToast({
      //   title: JSON.stringify(res),
      //   icon: 'none'
      // })
    },
    formSubmit() {
      // this.imgUpload()
      // this.videoUpload()
      // setTimeout(() => {
      console.log('alin', this.alintroduction, 'img', this.img, 'aid', this.aid, 'cid', this.cid, 'video', this.video)
      api({
        url: 'activitylog/addlog',
        method: 'post',
        data: {
          aid: this.aid,
          img: {img: this.img},
          video: {video: this.video},
          alintroduction: this.alintroduction,
          cid: this.cid
        }
      }).then(res => {
        console.log(res)
        if (res.code === 20000) {
          this.aid = ""
          this.img = []
          this.video = []
          this.alintroduction = ''
        }
      })
      // },1000)
    },
    imgUpload(e) {
      this.$refs.lFileimg.upload({
        //非真实地址，记得更换,调试时ios有跨域，需要后端开启跨域并且接口地址不要使用http://localhost/
        url: 'http://127.0.0.1:3000/activitylog/logupload',
        //默认file,上传文件的key
        name: 'img',
        // header: {'Authorization':'token'},
        //...其他参数
        header: {"x-token": 'img'}
      });
      // this.$refs.upload.uploadFile(res => {
      //   if (res.code == 20000) {
      //     // console.log(res)
      //     // this.img = res.data
      //     res.data.forEach(item => {
      //       this.img.push('http://localhost:3000/' + item.path)
      //     })
      //     // console.log(this.img)
      //   } else {
      //
      //   }
      // })
    },
    videoUpload(e) {
      // console.log('video')
      this.$refs.lFileimg.upload({
        //非真实地址，记得更换,调试时ios有跨域，需要后端开启跨域并且接口地址不要使用http://localhost/
        url: 'http://127.0.0.1:3000/activitylog/logupload',
        //默认file,上传文件的key
        name: 'img',
        // header: {'Authorization':'token'},
        //...其他参数
        header: {"x-token": 'file'}
      });
      // this.$refs.uploadvideo.uploadFile(res => {
      //   if (res.code == 20000) {
      //     res.data.forEach(item => {
      //       this.video.push('http://localhost:3000/' + item.path)
      //     })
      //   } else {
      //
      //   }
      // })
    },
    bindPickerChange: function (e) {
      // console.log(e)
      console.log('picker发送选择改变，携带值为：' + e.detail.value)
      this.index = e.detail.value
      // this.cid = e.detail
      // console.log(this.array[this.index].aid)
      this.aid = this.array[this.index].aid
    },
    getActivity() {
      api({
        url: 'activity/activitylist',
        method: 'get'
      }).then(res => {
        console.log(res)
        this.array = res.data
        this.aid = this.array[this.index].aid
        // var list = res.data
        // list.forEach(item => {
        // console.log(item)
        // item.club = item.club.cname
        // })
        // this.array = list
        // console.log(this.array)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  background: #F5F5F5;
}

/*#ifdef MP-WEIXIN*/
.main {
  width: 750rpx;
}

.uni-list {
  //width: 750rpx;
}

.mybutton {
  //color: red;
  line-height: 2;
  width: 400rpx;
  margin-left: 0px;
  font-size: 14px;
  //border: 1px dashed #665959;
  //font-size: 30px;
  //font-weight: 200;
  //background-color: #fcfcfc;
}

.uploadP {
  font-size: 10px;
}

/*#endif*/

/*#ifdef H5*/
.main {
  width: 80%;
}

.mybutton {
  //color: red;
  display: inline-block;
  line-height: 5.5;
  width: 15%;
  margin-left: 0px;
  border: 1px dashed #665959;
  font-size: 30px;
  font-weight: 200;
  background-color: #fcfcfc;
}

/*#endif*/

.main {
  /*width: 80%;*/
  margin: 0 auto;
}

.uni-list-cell {
  padding: 20px 0px;
  //text-align: center;
}

.uni-list-cell-left {
  font-weight: 600;
  /*width: 150px;*/
}

.cname {
  padding: 0px;
  font-size: 14px;
}

::v-deep .uni-page-head-title {
  color: black;
  font-weight: 300;
  font-size: 18px;
}
</style>