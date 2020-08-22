<template>
	<div class="hello" style="position:relative">
		<div id="map_container" class="bm-view"></div>
		<div style="position : absolute ; left : 20px ; top : 20px;"  >
			<div style="float:left;margin-right : 10px;" :class="{'typeBtn':true,'mapTypeSelected' : maptype===''}" @click="changeToActive('')">Confirmed</div>
			<div style="float:left;margin-right : 10px;" :class="{'typeBtn':true,'mapTypeSelected' : maptype==='confirmed'}" @click="changeToActive('confirmed')">Active</div>
			<div style="float:left;margin-right : 10px;" :class="{'typeBtn':true,'mapTypeSelected' : maptype==='cured'}" @click="changeToActive('cured')">Recovered</div>
			<div style="float:left;margin-right : 10px;" :class="{'typeBtn':true,'mapTypeSelected' : maptype==='death'}" @click="changeToActive('death')">Death</div>
			<div style="float:left;margin-right : 10px;" :class="{'typeBtn':true,'mapTypeSelected' : maptype==='suspected'}" @click="changeToActive('suspected')">Suspected</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			list: Array,
		},
		data() {
			return {
				maptype : '' ,
				map : '' ,
				mapLevel : 10 ,
				eventstatus: false,
				pointCollection: '',
				dataList: [{
					province: '湖北省',
					arrive: [112.775, 30.857],
					name_en: 'HuBei',
					sit: [
					]
				}]
			}
		},
		watch: {
			list: function(n, o) {
				let that = this;
				if (n.length > 0) {
					console.log(n)
				}
			}
		},
		mounted() {
			let that = this;
				that.loadData();
		},
		computed: {
			getList() {
				return this.dataList
			},
			getDeath() {
				let data = this.dataList[0].sit;
				let num = 0;
				data.map(item => {
					if (item.status === 'death') {
						num++
					}
				})
				return num;
			},
			getSave() {
				let data = this.dataList[0].sit;
				let num = 0;
				data.map(item => {
					if (item.status === 'cured') {
						num++
					}
				})
				return num;
			},
			getsuspected(){
				let data = this.dataList[0].sit;
				let num = 0;
				data.map(item => {
					if (item.status === 'suspected') {
						num++
					}
				})
				return num;
			},

			getUnKnown() {
				let data = this.dataList[0].sit;
				let num = 0;
				data.map(item => {
					if (item.status === 'suspected') {
						num++
					}
				})
				return num;
			},
			getSure() {
				let data = this.dataList[0].sit;
				let num = 0;
				data.map(item => {
					if (item.status === 'confirmed') {
						num++
					}
				})
				return num;
			},
			getList() {
				return this.list;
			}
		},
		methods: {
			changeToActive(type){
				let that = this ;
				that.maptype = type ;
				that.setup(that.map, '湖北', that.mapLevel , type);
			},
			loadData() {
				let that = this;
				let res = {}
				res.data = that.getlist;
				console.log(res)
				that.getList.map(item => {
					let obj = {
						longitude: item.longitude,
						latitude: item.latitude,
						status: item.status
					}
					that.dataList[0].sit.push(obj);
				})
				this.loadCityMap();
			},
			loadCityMap() {
				let that = this;
				let status = true;
				var map = new BMap.Map("map_container");
				this.map = map ;
				var cityName = '武汉市';
				this.addMapSkin(map);
				map.centerAndZoom(cityName, 10); //  map.addControl(new BMap.ScaleControl());
				map.addControl(new BMap.OverviewMapControl()); 
				map.enableScrollWheelZoom();
				map.addControl(new BMap.NavigationControl({
					type: BMAP_NAVIGATION_CONTROL_LARGE,
					anchor: BMAP_ANCHOR_TOP_LEFT,
					offset: new BMap.Size(40, 250)
				}));
				map.addEventListener("zoomend", function(e) {
					var ZoomNum = map.getZoom();
					map.clearOverlays();
					that.mapLevel = ZoomNum ; 
					that.setup(map, ZoomNum >= 10 ? cityName : '湖北', ZoomNum,that.maptype);
				});
				if (status) {
					status = !status
					that.setup(map, cityName, 10,that.maptype);
				}
			},

			addMapSkin(map) {
				var style_map = [{
					"featureType": "land",
					"elementType": "all",
					"stylers": {
						"color": "#f0f9ff",
						"lightness": -1
					}
				}, {
					"featureType": "water",
					"elementType": "all",
					"stylers": {
						"color": "#B3D8FF",
						"lightness": -1
					}
				}, {
					"featureType": "green",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				}, {
					"featureType": "highway",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				},  {
					"featureType": "country",
					"elementType": "labels.text.fill",
					"stylers": {
						"color": "#e2953fff",
						"visibility": "on"
					}
				}, {
					"featureType": "city",
					"elementType": "labels.text.fill",
					"stylers": {
						"color": "#000000",
						"visibility": "on"
					}
				}, {
					"featureType": "subhway",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				}]
				map.setMapStyle({
					styleJson: eval("style_map")
				});
			},

			setup(map, cityName, level,type ) {
				let that = this;
				var bdary = new BMap.Boundary();
				bdary.get(cityName, function(rs) {  
					var EN_JW = "180, 90;"; 
					var NW_JW = "-180,  90;"; 
					var WS_JW = "-180, -90;"; 
					var SE_JW = "180, -90;"; 
				});
				var points = []; 
				var options = {}
				
				let color  = '' ;
				switch (type){
					case '' : 
					color = 'red'
					break ;
					case 'confirmed' : 
					color = '#CA4C26'
					break ;
					case 'suspected' :
					color = 'black'
					break ;
					case 'cured' :
					color = 'green'
					break ;
					case 'death' :
					color = 'gray'
					break ;
				}
				
				if (level >= 10) {
					let data = that.dataList[0].sit;
					for (var i = 0; i < data.length; i++) {
						if ( type ) {
							if (  data[i].status === type ){
								points.push(new BMap.Point(data[i].longitude, data[i].latitude));
							}
						} else {
							points.push(new BMap.Point(data[i].longitude, data[i].latitude));
						}
					}
					options = {
						size: BMAP_POINT_SIZE_SMALL,
						color: color,
						zIndex: 5,
					}
				} else {
					points.push(new BMap.Point(that.dataList[0].arrive[0], that.dataList[0].arrive[1]))
					options = {
						size: BMAP_POINT_SIZE_BIG,
						color: color,
						zIndex: 5,
					}
				}
				map.clearOverlays();
				if (that.pointCollection) {

				} else {}
				that.pointCollection = new BMap.PointCollection(points, options);
				var opts = {
					width: 150, 
					overflow: 'hidden',
					// title: "Hu Bei Province", 
					border: '1px solid red ',
					enableAutoPan: false,
					fontSize:'16px'
				}
				
				let htmlCode = '<div style="font-size:18px"> Hu Bei<div/>' ; 
				switch (type){
					case '' : 
					htmlCode += '<div style="font-size:12px">total case：' + (that.getDeath+that.getSave+that.getSure) + '</br>' +  
					'active case：'+ (that.getSure) +'</br>' + 
					'recovered case：'+ (that.getSave) +'</br>' + 
					'death case：'+ (that.getDeath) +'</br>' + 
					'suspected case：'+ (that.getsuspected)  + 
					'</div>' ;
					break ;
					case 'confirmed' : 
					htmlCode = '<div style="font-size:12px">active case：' + (that.getSure) + '</div>' ;
					break ;
					case 'suspected' :
					htmlCode = '<div style="font-size:12px">suspected case：' + (that.getsuspected) + '</div>' ;
					break ;
					case 'cured' :
					htmlCode = '<div style="font-size:12px">recovered case：' + (that.getSave) + '</div>' ;
					break ;
					case 'death' :
					htmlCode = '<div style="font-size:12px">death case：' + (that.getDeath) + '</div>' ;
					break ;
				}
					 var infoWindow= new BMap.InfoWindow(htmlCode, opts)
				let fa = function() {
					map.openInfoWindow(infoWindow, points[0]);
				}
				if (level < 10) {
					this.eventstatus = true;
					that.pointCollection.addEventListener('onmouseover', fa);
					that.pointCollection.addEventListener('onmouseout', function() {
						map.closeInfoWindow();
					});
				} else {
					if (this.eventstatus) {
						this.eventstatus = false
						that.pointCollection.addEventListener('onmouseover', function() {
							infoWindow.setTitle("Coordinates");
							map.closeInfoWindow();
						})
					}
				}
				map.addOverlay(that.pointCollection); 
			},
		},
	}
</script>

<style lang="less">
	.bm-view {
		height: 60vh;
		width: calc(50vw - 20px);
	}

	.BMap_shadow,
	.BMap_shadow img,
	.BMap_shadow div {
		display: none !important;
	}

	.BMap_pop>div>img {
		display: none !important
	}

	.anchorBL {
		display: none;
	}
	
	.typeBtn{
		border : 1px solid rgba(124,124,124,1);
		border-radius : 5px; 
		background-color : rgb(255,255,255);
		margin-right : 10px;
		cursor : pointer ;
		padding : 5px 8px ;
		font-size : 12px;
		&:hover{
			background-color : rgba(97,126,180,1);
			color : rgba(255,255,255,1);
		}
	}
	
	.mapTypeSelected{
		background-color : rgba(97,126,180,1);
		color : rgba(255,255,255,1);
	}
</style>
