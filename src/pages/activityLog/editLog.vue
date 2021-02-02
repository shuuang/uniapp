<template>
  <div>
    上传文件
    <view class="content">
      <uploadFile reqUrl="api/st-bin/DirectSaleContract_SaveContract"
                  reqMode="await"
                  ref="upload"
                  filed="formData.img"
                  multiple="true">
      </uploadFile>
    </view>
  </div>
</template>

<script>
import uploadFile from '@/common/components/upload'

export default {
  name: "editLog",
  components: {
    uploadFile
  },
  data(){
    return {
      formData: {
        img: ''
      }
    }
  },
  methods: {
    formSubmit(e){
      this.$refs.upload.uploadFile(Object.assign(formData),function(resp){
        if(resp.code == 200 ){

        }else{

        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  background: #F5F5F5;
}

</style>