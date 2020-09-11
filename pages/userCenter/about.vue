<template>
	<view>
		<view class="flex_c_c" style="margin-top: 150upx;">
			<image src="/static/gif/eco8.png" mode="aspectFit" style="height: 150upx;width: 150upx;"></image>
		</view>
		<view class="flex_c_c" style="font-size: 18px;font-weight: bold;">
			 ETF
		</view>
		<view class="flex_sb" style="align-items: center;margin-top: 100upx;border-bottom: 1upx solid #2a3855;padding: 0 20upx;height: 100upx;">
			<view style="font-size: 15px;">版本</view>
			<view style="font-size: 15px;color: #999999">{{ version }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version:''
			};
		},
		onLoad:function(){
			this.version = plus.runtime.version
		}
	}
</script>

<style lang="scss">
page{
	  background: #091224;
	  color: white;
  }
</style>
