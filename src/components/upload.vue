<template>
	<view class="upload-box">
		<view class="con">
			<view ref="fileInput" class="fileinput">
<!--        <input type="file" multiple="multiple" />-->
      </view>
<!--			<button class="upload-btn" type="default" @click="uploadFile">附件上传</button>-->
		</view>
		<text class="filetxt" v-for="file in files" :key="file.name">{{file.name}}</text>
	</view>
</template>

<script>

import Index from "@/pages/tabBar/index/index";
export default {
  components: {Index},
  props: {
		/**
		 * 模式  asyn异步；await同步
		 */
		reqMode: {
			value: String,
			default: "async"
		},
		reqUrl: {
			value: String,
			default: ""
		},
		filed:{
			value:String,
			default:"upload"
		},
		multiple:{
			value:Boolean,
			default:false
		}
	},
	mounted() {
		// var input = document.getElementsByTagName('input')
		var input = document.createElement('input')
		input.type = 'file';
		if( this.multiple ){
			input.setAttribute("multiple","multiple")
		}
		input.className = 'file';
		input.onchange = (event) => {  
			if( event.target.files.length > 0 ){
				this.files = event.target.files;
				if( this.reqMode == "async" ){
					this.uploadFile(null,null);
				}
			}
		}  
		this.$refs.fileInput.$el.appendChild(input)
	},
	data() {
		return {
			files:[],
			resposeJson:""
		};
	},
	methods: {
		uploadFile:function(callback){
			if( this.reqUrl == "" ){
				uni.showToast({
					title: "请求路径不能为空",
					image: '/static/img/warn.png',
					duration: 2000
				 })
			}else{
				let fData = new FormData();
				//批量上传
				for(var j=0;j<this.files.length;j++){
					fData.append(this.filed,this.files[j]);
				}
				// if(null!= reqParams && Object.keys(reqParams).length>0){
				// 	fData =this.convertObj( fData,reqParams )
				// }
				let xhr = new XMLHttpRequest();
				xhr.open("POST",this.reqUrl, true);
				let _this = this;
				xhr.onload = function(e) { 
					let resposeJson = JSON.parse(xhr.responseText);
					const { data } = resposeJson;
					_this.resposeJson = data;
					if(null!=callback && typeof callback === "function"){
					    callback(resposeJson);
					}
				};
				xhr.send(fData)
				xhr.timeout = 100000;
				xhr.ontimeout = function(event){
					uni.showToast({
						title: "上传超时",
						image: '/static/img/err.png',
						duration: 2000
					})
				}
			}
		},
		convertObj(fData,data) {
			var _result = [];
			for (var key in data) {
			  var value = data[key];
			  if (value.constructor == Array) {
				value.forEach(function(_value) {
				 fData.append(key,_value);
				});
			  } else {
				 fData.append(key,value);
			  }
			}
			return fData
	  }
	}
};
</script>

<style lang="scss" scoped>

</style>
