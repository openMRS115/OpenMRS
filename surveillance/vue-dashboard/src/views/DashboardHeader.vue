<template>
	<div class="header">
		<div class="title">OpenMrs-Surveillance System</div>
		<div class="date">Update Time : {{getToday}}</div>
	</div>
</template>

<script>
	export default {
		computed : {
			getToday(){
				let date = new Date(); 
				let year = date.getFullYear();
				let month = date.getMonth() + 1 ;
				let day = date.getDate() ; 
				return day + '/' + month + '/' + year
			}
		}
	}
</script>

<style scoped>
	.header {
		width: 19.2rem;
		height: 10vh;
	}

	.title {
		float: left;
		font-size: 0.35rem;
		line-height: 10vh;
		color: rgba(0, 0, 0, 1);
		margin-left: 0.5rem;
		font-weight: 700;
	}

	.date {
		float: right;
		margin-right: 0.4rem;
		line-height: 10vh;
		font-size: 0.2rem;
	}
</style>
