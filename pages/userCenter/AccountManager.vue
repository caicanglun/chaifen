<template>
	<view>
		<view style="margin: 10upx 30upx;">
			<view style="background: #121c31;height: 80upx;" class="flex_c">
				<image src="/static/icon_search@2x.png" style="width: 20upx;height:20upx;padding-right: 20upx;" mode="aspectFit"></image>
				<input placeholder="賬戶名/地址" v-model="searchCode" width="7" type="text" @confirm="inputConfirm" placeholder-style="color: #909baf;font-size:15px;padding-left: 10upx;" class="searchTeam">
			</view>
		    <view style="margin-top: 20upx;color: #909baf;font-size: 14px;">輕觸賬戶進行切換</view>
		    <block>
				<view style="margin-top: 20upx;padding:20upx;background: #121c31;"> 
					<view class="flex">
						<text style="font-size: 16px;font-weight: bold;">AFH</text>
						<view class="flex_c_c btnClass" style="margin-left: 20upx;">當前賬戶</view>
					</view>
					<view class='flex_sb' style="margin-top: 20upx;">
						<view style="width: 450upx; font-size: 13px;word-wrap: break-word;"><text>0x234242992340923049230492304923940234dfgerg</text></view>
						<view class="flex_c" style="color: #FF0000;font-size: 15px;">刪除</view>
					</view>
				</view>
			</block>
			
			<uniLoadMore :status="loadingType"></uniLoadMore>
			
		</view>
		<veiw class="bottomBlock">
			
			<view class="flex_sa" style="margin-top: 50upx;">
				<view class="btn_class" @tap="toImportID">導入身份</view>
				<view class="btn_class" style="color: #ff0000" @tap="createNewAccount">創建新賬戶</view>
			</view>
			
			
			
		</veiw>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	let _this,timer;
	export default {
		components:{
			uniLoadMore
		},
		data() {
			return {
				record:[{time: '01-12 06:05',usde: '25.2356',counter: '50.0000'}],
				loadingType: 'more',
				searchCode:''
				
			};
		},
		onLoad:function(){
			_this = this
			// this.fetchList()
		
		},
		onReachBottom:function(){
			 if (timer != null) {
			            clearTimeout(timer);
			        }
			   timer = setTimeout(function() {
			        _this.fetchMoreList();
			        }, 1000);
		},
		methods:{
			toImportID:function(){
				uni.navigateTo({
					url: './importID'
				
				});
			},
			createNewAccount:function(){
				uni.navigateTo({
					url: './createNewAccount'
					
				});
			},
			inputConfirm:function(){
				
			}
		}
	}
</script>

<style lang="scss">
     page{
		  background: #091224;
		  color: white;
	}
	.bottomBlock{
		background: #000000;
		width: 100%;
		height: 200upx;
		position: fixed;
		bottom: 0;
		z-index: 99;
		
		
	},
	.topBlock{
		height: 400upx;
		width: 100%;
		background: url(../../static/gif/asset.gif);
		background-size: 100% 100%;
	}
		
	.switchTab{
		color: #909baf;
		font-size:14px;
		margin-right: 30upx;
		padding: 5upx 10upx;
		border-radius: 5upx;
	}
	.active{
		color: #34F073;
		font-size:14px;
		margin-right: 30upx;
		background: #283651;
		padding: 5upx 10upx;
		border-radius: 5upx;
	}
	.btnClass{color: #34f073;width: 140upx;heigh: 80upx;border-radius: 20upx;border: 2upx solid #34f073;font-size: 13px;}
	
</style>
