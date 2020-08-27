<template>
	<div class="lineWidth">
		<chart-set :option="getLineAreaOption" :index="1" ></chart-set>
		<chart-set :option="getLineOption" :index="0" ></chart-set>
	</div>
</template>

<script>
	import chartSet from "@/components/charts/SetLineCharts.vue"
	export default {
		components: {
			"chart-set": chartSet
		},
		props: {
			buildData : Object,
			list: Array
		},
		computed: {
			getLineData(){
				return this.buildData
			},
			getMapList() {
				return this.list;
			},
			getLineOption() {
				let a = this.getLineData;
				let option = {
					title: {
						top: 20,
						text: 'Death & Recover Cases'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						top: 15,
						right: 10,
						orient: 'vertical',
						data: ['Death', 'Recover']
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: a.legend,
						axisLabel: {
							interval: 2
						}
					},
					yAxis: {
						type: 'value',
						minInterval: 1,
						boundaryGap: [0, '30%']
					},
					series: [{
						name: 'Death',
						data: a.diethData,
						type: 'line',
						symbolSize: 6,
						itemStyle: {
							normal: {
								color: '#000000',
								lineStyle: {
									color: '#000000'
								}
							}
						}
					}, {
						name: 'Recover',
						data: a.curedData,
						type: 'line',
						symbolSize: 6,
						itemStyle: {
							normal: {
								color: '#8cd5c2',
								lineStyle: {
									color: '#8cd5c2'
								}
							}
						}
					}]
				};
				return option;
			},
			getLineAreaOption() {
				let a = this.getLineData;
				let option = {
					title: {
						top: 20,
						text: 'Confirmed Cases & Active Cases'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						top: 15,
						right: 10,
						orient: 'vertical',
						data: ['Confirmed Case', 'Active Case']
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: a.legend,
						axisLabel: {
							interval: 2
						}
					},
					yAxis: {
						type: 'value',
						minInterval: 3,
						boundaryGap: [0, '10%']
					},
					series: [{
						name: 'Confirmed Case',
						data: a.totalData,
						type: 'line',
						color: '#fff1e1',
						areaStyle: {
							color: '#fff1e1'
						}
					}, {
						name: 'Active Case',
						data: a.confirmData,
						type: 'line',
						color: '#ffdadb',
						areaStyle: {
							color: '#ffdadb'
						}
					}]
				};
				return option;
			},
		}
	}
</script>

<style scoped lang="less">
	.lineWidth {
		width: calc(19.2rem / 4 - 20px);
		float: left;

		&>div {
			width: 100%;
			height: 2.9rem;
		}
	}
</style>
