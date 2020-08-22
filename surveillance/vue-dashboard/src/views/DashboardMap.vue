<template>
	<div class="mapSize" >
		<map-tool :list="getMapList"></map-tool>
	</div>
</template>

<script>
	import mapTool from '@/components/charts/map.vue'
	export default {
		components : {
			'map-tool': mapTool,
		},
		props:{
			mapList : Array
		},
		computed : {
			getMapList (){
				return this.mapList
			}
		}
	}
</script>

<style scoped lang="less">
	.mapSize{
		width: calc(19.2rem / 2 - 12px);
		float: left;
		padding: 0px 5px;
		overflow:hidden;
	}
</style>
