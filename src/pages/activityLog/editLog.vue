<template>
  <div class="main">
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
                <view class="uni-input">{{ array[index].aName }}</view>
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
          <view class="content">
            <uploadFile reqUrl="http://localhost:3000/activitylog/logupload"
                        reqMode="await"
                        ref="upload"
                        filed="img"
                        multiple="true">
            </uploadFile>
          </view>
        </view>
      </view>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          活动视频
        </view>
        <view class="uni-list-cell-db">
          <view class="content">
            <uploadFile reqUrl="http://localhost:3000/activitylog/logupload"
                        reqMode="await"
                        ref="uploadvideo"
                        filed="img"
                        multiple="true">
            </uploadFile>
          </view>
        </view>
      </view>
    </view>
    <button @click="formSubmit">提交</button>
  </div>
</template>

<script>
import uploadFile from '@/components/upload'
import api from "@/utils/requests";

export default {
  name: "editLog",
  components: {
    uploadFile
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
    formSubmit() {
      this.imgUpload()
      this.videoUpload()
      api({
        url: 'activitylog/addlog',
        method: 'post',
        data: {
          aid: this.aid,
          img: {img:this.img},
          video: {video: this.video},
          alintroduction:this.alintroduction,
          cid:this.cid
        }
      }).then(res => {
        console.log(res)
      })
      // console.log('alin', this.alintroduction, 'img',this.img, 'aid', this.aid, 'cid', this.cid, 'video',this.video)
    },
    imgUpload(e) {
      this.$refs.upload.uploadFile(res => {
        if (res.code == 20000) {
          // console.log(res)
          // this.img = res.data
          res.data.forEach(item => {
            this.img.push('http://localhost:3000/'+item.path)
          })
          // console.log(this.img)
        } else {

        }
      })
    },
    videoUpload(e) {
      this.$refs.uploadvideo.uploadFile(res => {
        if (res.code == 20000) {
          res.data.forEach(item => {
            this.video.push('http://localhost:3000/'+item.path)
          })
        } else {

        }
      })
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

.uni-list-cell {
  padding: 20px 0px;
  //text-align: center;
}

.uni-list-cell-left {
  font-weight: 600;
  /*width: 150px;*/
}
</style>