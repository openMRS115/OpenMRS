<template>
	<div class="posall">
			<div class="content"> Loading 
				<span v-for="item , index in items">.</span>
			</div>
	</div>
</template>

<script>
	export default {
		data :() => ({
			items : [0]
		}),
		mounted (){
			setInterval(()=>{
				if ( this.items.length === 3) {
					this.items = [0] 
				} else {
					this.items.push(0)
				}
			},500)
		}
	}
</script>

<style scoped lang='less'>
	.posall{
		position : fixed;
		width:100%;
		height : 100%;
		background-color : rgba(0,0,0,.2);
	}
	.content{
		float:left;
		position : relative ; 
		left : 50%;
		top : 50%;
		transform: translate(-50%,-50%);
		font-size:.3rem;
		color : rgba(255,255,255.4)
	}
</style>
