<template>
	<view>
		<view style="margin: 20upx; 30upx;">
			<view class="flex_sb">
				<view class="flex_c">
					<image src='/static/usdt.png' mode="aspectFit" style="width: 40upx; height: 40upx;"></image>
					<text style="padding-left: 20upx;">USDT</text>
				</view>
			    <view @tap="toEdit">
					{{ i18n.payment.edit}}
				</view>
			</view>
			<view style="color: #909baf;margin-top: 20upx;">
				{{userDetail.usdtType||''}}
			</view>
			<view style="margin-top: 20upx;font-weight: bold;">{{userDetail.usdtAddress||''}}</view>
			<view v-if="userDetail.qrCode!==''">
				<view class="flex_c_c" style="margin-top: 100upx;" @tap="showPicture(userDetail.qrCode)">
					<image :src = "userDetail.qrCode" mode="aspectFit" style="width: 300upx;height:300upx;"></image>
				</view>
				<view class="flex_c_c" style="font-size; 17px;font-weight: bold;margin-top: 30upx;">掃碼充值</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		data() {
			return {
				userDetail:''
				
			};
		},
		onShow:function(){
			this.fetch()
		},
		onLoad:function(){
			uni.setNavigationBarTitle({
			    title:this.$i18nMsg().user.payment
			});
		    this.fetch()	
		},
		methods:{
			showPicture:function(src){
				uni.previewImage({
					urls: [src],
					success:function(){
						console.log('正在预览中')
					}
					
				})
			},
			async fetch(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
			},
			toEdit:function(){
				uni.navigateTo({
					url: './editPayAddress',
				});
			}
		}
	}
</script>

<style lang="scss">
  page{background:#091224;width: 750upx;overflow-x: hidden;color: #FFFFFF;font-size: 15px;}
</style>
