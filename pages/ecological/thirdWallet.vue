<template>
	<view style="margin: 0 30upx;">
		
		<view class="flex_sb" style="color:#818b9e;font-size: 15px;">
			<view>平臺</view>
			<view>官網地址</view>
		</view>
			
		<view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;" @tap="showDialog(1)">
			<view class="flex_c">
				<image src="/static/thirdPlat/imtoken.jpg" class="iconClass" mode="aspectFit"></image>
				<text style="padding-left: 30upx;font-size: 16px;font-weight: bold;">imToken</text>
			</view>
			<view class="flex_c">
				<text style="color:#818b9e;font-size: 14px;padding-right: 10upx;">https://www.token.im/</text>
				
				<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
			</view>
		</view>
		<view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;" @tap="showDialog(2)">
			<view class="flex_c">
				<image src="/static/thirdPlat/eoks.jpg" class="iconClass" mode="aspectFit"></image>
				<text style="padding-left: 30upx;font-size: 16px;font-weight: bold;">OKEX錢包</text>
			</view>
			<view class="flex_c">
				<text style="color:#818b9e;font-size: 14px;padding-right: 10upx;">https://www.okex.me/</text>
				<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
			</view>
		</view>
		
		
		<view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;" @tap="showDialog(5)">
			<view class="flex_c">
				<image src="/static/thirdPlat/huobi.jpg" class="iconClass" mode="aspectFit"></image>
				<text style="padding-left: 30upx;font-size: 16px;font-weight: bold;">火币錢包</text>
			</view>
			<view class="flex_c">
				<text style="color:#818b9e;font-size: 14px;padding-right: 10upx;">https://www.huobi.me/</text>
				<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
			</view>
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
				userDetail: '',
				index:''
			};
		},
		onShow:function(){
			
		},
		onLoad:function(){
			
		},
		methods:{
			
			showDialog:function(e){
				switch(e){
					case 1: 
					  plus.runtime.openWeb('https://www.token.im/')
					  break
					case 2:
					  plus.runtime.openWeb('https://www.okex.me/')
					  break
					case 3:
					  plus.runtime.openWeb('https://pro.coinbase.com/')
					  break
					case 4:
					  plus.runtime.openWeb('https://www.binancezh.com/')
					  break
					case 5:
					  plus.runtime.openWeb('https://www.huobi.me/')
					  break
					
				}
				
			},
			
		}
	}
</script>

<style lang="scss">
	page{
		  background: #091224;
		  color: white;
	}
	.text-overflow{
	  white-space:nowrap;      
	  overflow:hidden;    
	  text-overflow:ellipsis; 
	  font-size: 12px;
	  width: 450upx;
	  
	  
	}
.topBlock{
	height: 400upx;
	width: 100%;
	background: url(../../static/gif/asset.gif);
	background-size: 100% 100%;
}
.iconClass{
	height: 60upx;
	width: 60upx;
}
</style>
