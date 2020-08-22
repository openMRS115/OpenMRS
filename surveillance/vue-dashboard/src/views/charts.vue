<template>
	<div class="s100pl back" style="overflow-x: hidden; overflow-y:hidden">
		<dashboard-loading  v-if="!getMapList.length > 0"></dashboard-loading>
		<dashboard-header v-if="getMapList.length > 0"></dashboard-header>
		<dashboard-data-show :list="getMapList" v-if="getMapList.length > 0"></dashboard-data-show>
		<dashboard-map :mapList="getMapList" v-if="getMapList.length > 0"></dashboard-map>
		<dashboard-line :list="getMapList"  :buildData="getLineData" v-if="getMapList.length > 0"></dashboard-line>
		<dashboard-bars :list="getMapList" :buildData="getLineData" v-if="getMapList.length > 0"></dashboard-bars>
	</div>
</template>

<script>
	import dashboardHeader from '@/views/DashboardHeader.vue'
	import dashboardDataShow from '@/views/DashboardDataShow.vue'
	import dashboardMap from '@/views/DashboardMap.vue'
	import dashboardLine from '@/views/DashboardLine.vue'
	import dashboardBars from '@/views/DashboardBars.vue'
	import dashboardLoading from '@/views/DashboardLoading.vue'
	export default {
		components: {
			"dashboard-loading" : dashboardLoading,
			"dashboard-header" : dashboardHeader,
			"dashboard-data-show" : dashboardDataShow,
			"dashboard-map" : dashboardMap,
			"dashboard-line" : dashboardLine,
			"dashboard-bars" : dashboardBars,
		},
		data: () => ({
			list: [],
			monthDay: ['3-1', '3-5', '3-10', '3-15', '3-20', '3-25','4-1', '4-5', '4-10', '4-15', '4-20', '4-25', 
			'5-1', '5-5', '5-10', '5-15', '5-20', '5-25', '6-1', '6-5', '6-10', '6-15', '6-20', '6-25', 
			'7-1', '7-5', '7-10', '7-15', '7-20', '7-25', '8-1'
			],
		}),
		computed: {
			getLineData() {
				let that = this;
				let data = this.getMapList;
				let obj = {
					totalData: [],
					confirmData: [],
					cityData: [
						[],
						[],
						[],
						[],
						[],
						[]
					],
					diethData: [],
					curedData: [],
					citys: ["WuHan", "HuangShi", "ShiYan", "YiChang", "XiangYang", "EZhou"],
					legend: this.getXaxios,
				}
				let valus = [0, 0, 0]; // ["confirmed",  "cured", "death"];
				let citys = ["WuHan", "HuangShi", "ShiYan", "YiChang", "XiangYang", "EZhou"]
				let cityData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				let nowData = 0;
				data.map((item,index) => {
					let date = new Date(nowData).getDate();
					if (new Date(nowData).getMonth() + 1 == this.monthDay[obj.totalData.length].split("-")[0] && date == this.monthDay[
							obj.totalData.length].split("-")[1]) {
						if (nowData !== item.confirmed_date || index === data.length-1) {
							obj.totalData.push(index +1);
							for (let i = 0; i < citys.length; i++) {
								let cityNumber = data.filter(res=>{
									return res.confirmed_date <= nowData && res.city === citys[i] && status !== 'suspected';
								})
								obj.cityData[i].push(cityNumber.length);
							}
							let curedValue = data.filter(res=>{
								return res.status === "cured" && res.cure_date <= nowData;
							})
							let deathValue = data.filter(res=>{
								return res.status === "death" && res.death_date <= nowData ;
							})
							obj.confirmData.push(index  - curedValue.length - deathValue.length);
							obj.curedData.push(curedValue.length);
							obj.diethData.push(deathValue.length);
						}
					}
					if ( item.confirmed_date ){
						nowData = item.confirmed_date;
					}
				})
				return obj;
			},
			getMapList() {
				return this.list;
			},
			getXaxios(){
				let month = [ 'Jan' , 'Feb' ,'Mar' ,'Apr', 'May' , 'Jun' ,'Jul', 'Aug' , 'Sep', 'Oct', 'Nov' ,'Dec'  ];
				let xdata = this.monthDay ; 
				let res = [] ; 
				xdata.map(item=>{
					let index = item.split('-')[0] - 0  ; 
					res.push(month[index+1]+item.split('-')[1].toString())
				})
				return res
			}
		},
		mounted() {
			let that = this;
			that.$axios({
				method: "get",
				url: '/init'
			}).then(res => {
				this.list = res;
			})
		},
	}
</script>

<style lang="less" scoped>
	.s100pl {
		width: calc(100%);
		float: left;
	}

	.back {
		background-color: #f0f9ff ;
	}
</style>
