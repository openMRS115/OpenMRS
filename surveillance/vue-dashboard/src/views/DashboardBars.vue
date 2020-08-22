<template>
	<div class="barWidth">
		<chart-set :option="getBarLeftOptions" :index="3" ></chart-set>
		<chart-set :option="getCompareSortOption" :index="4" ></chart-set>
		<chart-set :option="CaseComparison" :index="5" ></chart-set>
	</div>
</template>

<script>
	import chartSet from "@/components/charts/SetBarCharts.vue"
	export default {
		components : {
			"chart-set": chartSet
		},
		props : {
			buildData : Object,
			list : Array
		},
		computed : {
			getLineData(){
				return this.buildData ;
			},
			getMapList(){
				return this.list ;
			},
			getBarLeftOptions() {
				let a = this.getAgeData;
				let option = {
					title: {
						top:'8%',
						text: 'Campare by age'
					},
					grid: {
						left: '3%',
						right: '4%',
						top: '20%',
						bottom: '0',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						show: false,
						boundaryGap: [0, 0.01]
					},
					yAxis: {
						type: 'category',
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						},
						data: ['80+', '70-79', '60-69', '50-59', '40-49', '30-39', '20-29', '0-19'],
						axisLabel: {
							show: true,
							textStyle: {
								color: 'black',
								fontSize: 16
							}
						},
					},
					series: [{
						type: 'bar',
						barCategoryGap: '30%',
						data: a,
						itemStyle: {
							normal: {
								label: {
									show: true,
									position: 'right',
									textStyle: {
										color: 'black',
										fontSize: 16
									}
								}
							}
						},
					}],
					color: '#617eb4',
				};
				return option
			},
			getAgeData() {
				let that = this;
				let data = this.getMapList;
				let arr = [0, 0, 0, 0, 0, 0, 0, 0]
				data.map(item => {
					if (item.status !== 'suspected') {
						if (item.age > 0 && item.age <= 19) {
							let val = arr[7];
							arr[7] = val + 1;
						} else if (item.age >= 20 && item.age <= 29) {
							let val = arr[6];
							arr[6] = val + 1;
						} else if (item.age >= 30 && item.age <= 39) {
							let val = arr[5];
							arr[5] = val + 1;
						} else if (item.age >= 40 && item.age <= 49) {
							let val = arr[4];
							arr[4] = val + 1;
						} else if (item.age >= 50 && item.age <= 59) {
							let val = arr[3];
							arr[3] = val + 1;
						} else if (item.age >= 60 && item.age <= 69) {
							let val = arr[2];
							arr[2] = val + 1;
						} else if (item.age >= 70 && item.age <= 79) {
							let val = arr[1];
							arr[1] = val + 1;
						} else if (item.age >= 80) {
							let val = arr[0];
							arr[0] = val + 1;
						}
					}
				})
				return arr;
			},
			
			getCompareSortOption() {
				let a = this.getLineData.cityData;
				var chartData = [];
				a.map(item=>{
					chartData.push(item[item.length-1]);
				})
				var chartName = ["WuHan", "HuangShi", "ShiYan", "YiChang", "XiangYang", "EZhou"];
				var myColor = ['#003366' , '#336699', '#3399cc', '#6699cc', '#85b3de', '#83cbe2']
				var len = chartData.length;
				for (var i = 0; i < len - 1; i++) {
					for (var j = 0; j < len - 1 - i; j++) {
						if (chartData[j] < chartData[j + 1]) {
							var temp = chartData[j];
							chartData[j] = chartData[j + 1];
							chartData[j + 1] = temp;
			
							var namea = chartName[j];
							chartName[j] = chartName[j + 1];
							chartName[j + 1] = namea;
			
							var color = myColor[j]
							myColor[j] = myColor[j + 1];
							myColor[j + 1] = color;
						}
					}
				}
				var option = {
					title: {
						top: 20,
						text: 'Case Compare'
					},
					grid: {
						left: '0%',
						right: '10%',
						bottom: '0%',
						top: '15%',
						containLabel: true
					},
					xAxis: [{
							show: false,
						},
						{
							show: false,
						}
					],
					yAxis: {
						type: 'category',
						inverse: true,
						show: false
					},
					series: [{
							show: true,
							type: 'bar',
							barGap: '-100%',
							barWidth: '20%',
							z: 2,
							itemStyle: {
								normal: {
									color: function(params) {
										var num = myColor.length;
										return myColor[params.dataIndex % num]
									}
								}
							},
							label: {
								normal: {
									show: true,
									textStyle: {
										color: '#000',
										fontSize: 15,
										fontWeight: 'bold',
										position: 'right'
									},
									position: 'right',
									formatter: function(data) {
										return (chartData[data.dataIndex]);
									}
								}
							},
							data: chartData,
						},
						{
							show: true,
							type: 'bar',
							xAxisIndex: 1,
							barGap: '-100%',
							barWidth: '10%',
							itemStyle: {
								normal: {
									barBorderRadius: 200,
									color: 'transparent'
								}
							},
							label: {
								normal: {
									show: true,
									position: [0, '-20'],
									textStyle: {
										fontSize: 14,
										color: '#333',
									},
									formatter: function(data) {
										return chartName[data.dataIndex];
									}
								}
							},
							data: chartData
						}
					]
				};
				return option;
			},
			
			CaseComparison() {
				let a = this.getLineData;
				let seresData = [];
				a.cityData.map((item, index) => {
					let obj = {
						name: a.citys[index],
						type: 'bar',
						barWidth: "15",
						stack: 'case',
						data: item
					}
					seresData.push(obj)
				})
				let option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: { 
							type: 'shadow' 
						}
					},
					grid: {
						top : '22%',
						left: '1%',
						right: '4%',
						bottom: '3%',
						containLabel: true,
					},
					xAxis: [{
						type: 'category',
						data: a.legend,
						axisLabel: {
							interval: 2
						}
					}],
					yAxis: [{
						type: 'value'
					}],
					color: ['#003366' , '#336699', '#3399cc', '#6699cc', '#85b3de', '#83cbe2'],
					series: seresData
				};
				return option
			},
		}
	}
</script>

<style scoped lang="less">
	.barWidth{
		width : 19.2rem ;
		height : 30vh;
		&>div{
			width : calc( 19.2rem * 0.2 - 5px );
			float:left; 
			height : 30vh;
			&:first-child{
				width : calc( 19.2rem * 0.5 - 5px );
			}
			&:last-child{
				width : calc( 19.2rem * 0.3 - 5px );
			}
		}
	}
</style>
