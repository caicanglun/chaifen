<template>
	<view>
		<view>
			<view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;">
				<view class="flex_c">
					<!-- <image src="/static/user1.png" class="iconClass" mode="aspectFit"></image> -->
					<text style="padding-left: 30upx;font-size: 16px;font-weight: bold;">{{ i18n.lang.clearStore}}</text>
				</view>
				<view class="flex_c">
					<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
				</view>
			</view>
			<view class="flex_c_c" style="margin-top: 40upx;height: 150upx;">
				<view class="confirmButton" @tap="clearStoreage">
					{{ i18n.lang.exit}}
				</view>
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
				
			};
		},
		onLoad:function(){
			uni.setNavigationBarTitle({
			    title:this.$i18nMsg().page.setting
			});
		},
		methods:{
			clearStoreage:function(){
				
				uni.removeStorage({
				    key: 'token',
				    success: function (res) {
				        console.log('success');
				    }
				});
				uni.redirectTo({
					url: '/pages/register/login'
				})
			}
		}
	}
</script>

<style lang="scss">
     page{
     	  background: #091224;
     	  color: white;
     }
	 .confirmButton{
	 	background: #283651;
	 	color: #34f073;
	 	width: 250upx;
	 	height: 80upx;
	 	font-size:14px;
	 	border-radius: 6upx;
	 	display: flex;
	 	justify-content: center;
	 	align-items: center
	 }  
		.iconClass{
			height: 60upx;
			width: 60upx;
		}
</style>
