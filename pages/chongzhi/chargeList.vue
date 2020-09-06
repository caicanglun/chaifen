<template>
	<view>
		
		<view class="flex_sb" style="font-size: 16px;margin-top:30upx;padding: 0 20upx;">
			<view>{{i18n.walletRecharge.exchangeRecord}}</view>
			
		</view>
		<popupMessage ref="dialog" title="友情提示" @input="confirmInput()" :label="content"></popupMessage>
		<view style="margin-top: 40upx;">
			<view class="flex_c" style="font-size: 14px;background: #23355d;height: 80upx;">
				<view style="width: 30%;padding-left: 20upx;">{{i18n.ecologyDetail.time}}</view>
				<view style="width: 30%;">{{i18n.ecologyDetail.type}}</view>
				<view style="width: 40%;display: flex;justify-content: flex-end;padding-right: 20upx;">{{i18n.ecologyDetail.amount}}</view>
			</view>
			<block v-for="(item,index) in record" :key="index">
				<view style="margin-top:20upx;">
					<view class="flex_c" style="font-size: 14px;height: 80upx;background: #1a2843;padding-bottom: 30upx;">
						<view style="width: 30%;padding-left: 20upx;">{{item.createTime}}</view>
						<view style="width: 30%;">{{item.applyStatusName}}</view>
						<view style="width: 40%;display: flex;justify-content: flex-end;padding-right: 20upx;">{{item.money}}</view>
					</view>
					<view class="flex" style="background: #1a2843;width:100%;justify-content: flex-end;padding-bottom: 20upx;" >
						<view class="flex_c_c btnClass" style="margin-right: 20upx;" @tap="showPicture(item.provePicture)" v-if="item.proofPicture !==''">
							{{i18n.walletRecharge.showPayPic}}
						</view>
						
						<view class="flex_c_c btnClass" @tap="showDialog(item.applyCode)" v-if="item.applyStatusCode==1">
							{{i18n.common.cancel}}
						</view>
					</view>
				</view>
				
				
			</block>
			<uniLoadMore :status="loadingType"></uniLoadMore>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import popupMessage from "@/components/popupMessage.vue"
	let _this,timer;
	export default {
		components:{
			uniLoadMore,
			popupMessage
		},
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		data() {
			return {
				applyCode:'',
				record:[],
				loadingType: 'more',
				pageNum: 1,
				pageSize: 20,
				content:''
				
			};
		},
		onReachBottom:function(){
			 if (timer != null) {
			            clearTimeout(timer);
			        }
			   timer = setTimeout(function() {
			        _this.fetchList();
			        }, 1000);
		},
		onLoad:function(){
			_this = this
			uni.setNavigationBarTitle({
			            title:this.$i18nMsg().page.exchageRecord
			        });
			this.fetchList()
			
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
			showDialog:function(e){
				this.applyCode = e
				this.content = `確認要取消該單嗎？`
				this.$refs.dialog.show()
			},
			confirmInput:function(type){
				this.cancelOrder()
			
			},
			showPicture:function(src){
				uni.previewImage({
					urls: [src],
					success:function(){
						console.log('正在预览中')
					}
					
				})
			},
			handleDate:function(d){
				let arr = d.split(' ')
				let date1 = arr[0].split('-')
				let date2 = arr[1].split(':')
				
				return date1[1]+'-'+date1[2]+' '+date2[0]+':'+date2[1]
			},
			async fetchList(){
				let data ={
					pageNum: this.pageNum,
					pageSize: this.pageSize
					
				}
				const res = await this.$http.get('/topup/apply_list',{data: data})
				this.record = res.data.data.list
				this.record.forEach((item)=>{
					item.createTime = this.handleDate(item.createTime)
					
				})
				
				// this.filterList(res.data.data.list)
				// this.zijinlistback(res.data.data.list)
				// this.record = this.zijinList
				console.log(res)
			},
	        async cancelOrder(){
				let data ={
					applyCode: this.applyCode
				}
				uni.showLoading({
					title: '提交中',
					mask: true
				})
				const res = await this.$http.get('/topup/apply_del',{data: data})
				uni.hideLoading()
				uni.showToast({
					title: '已取消',
					duration: 1500
				});
				
				this.fetchList()
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
	.btnClass{color: #34f073;width: 150upx;heigh: 90upx;border-radius: 20upx;border: 2upx solid #34f073;font-size: 15px;}
	
</style>
