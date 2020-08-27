<template>
	<div :id="getId" ></div>
</template>

<script>
	export default {
		props:{
			size : {
				type : Object 
			},
			option : {
				type : Object
			},
			index : {
				type : Number ,
				default : new Date().getTime()
			}
		},
		data : ()=>({ }),
		computed:{
			getIndex (){
				return this.index;
			},
			getId(){
				return "chart" + this.getIndex
			},
			getOptions(){
				return this.option ;
			}
		},
		watch:{
			"getOptions" : function(n,o){ 
				let myChart = that.$echarts.init(document.getElementById(this.getId));
				myChart.setOption(n, true);
			}
		},
		mounted (){
			this.setOptions(this.getOptions);
		},
		methods : {
			setOptions(n){
				let that = this;
				let myChart = that.$echarts.init(document.getElementById(this.getId));
				myChart.setOption(n, true);
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
