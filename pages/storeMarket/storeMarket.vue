<template>
	<view class="qiun-columns">
		<!-- <view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">基本柱状图</view>
		</view> -->
		<view class="qiun-charts">
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchLineA" disable-scroll=true  @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- <canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn" disable-scroll=true  @touchmove="moveLineA" @touchend="touchEndLineA"></canvas> -->
		</view>
		<view  @tap="toMyorder" class="flex_sb" style="align-items: center;font-size: 16px;padding-left: 40upx;height: 90upx;padding-right: 20upx;margin-top: 30upx;">
			<view>我的訂單</view>
			<view class="flex_c">
				<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
			</view>
		</view>
		<view class="flex">
			<view class="flex_c_c" :class="[dataIndex==1?'buySellActive':'buySell']" data-index='1' @tap="selectLabel">買入</view>
			<view class="flex_c_c" :class="[dataIndex==2?'buySellActive':'buySell']" data-index='2' @tap="selectLabel">賣出</view>
		</view>
		<view v-if="dataIndex==1">
			<block v-for="(item,index) in records" :key= "index" >
				<view class="flex_sb" style="margin: 20upx 30upx;">
					<view>
						<view>
							<text style="font-size: 13px;">數量：</text><text style="font-size: 16px;">{{item.stockCount}}</text><text style="font-size: 16px;padding-left: 10upx;">ECF</text>
						</view>
						<view style="color: #3d4663;">
							<text style="font-size: 13px;">單價：</text><text style="font-size: 14px;">{{item.unitPrice}}</text><text style="font-size: 13px;padding-left: 10upx;">USDF</text>
						</view>
						
					</view>
					<view class="flex_c">
						<view> 
							<text style="font-size: 18px;color:#34F073;">{{item.totalPrice}}</text><text style="font-size: 12px;padding-left: 10upx;color: #3d4663;">USDF</text>
						</view>
						
					</view>
			
				</view>
			</block>
			<uniLoadMore :status="loadingType"></uniLoadMore>
		</view>
		
		<view class="flex_c_c" style="font-size: 14px;margin-top: 20upx;color: #999999" v-if="dataIndex==2">
			沒有更多數據了
		</view>
		
		
	</view>
	
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	let timer;
	var canvaColumn=null;

	export default {
		components:{
			uniLoadMore
		},
		data() {
			return {
				buyStop: false,
				loadingType: 'more',
				sellStop: false,
				records:[],
				dataIndex: 1,
				cWidth:'',
				cHeight:'',
				pixelRatio: 1,
				serverData:'',
				chartData: {
				  "categories": [],
				  "series": [{
					"name": "",
					"data": []
				  }]
				},
				pageNum: 1,
				pageSize: 20
			}
		},
		onReachBottom:function(){
			// if (this.dataIndex ==1){
			//     this.fetchBuy()	
			// }else if (this.dataIndex == 2){
			// 	this.fetchSell()
			// }
			if (timer != null) {
			           clearTimeout(timer);
			       }
			  timer = setTimeout(function() {
			       _self.fetchBuy();
			       }, 1000);
		},
		onShow:function(){
			this.fetchPrice()
			this.fetchBuy()
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(400);
			this.fetchPrice()
			// this.getServerData();
			setTimeout(function() {
				_self.showColumn("canvasColumn",_self.chartData);
			}, 500);
			
			this.fetchPrice()
			this.fetchBuy()
		},
		methods: {
			async fetchPrice(){

				const res = await this.$http.get('/st/share_price')
				this.chartData.categories = res.data.data.categories
				let tmp = res.data.data.data
				let arr=[]
				tmp.forEach((item,index)=>{
					
					if (index%2 ==0){
						arr.push({"value": item,"color": "#586da4"})
					}else {
						arr.push({"value": item,"color": "#2b3c68"})
					}

				})
				this.chartData.series[0].data = arr
				console.log(this.chartData)
				console.log(res)
			},
			async fetchBuy(){
				if (this.loadingType=''){
					return
				}
				let data ={
					pageNum: this.pageNum,
					pageSize: this.pageSize

				}
				this.loadingType='loading'
				const res = await this.$http.get('/st/queue_buy_list',{data: data})
				if (res.data.data.totalCount < this.pageSize){
					this.loadingType = ''
				}else {
					this.loadingType = 'more'
					this.pageSize += 20
				}
				this.records = res.data.data.list
				console.log(res)
			},
			async fetchSell(){
				if (this.sellStop){
					return
				}
				let data ={
					pageNum: this.pageNum,
					pageSize: this.pageSize
			
				}
				const res = await this.$http.get('/st/queue_sell_list',{data: data})
				if (res.data.data.totalCount < this.pageSize){
					this.sellStop = true
				}else {
					this.pageSize += 20
				}
				this.records = res.data.data.list
				console.log(res)
			},
			toMyorder:function(){
				uni.navigateTo({
					url: './myOrder',
					
				});
			},
			selectLabel:function(e){
				this.dataIndex = e.target.dataset.index
				if (this.dataIndex == 2){
					
					this.buyStop = false
					this.pageSize = 20
					this.fetchSell()
				}
				if (this.dataIndex == 1){
					this.pageSize = 20
					this.sellStop = false
					this.fetchBuy()
				}
				
			},
			getServerData(){
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data:{
					},
					success: function(res) {
						console.log(res)
						//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
						_self.serverData=res.data.data;
						let Column={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Column.categories=res.data.data.Column.categories;
						Column.series=res.data.data.Column.series;
						_self.showColumn("canvasColumn",Column);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			showColumn(canvasId,chartData){
				canvaColumn=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					legend:{show:false},
					fontSize:11,
					background:'#111c30',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					enableScroll: true,//开启图表拖拽功能
					xAxis: {
						// disableGrid:true,
						gridColor:'#586da4',
						gridType: 'dash',
						labelCount: 4,
						itemCount:20,//x轴单屏显示数据的数量，默认为5个
						scrollShow:true,//新增是否显示滚动条，默认false
						scrollAlign:'left',//滚动条初始位置
						scrollBackgroundColor:'#111c30',//默认为 #EFEBEF
						scrollColor:'#2b3c68',//默认为 #A6A6A6
						
					},
					yAxis: {
						gridColor:'#586da4',
						data:[
							{
								format:(val)=>{return val.toFixed(2)},
								
							}
						],
						// disableGrid:true
						

					},
					dataLabel: false,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'group',
							width: 10
							// width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
						}
					  }
				});
				
			},
			// touchColumn(e){
			// 	canvaColumn.showToolTip(e, {
					
			// 		format: function (item, category) {
			// 			if(typeof item.data === 'object'){
			// 				return category + ' ' + item.name + ':' + item.data.value 
			// 			}else{
			// 				return category + ' ' + item.name + ':' + item.data 
			// 			}
			// 		}
			// 	});
			// },
			touchLineA(e){
							canvaColumn.scrollStart(e);
							canvaColumn.showToolTip(e, {
								
								format: function (item, category) {
									if(typeof item.data === 'object'){
										return category + ' ' + item.name + ':' + item.data.value 
									}else{
										return category + ' ' + item.name + ':' + item.data 
									}
								}
							});
						},
			moveLineA(e) {
				canvaColumn.scroll(e);
			},
			touchEndLineA(e) {
				canvaColumn.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				// canvaColumn.showToolTip(e, {
				// 	format: function (item, category) {
				// 		return category + ' ' + item.name + ':' + item.data 
				// 	}
				// });
			},
		}
	}
</script>

<style>
page{background:#091224;width: 750upx;overflow-x: hidden;color: #FFFFFF;}
.buySellActive{background: #1b2944;color: #FFFFFF;width:50%;height: 100upx;font-size: 15px;}
.buySell{background: #111c30;color: #3d4663;width:50%;height: 100upx;font-size: 15px;}
.qiun-padding{padding:2%; width:96%;}
.qiun-wrap{display:flex; flex-wrap:wrap;}
.qiun-rows{display:flex; flex-direction:row !important;}
.qiun-columns{display:flex; flex-direction:column !important;}
.qiun-common-mt{margin-top:10upx;}
.qiun-bg-white{background:#111c30;}
.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
.qiun-charts{width: 750upx; height:450upx;background-color: #111c30;}
.charts{width: 100%; height:400upx;background-color: #111c30;}
</style>