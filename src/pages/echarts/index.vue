<template>
	<view class="content">
<!--		<view @click="review" :prop="option" id="echarts" class="echarts"></view>-->
    <view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
	</view>
</template>

<script>
	export default {
	  props: {
	    charts:{
	      type: Object
      }
    },
		data() {
			return {
				option: {
					title: {
						// text: '社团增长趋势'
					},
					tooltip: {},
					xAxis: {
						data: [2016, 2017, 2018, 2019, 2020, 2021]
					},
					yAxis: {},
					series: [{
						name: '增长人数',
						type: 'line',
						data: [5, 20, 36, 10, 10, 20]
					}]
				}
			}
		},
		created() {
      // console.log(this.charts)
      // this.option.series[0].data = this.charts.yAxis
      // this.option.xAxis.data = this.charts.xAxis
      this.changeOption()
    },
    methods: {
      changeOption() {
        const data = this.option.series[0].data
        // 随机更新示例数据
        data.forEach((item, index) => {
          const num = (Math.random())*10
          data.splice(index, 1, Math.floor(num))
        })
      },
			onViewClick(options) {
				console.log(options)
			},
      review() {
        // console.log('click')

      }
		}
	}
</script>

<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.echarts {
		margin-top: 0px;
		width: 100%;
		height: 300px;
	}
</style>
