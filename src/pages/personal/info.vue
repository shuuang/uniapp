<template>
  <div class="main">
    <view>
      <uni-forms :value="formData" ref="form" validate-trigger="bind" err-show-type="toast">
        <uni-group title="基本信息" top="0">
          <uni-forms-item style="margin-bottom: 0px;">
            <text v-show="flag == false" style="float: right;font-size: 13px;color: #03a9f4" @click="edit">编辑</text>
            <text v-show="flag == true" style="float: right;font-size: 13px;color: #03a9f4" @click="changeInfo">完成
            </text>
          </uni-forms-item>
          <uni-forms-item name="stuNumber" label="学号">
            <text> {{ formData.stuNumber }}</text>
          </uni-forms-item>
          <uni-forms-item name="realname" label="用户名">
            <uni-easyinput v-show="flag == true" type="text" :inputBorder="true" v-model="formData.realname"
                           placeholder="请输入用户名"></uni-easyinput>
            <text v-show="flag == false"> {{ formData.realname }}</text>
          </uni-forms-item>
          <uni-forms-item name="classes" label="班级">
            <uni-easyinput v-show="flag == true" type="text" :inputBorder="true" v-model="formData.classes"
                           placeholder="请输入班级"></uni-easyinput>
            <text v-show="flag == false"> {{ formData.classes }}</text>
          </uni-forms-item>
          <uni-forms-item name="birthday" label="出生日期">
            <!--            <uni-datetime-picker :value="formData.birthday" :start="startDate" :end="endDate" @change="bindDateChange"></uni-datetime-picker>-->
            <view v-show="flag == true" class="uni-list-cell-db">
              <picker mode="date" :value="formData.birthday" :start="startDate" :end="endDate" @change="bindDateChange">
                <uni-easyinput v-model="formData.birthday" placeholder="请输入出生日期"> {{ formData.birthday }}
                </uni-easyinput>
              </picker>
            </view>
            <text v-show="flag == false"> {{ formData.birthday }}</text>
          </uni-forms-item>
          <uni-forms-item required name="sex" label="性别">
            <radio-group v-show="flag == true" @change="radioChange">
              <label v-for="(item, index) in items" :key="item.value">
                <radio :value="item.value" :checked="index === current "
                       style="transform: scale(0.7)"/>
                {{ item.name }}
              </label>
            </radio-group>
            <text v-show="flag == false"> {{ genderText }}</text>
          </uni-forms-item>
          <uni-forms-item name="home" required label="住址">
            <uni-easyinput v-show="flag == true" type="text" :inputBorder="true" v-model="formData.home"
                           placeholder="请输入住址"></uni-easyinput>
            <text v-show="flag == false"> {{ formData.home }}</text>
          </uni-forms-item>
          <uni-forms-item name="nation" required label="民族">
            <uni-easyinput v-show="flag == true" type="text" :inputBorder="true" v-model="formData.nation"
                           placeholder="请输入民族"></uni-easyinput>
            <text v-show="flag == false"> {{ formData.nation }}</text>
          </uni-forms-item>
          <uni-forms-item name="email" required label="邮箱">
            <uni-easyinput v-show="flag == true" type="text" :inputBorder="true" v-model="formData.email"
                           placeholder="请输入邮箱"></uni-easyinput>
            <text v-show="flag == false"> {{ formData.email }}</text>
          </uni-forms-item>
          <uni-forms-item name="qq" required label="QQ">
            <uni-easyinput v-show="flag == true" type="text" :inputBorder="true" v-model="formData.qq"
                           placeholder="请输入QQ"></uni-easyinput>
            <text v-show="flag == false"> {{ formData.qq }}</text>
          </uni-forms-item>
          <uni-forms-item name="wechat" required label="微信">
            <uni-easyinput v-show="flag == true" type="text" :inputBorder="true" v-model="formData.wechat"
                           placeholder="请输入微信"></uni-easyinput>
            <text v-show="flag == false"> {{ formData.wechat }}</text>
          </uni-forms-item>
          <uni-forms-item name="phone" required label="手机号">
            <uni-easyinput v-show="flag == true" type="text" :inputBorder="true" v-model="formData.phone"
                           placeholder="请输入手机号"></uni-easyinput>
            <text v-show="flag == false"> {{ formData.phone }}</text>
          </uni-forms-item>
        </uni-group>
      </uni-forms>
    </view>
  </div>
</template>

<script>
import api from "@/utils/requests";

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
  name: "info",
  data() {
    return {
      formData: {
        email: "xxxx@xx.com",
        wechat: "xxxxxxxxxx",
        qq: "xxxxxxxxxx",
        phone: "1xxxxxxxxxx",
        home: "大连东软信息学院",
        birthday: "",
        uclass: "",
        nation: "汉族"
      },
      startDate: getDate('start'),
      endDate: getDate('end'),
      genderText: '',
      flag: false,
      items: [{
        value: '0',
        name: '男',
      },
        {
          value: '1',
          name: '女',
        }
      ],
      current: 0
    }
  },
  created() {
    this.usersInfo()
  },
  methods: {
    usersInfo() {
      uni.request({
        url: 'http://localhost:3000/users/usersinfo',
        method: 'get',
        header: {
          'X-Token': uni.getStorageSync('token')
        },
        success: res => {
          console.log(res.data.data)
          this.formData = res.data.data
          this.formData.classes = res.data.data.class
          // this.current = res.data.data.gender
          // console.log(res.data.data.gender, this.current)
          if (res.data.data.gender == 0) {
            this.genderText = "男"
          }
          if (res.data.data.gender == 1) {
            this.genderText = "女"
          }
        }
      })
      // api({
      //   url: 'users/usersinfo',
      //   method: 'get'
      // }).then(res => {
      //   console.log(res)
      //   this.formData = res.data
      //   this.formData.classes = res.data.class
      // })
    },
    bindDateChange: function (e) {
      // console.log(e)
      this.formData.birthday = e.detail.value
    },
    radioChange: function (evt) {
      // console.log(evt.target.value)
      this.formData.gender = evt.target.value
    },
    edit() {
      this.flag = true
      // this.current = this.formData.gender
    },
    changeInfo() {
      uni.request({
        url: 'http://localhost:3000/users/updateuser',
        method: 'post',
        header: {
          'X-Token': uni.getStorageSync('token')
        },
        data: {
          realname: this.formData.realname,
          email: this.formData.email,
          wechat: this.formData.wechat,
          qq: this.formData.qq,
          phone: this.formData.phone,
          home: this.formData.home,
          birthday: this.formData.birthday,
          uclass: this.formData.classes,
          nation: this.formData.nation,
          gender: this.formData.gender
        },
        success: result => {
          if (result.data.code == 20000) {
            this.flag = false
            // #ifdef H5
            location.reload()
            // #endif
          }
        }
      })
      // console.log(this.formData)
      // api({
      //   url: 'users/updateuser',
      //   method: 'post',
      //   data: {
      //     realname:this.formData.realname,
      //     email:this.formData.email,
      //     wechat:this.formData.wechat,
      //     qq: this.formData.qq,
      //     phone: this.formData.phone,
      //     home: this.formData.home,
      //     birthday: this.formData.birthday,
      //     uclass: this.formData.classes,
      //     nation: this.formData.nation,
      //     gender: this.formData.gender
      //   }
      // }).then(res => {
      //   // console.log(res)
      //   if (res.code == 20000){
      //     this.flag = false
      //   }
      // })
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

/deep/ .uni-forms-item__content {
  padding: 5px;
}

picker-view {
  width: 100%;
  height: 600 rpx;
  margin-top: 20 rpx;
}

.item {
  line-height: 100 rpx;
  text-align: center;
}

.uni-forms--top {
  padding: 0px 15px;
}
</style>