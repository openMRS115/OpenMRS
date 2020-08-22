<template>
	<div class="dataShowWidth">
		<div class="dataBorder">
			<span class="numTitle">Total Confirmed</span>
			<span class="num" style="color : red">{{ getSure + getSave + getDeath}}</span>
		</div>
		<div class="dataBorder">
			<span class="numTitle">Active Case</span>
			<span class="num" style="color : #CA4C26">{{getSure}}</span>
		</div>
		<div class="dataBorder">
			<span class="numTitle">Recovered</span>
			<span class="num" style="color : green">{{getSave}}</span>
		</div>
		<div class="dataBorder">
			<span class="numTitle">Deaths</span>
			<span class="num" style="color : gray">{{getDeath}}</span>
		</div>
		<div class="dataBorder">
			<span class="numTitle">Suspected</span>
			<span class="num" style="color : black">{{getUnKnown}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		computed: {
			getMapList() {
				return this.list;
			},
			getDeath() {
				let data = this.getMapList;
				let num = 0;
				data.map(item => {
					if (item.status === 'death') {
						num++
					}
				})
				return num;
			},
			getSave() {
				let data = this.getMapList;
				let num = 0;
				data.map(item => {
					if (item.status === 'cured') {
						num++
					}
				})
				return num;
			},

			getUnKnown() {
				let data = this.getMapList;
				let num = 0;
				data.map(item => {
					if (item.status === 'suspected') {
						num++
					}
				})
				return num;
			},
			getSure() {
				let data = this.getMapList;
				let num = 0;
				data.map(item => {
					if (item.status === 'confirmed') {
						num++
					}
				})
				return num;
			},
		}
	}
</script>

<style scoped lang="less">
	.dataShowWidth {
		width: calc(19.2rem / 4);
		float: left;
	}

	.dataBorder {
		width: 80%;
		height: 8vh;
		border: 1px solid rgba(124, 124, 124, .4);
		border-radius: 5px;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		margin-bottom: 3vh;

		&:first-child {
			margin-top: .3rem;
		}
	}

	.numTitle {
		position: absolute;
		top: -13px;
		left: 0.15rem;
		background-color: #f0f9ff;
		font-size:.2rem;
	}

	.num {
		font-size: 0.4rem;
		font-weight: bolder;
		float: right;
		margin-right: 0.5rem;
		margin-top: 0.1rem;
		color: red;
		line-height: 0.8rem
	}
</style>
