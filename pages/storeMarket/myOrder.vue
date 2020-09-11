<template>
	<view>
		<view class="flex">
			<view class="flex_c_c" :class="[dataIndex==1?'buySellActive':'buySell']" data-index='1' @tap="selectLabel">全部</view>
			<view class="flex_c_c" :class="[dataIndex==2?'buySellActive':'buySell']" data-index='2' @tap="selectLabel">進行中</view>
			<view class="flex_c_c" :class="[dataIndex==3?'buySellActive':'buySell']" data-index='3' @tap="selectLabel">已完成</view>
		</view>
		<view  @tap="toOrderDetail" class="flex_sb" style="align-items: center;font-size: 16px;padding-left: 40upx;height: 90upx;padding-right: 20upx;">
			<view>我要買</view>
			<view class="flex_c">
				<text style="font-size: 15px;padding-right: 10upx;">已完成</text><image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
			</view>
		</view>
		<view style="margin-top: 40upx;">
			<view class="flex_c" style="font-size: 14px;height: 80upx;color: #6c7587;">
				<view style="width: 30%;padding-left: 20upx;">時間</view>
				<view style="width: 20%;">數量(ETF)</view>
				<view style="width: 50%;display: flex;justify-content: flex-end;padding-right: 20upx;">金額(初始源)</view>
			</view>
			<block v-for="(item,index) in record" :key="index">
				<view class="flex_c" v-if="item.isFinish==1" style="font-size: 14px;height: 80upx;padding-bottom: 30upx;" @tap="toOrderDetail">
					<view style="width: 30%;padding-left: 20upx;">{{item.createTime}}</view>
					<view style="width: 20%;">{{item.stockCount}}</view>
					<view style="width: 50%;display: flex;justify-content: flex-end;padding-right: 20upx;">{{item.totalPrice}}</view>
				</view>
			</block>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				record:[],
				dataIndex: 1,
				pageSize: 60,
				pageNum: 1,
				type: 0
			};
		},
		onLoad:function(){
			this.fetchList()
		},
		methods:{
			async fetchList(){
				let data ={
					type: this.type
				}
				const res = await this.$http.get('/st/buy_list',{data: data})
				this.record = res.data.data.list
				this.record.forEach((item)=>{
					item.createTime = this.handleDate(item.createTime)
				})
				console.log(res)
			},
			toOrderDetail:function(){
				uni.navigateTo({
					url: './dealDetail'
					
				});
			},
			handleDate:function(d){
				let arr = d.split(' ')
				let date1 = arr[0].split('-')
				let date2 = arr[1].split(':')
				
				return date1[1]+'-'+date1[2]+' '+date2[0]+':'+date2[1]
			},
			selectLabel:function(e){
				this.dataIndex = e.target.dataset.index
				if (this.dataIndex ==1){
					this.type =0
				}else if (this.dataIndex ==2){
					this.type = 1
				}else if (this.dataIndex ==3){
					this.type = 2
				}
				this.fetchList()
			},
		}
	}
</script>

<style lang="scss">
page{background:#091224;width: 750upx;overflow-x: hidden;color: #FFFFFF;}
.buySellActive{background: #1b2944;color: #FFFFFF;width:33%;height: 100upx;font-size: 15px;}
.buySell{background: #111c30;color: #FFFFFF;width:33%;height: 100upx;font-size: 15px;}
</style>
