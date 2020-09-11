<template>
	<view>
		<view style="margin: 20upx 30upx;"> 
			<view style="font-size: 16px;">買入熵值(ETF)</view>
			<view class="flex_sb" style="margin-top: 20upx;">
				<view class="flex_column">
					<view style="color: #6c7587;font-size: 14px;">成交總額(初始源)</view>
					<view style="font-size: 15px;margin-top: 10upx;">{{detail.totalPrice}}</view>
				</view>
				<view>
					<view style="color: #6c7587;font-size: 14px;">成交均價(初始源)</view>
					<view style="font-size: 15px;margin-top: 10upx;" class="flex_c_c">{{detail.unitPrice}}</view>
				</view>
				<view>
					<view style="color: #6c7587;font-size: 14px;">成交量(ETF)</view>
					<view style="font-size: 15px;margin-top: 10upx;justify-content: flex-end;" class="flex">{{detail.stockCount}}</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 20upx;background: #111c30;"></view>
		<block v-for="(item,index) in detail.list" :key="index">
			<view style="margin: 10upx 30upx;line-height: 30px;">
				<view class="flex_sb">
					<view style="font-size: 14px;">時間</view>
					<view style="font-size: 14px;">{{item.createTime}}</view>	
				</view>
				<view class="flex_sb">
					<view style="font-size: 14px;">成交價</view>
					<view style="font-size: 14px;">{{item.unitPrice}}</view>	
				</view>
				<view class="flex_sb">
					<view style="font-size: 14px;">成交量</view>
					<view style="font-size: 14px;">{{item.stockCount}}</view>	
				</view>
				<view style="width: 100%;height: 10upx;background: #111c30;"></view>
			</view>
			
		</block>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:''
			};
		},
		onLoad:function(){
		   this.fetchList()	
		},
			
		methods:{
			async fetchList(){
				
				const res = await this.$http.get('/st/buy_details')
				this.detail = res.data.data
				console.log(res)
				this.detail.list.forEach((item)=>{
					item.createTime = this.handleDate(item.createTime)
				})
				
			},
			handleDate:function(d){
				let arr = d.split(' ')
				let date1 = arr[0].split('-')
				let date2 = arr[1].split(':')
				
				return date1[1]+'-'+date1[2]+' '+date2[0]+':'+date2[1]
			},
		}
		
	}
</script>

<style lang="scss">
page{background:#091224;width: 750upx;overflow-x: hidden;color: #FFFFFF;}
</style>
