<template>
	<view style="margin: 0 30upx;">
		<view class="topBlock">
			<view style="padding: 50upx;" class="flex_sa">
			
				<view class="flex_column">
					<view style="font-size: 15px;">我的直推</view>
					<view style="font-size:18px;font-weight: bold;text-align: center;">{{summary.recommendCount ||0}}</view>
				</view>
				<view class="flex_column">
					<view style="font-size: 15px;">我的團隊</view>
					<view style="font-size:18px;font-weight: bold;text-align: center;">{{summary.recommendDecimal ||0}}</view>
				</view>
				
			</view>
			<view style="padding: 50upx;" class="flex_sa">
			
				<view class="flex_column">
					<view style="font-size: 15px;">熵增</view>
					<view style="font-size:18px;font-weight: bold;text-align: center;">{{summary.leftCount ||0}}</view>
				</view>
				<view class="flex_column">
					<view style="font-size: 15px;">熵減</view> 
					<view style="font-size:18px;font-weight: bold;text-align: center;">{{summary.reghtCount ||0}}</view>
				</view>
				
			</view>
		</view>
		<view style="margin-top: 30upx;">
			<view class="flex_sa"  style="margin: 0 20upx;">
				<view style="background: #111c30;height: 200upx;width: 300upx;">
					<view class="flex_c_c" style="color:#7b869a;font-size:15px;padding-top: 50upx;">今日業績（USDF)</view>
					<view class="flex_c_c" style="font-size:20px;font-weight: bold;">{{userDetail.dayPerformance|| 0}}</view>
				</view>
				<view style="background: #111c30;height: 200upx;width: 300upx;">
					<view class="flex_c_c" style="color:#7b869a;font-size:15px;padding-top: 50upx;">團隊業績（USDF)</view>
					<view class="flex_c_c" style="font-size:20px;font-weight: bold;">{{userDetail.leftPerformance+userDetail.rightPerformance|| 0}}</view>
				</view>
			</view>
			<view class="flex_sa"  style="margin: 30upx 20upx;">
				<view style="background: #111c30;height: 200upx;width: 300upx;">
					<view class="flex_c_c" style="color:#7b869a;font-size:15px;padding-top: 50upx;">熵增業績（USDF)</view>
					<view class="flex_c_c" style="font-size:20px;font-weight: bold;">{{userDetail.leftPerformance|| 0}}</view>
				</view>
				<view style="background: #111c30;height: 200upx;width: 300upx;">
					<view class="flex_c_c" style="color:#7b869a;font-size:15px;padding-top: 50upx;">熵減業績（USDF)</view>
					<view class="flex_c_c" style="font-size:20px;font-weight: bold;">{{userDetail.rightPerformance|| 0}}</view>
				</view>
			</view>
		</view>
		<view style="margin: 50upx 30upx 0 30upx;color:#7b869a;font-size:18px;">節點關係</view>
		<view class="flex_c_c" style="margin-top: 20upx;" @tap="toTeamNode">
			<image src="/static/gif/asset-111.gif" mode="aspectFit" style="width: 500upx;height:300upx;"></image>
		</view>
	</view>
</template>

<script>
	import popMe from "@/components/popupMe.vue";
	export default {
		components:{
			popMe
		},
		data() {
			return {
				secondPassword:'',
				userDetail:'',
				summary:''
			};
		},
		onNavigationBarButtonTap:function(val){
			 
			uni.navigateTo({
				url: '/pages/capital/money',
			
			}); 
		    
		},
		onLoad:function(){
			this.fetch()
			this.fetchSumary()
		},
		methods:{
			
			async fetch(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
				
				
			},
			async fetchSumary(){
				const res  = await this.$http.get('/user/summarizing')
				console.log(res)
				this.summary = res.data.data
	
			},
			toSubAccounter:function(){
				uni.navigateTo({
					url: './subAccounter'
				});
			},
			toManage:function(){
				this.$refs.dialog.show()
			},
			confirmInput:function(e){
				this.secondPassword = e
			},
			toSetting:function(){
				uni.navigateTo({
					url: './setting',
				});
			},
			toTeamNode:function(){
				if (this.userDetail.staticUserStatus <1){
					uni.showToast({
						title: '请先激活认购',
						icon: 'none',
						duration: 2000
					});
					return
				}
				uni.navigateTo({
					url: '/pages/team/team',
					
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		  background: #091224;
		  color: white;
	}
.topBlock{
	height: 350upx;
	width: 100%;
	background: url(../../static/gif/team-back.gif);
	background-size: 100% 100%;
}
.iconClass{
	height: 60upx;
	width: 60upx;
}
</style>
