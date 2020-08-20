<template>
	<view>
		<view class='flex_c_c' style="font-size: 14px;margin-top: 30upx;">沒有更多數據</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onNavigationBarButtonTap:function(val){
			 
			this.tapSettingButton() 
		    
		},
		methods:{
			tapSettingButton:function(){
				uni.navigateTo({
					url: './createAddress'
				
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
</style>
