<template>
	<view>
		<block v-for="(item,index) in items" :key="index">
			
			
			<view style="margin-top: 20upx;border-bottom: 1upx solid #7d889a;font-weight: bold;line-height: 40upx;">
				<view style="font-size: 14px;padding: 20upx;">
					<view>名称：{{item.name||''}}</view>
					<view class="flex_sb">
						<view>地址：{{item.address}}</view>
						<view class="img_back" @tap="pasterNode(item.address)">
							<image src="/static/pro/copy.png" mode="aspectFit" style="height: 40upx;width:40upx;"></image>
						</view>
					</view>     
					<view>备注：{{item.details||''}}</view>
				</view>
				<view class="flex" style="width:97%;justify-content: flex-end;padding-bottom: 10upx;" @tap="delAddress(item.addressCode)">
					<view class="flex_c_c" style="color: #ff0000;width: 100upx;heigh: 90upx;border-radius: 20upx;border: 2upx solid #ff0000;font-size: 15px;">
						刪除
					</view>
				</view>
				
				
			</view>
		</block>
		<uniLoadMore :status="loadingType"></uniLoadMore>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	let _this,timer;
	export default {
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		onReachBottom:function(){
			 if (timer != null) {
			            clearTimeout(timer);
			        }
			   timer = setTimeout(function() {
			        _this.fetch();
			        }, 1000);
		},
		data() {
			return {
				loadingType:'more',
				pageNum: 1,
				pageSize: 20,
				items:[]
			};
		},
		onNavigationBarButtonTap:function(val){
			 
			this.tapSettingButton() 
		    
		},
		onShow:function(){
			this.fetch()
		},
		onLoad:function(){
			this.fetch()
		},
		methods:{
			pasterNode:function(address){
				uni.setClipboardData({
					data: address
				})
			},
			async fetch(){
				if (this.loadingType==''){
					return
				}
				let data ={
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				const res = await this.$http.get('/address/list',{data: data})
				if (res.data.data.isLastPage){
					this.loadingType = ''
				}else {
					this.pageNum +=1
				}
				this.items = res.data.data.list
				console.log(res)
			},
			async delAddress(code){
				let data ={
					addressCode: code
				}
				const res = await this.$http.get('/address/del',{data: data})
				uni.showToast({
					title: '删除成功'
				});
				this.fetch()
				
			},
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
