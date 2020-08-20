<template>
	<view>
		<view style="margin: 0 30upx;">
			<view class="topBlock">
				<view style="padding: 30upx;">
					<view class="flex_c_c" style="margin-top: 120upx;">
						<view style="font-size: 25px;font-weight: bold;font-style: italic;">创建熵生态<text style="padding-left: 20upx;">感受新境界</text></view>
					</view>
					<view class="flex_c_c" style="margin-top: 80upx;">
						<view style="font-size: 14px;">有限的生命力 <text style="padding-left: 20upx;">無限的熵世紀</text></view>
					</view>
				</view>
			</view>

		</view>
		<view style="margin-top: 40upx;padding: 0 39upx;">
			<view class="flex_sb">
				<view style="height: 210upx;;width: 320upx;background: #111c30;" @tap="toInitStore">
					<view class="flex_c_c"><image src="/static/gif/eco1.png" mode="aspectFit" style="padding-top:40upx;;height: 80upx;width: 80upx;"></image></view>
					<view style="margin-top:20upx;font-size: 15px;" class="flex_c_c">區塊瀏覽器</view>
					
				</view>
				<view style="height: 210upx;;width: 320upx;background: #111c30;" @tap="toContact">
					<view class="flex_c_c"><image src="/static/gif/eco2.png" mode="aspectFit" style="padding-top:40upx;;height: 80upx;width: 80upx;"></image></view>
					<view style="margin-top:20upx;font-size: 15px;" class="flex_c_c">聯系客服</view>
					
				</view>
				
			</view>
			<view class="flex_sb" style="margin-top: 20upx;">
				<view style="height: 210upx;;width: 320upx;background: #111c30;" @tap="toInitStore">
					<view class="flex_c_c"><image src="/static/gif/eco9.png" mode="aspectFit" style="padding-top:40upx;;height: 80upx;width: 80upx;"></image></view>
					<view style="margin-top:20upx;font-size: 15px;" class="flex_c_c">ECFPro</view>
					
				</view>
				
				<view style="height: 210upx;;width: 320upx;background: #111c30;" @tap="toInitStore">
					<view class="flex_c_c"><image src="/static/gif/eco4.png" mode="aspectFit" style="padding-top:40upx;;height: 80upx;width: 80upx;"></image></view>
					<view style="margin-top:20upx;font-size: 15px;" class="flex_c_c">我要申請</view>
					
				</view>
				
			</view>
			<view class="flex_sb" style="margin-top: 20upx;">
				<view style="height: 210upx;;width: 320upx;background: #111c30;" @tap="toThirdPlat">
					<view class="flex_c_c"><image src="/static/gif/etvpro.png" mode="aspectFit" style="padding-top:40upx;;height: 80upx;width: 80upx;"></image></view>
					<view style="margin-top:20upx;font-size: 15px;" class="flex_c_c">第三方平台</view>
					
				</view>
				
				<view style="height: 210upx;;width: 320upx;background: #111c30;" @tap="toThirdWallet">
					<view class="flex_c_c"><image src="/static/gif/third-wallet.png" mode="aspectFit" style="padding-top:40upx;;height: 80upx;width: 80upx;"></image></view>
					<view style="margin-top:20upx;font-size: 15px;" class="flex_c_c">第三方錢包</view>
					
				</view>
			</view>
		
			
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				record:[],
				isActive: true,
				level: [],
				selectIndex: -1,
				record:[],
				sliceIndex: 1,
				sliceArr: [{id: 1,name: '交易記錄'},{id: 2,name: '配送記錄'}],
				userDetail:'',
				storeRate: 0,
				pageNum: 1,
				pageSize: 20,
				flowType:'股份认购',
			};
		},
		onLoad:function(){
			// this.fetchList()
			// this.fetchList11()
			// this.fetchUserDetail()
		},
		methods:{
			toContact:function(){
				uni.navigateTo({
					url: './createMessage'	
				});
			},
			toInitStore:function(){
				uni.showToast({
					title: '待開發',
					icon: 'none',
				});
			},
			toThirdPlat:function(){
				uni.navigateTo({
					url:'./thirdPlat'
				})
			},
			toThirdWallet:function(){
				uni.navigateTo({
					url:'./thirdWallet'
					
				})
			}
		}
		
	}
</script>

<style lang="scss">
	page{
		  background: #091224;
		  color: white;
		  font-size: 15px;
	}
   .topBlock{
	height: 400upx;
	width: 100%;
	background: url(../../static/gif/asset.gif);
	background-size: 100% 100%;
  }
  .btn_class11{
  	color: #909baf;
  	font-size: 16px;
  	font-weight: bold;
  	display: flex;
  	width: 200upx;
  	height: 75upx;
  	border-radius: 8upx;
	margin-right: 30upx;
	margin-top: 30upx;
  	background: #2a3650;
  	justify-content: center;
  	align-items: center;
  }
</style>
