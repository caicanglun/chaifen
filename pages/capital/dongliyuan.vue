<template>
	<view>
		<view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;" @tap="toDetails(1)">
			<view class="flex_c">
				<text style="padding-left: 30upx;font-size: 15px;font-weight: bold;">動力A</text>
			</view>
			<view class="flex_c">
				<text style="padding-right: 20upx;font-size: 14px;">{{detail.recommend ||0.0000}}</text>
				<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
			</view>
		</view>
		<view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;" @tap="toDetails(2)">
			<view class="flex_c">
				<text style="padding-left: 30upx;font-size: 15px;font-weight: bold;">動力B</text>
			</view>
			<view class="flex_c">
				<text style="padding-right: 20upx;font-size: 14px;">{{detail.crash ||0.0000}}</text>
				<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
			</view>
		</view>
		<view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;" @tap="toDetails(3)">
			<view class="flex_c">
				<text style="padding-left: 30upx;font-size: 15px;font-weight: bold;">動力C</text>
			</view>
			<view class="flex_c">
				<text style="padding-right: 20upx;font-size: 14px;">{{detail.lead ||0.0000}}</text>
				<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:'',
				userDetail:''
			};
		},
		onLoad:function(){
			this.fetchUserDetail()
			this.fetchData()
		},
		methods:{
			async fetchUserDetail(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
				
			},
			async fetchData(){
				const res = await this.$http.get('/dm/bonus')
				this.detail = res.data.data
				console.log(res)
			},
			toDetails:function(e){
				if (e==1){
					uni.navigateTo({
						url: `./dongliA?usde=${this.userDetail.usde}`,
					});
				}else if (e ==2){
					uni.navigateTo({
						url: `./dongliB?usde=${this.userDetail.usde}`,
					});
				}else if (e ==3){
					uni.navigateTo({
						url: `./dongliC?usde=${this.userDetail.usde}`,
					});
				}
			}
		}
		
	}
</script>

<style lang="scss">
  page{
  	  background: #091224;
  	  color: white;
  }
</style>
