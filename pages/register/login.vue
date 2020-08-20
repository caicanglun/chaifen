<template>
	<view>
		<view class="topBlock" @tap="toLeadingWord">
				<view class="inClass">導入身份</view>
		</view>
		<view  class="flex_c_c" style="color: #7d889a;height: 80upx;font-size: 13px;">
			 已擁有錢包
		</view>
		<view  class="flex_c_c" style="color: #FFFFFF;height: 70upx;font-size: 18px;font-weight: bold;">OR</view>
		<view class="flex_c_c" @tap="toCreate">
			<view class="inClass" style="color: #fe2c2c">身份創建</view>
		</view>
		<view  class="flex_c_c" style="color: #7d889a;height: 80upx;font-size: 13px;">
			 第壹次使用錢包
		</view>
		<view @tap='toLogin' style="display: flex;margin: 100upx 30upx;justify-content: flex-end;font-size: 14px;color: white;">
			已有賬號，去登錄
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			toLeadingWord:function(){
				uni.navigateTo({
					url: './leadingWords',	
				});
			},
			toCreate:function(){
				uni.navigateTo({
					url: './register',	
				});
			},
			toLogin:function(){
				uni.navigateTo({
					url: './startLogin'
				});
			}
			
		}
	}
</script>

<style lang="scss">
  page{
	  background: #091224;
  }
  .topBlock{
	  width: 100%;
	  height: 500upx;
	  display: flex;
	  align-items: flex-end;
	  justify-content: center;
	  
  }
  .inClass{
	  color: #34f073;
	  font-size: 16px;
	  font-weight: bold;
	  display: flex;
	  width: 300upx;
	  height: 90upx;
	  border-radius: 8upx;
	  background: #121c31;
	  justify-content: center;
	  align-items: center;
  }
</style>
