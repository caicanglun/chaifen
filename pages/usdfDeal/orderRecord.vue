<template>
	<view>
		<view class="flex">
			<view class="flex_c_c" :class="[dataIndex==1?'buySellActive':'buySell']" data-index='1' @tap="selectLabel">未完成</view>
			<view class="flex_c_c" :class="[dataIndex==2?'buySellActive':'buySell']" data-index='2' @tap="selectLabel">已完成</view>
		</view>
		
		<popupMessage ref="dialog" title="友情提示" @input="confirmInput()" :label="content"></popupMessage>
		<block v-for="(item,index) in items" :key="index">
			<view class="flex_sb" style="padding: 0upx 20upx;margin-top: 20upx;">
				<view style="font-size: 15px;font-weight: bold;">{{item.buyOrSell==1?'買入':'賣出'}}USDF</view>
				<view style="font-size: 15px;color: #7d889a;font-weight: bold;">{{item.dealStatus | returnStatus}}</view>
			</view>
			<view class="flex_c" style="font-size: 14px;height: 80upx;color: #7d889a;">
				<view style="width: 30%;padding-left: 20upx;">時間</view>
				<view style="width: 50%;">交易總額</view>
				<view style="width: 20%;display: flex;justify-content: flex-end;padding-right: 20upx;">數量(USDF)</view>
			</view>
			<view style="margin-top: 20upx;border-bottom: 1upx solid #7d889a;font-weight: bold;">
				<view class="flex_c" style="font-size: 14px;height: 80upx;padding: 10upx;">
					<view style="width: 30%;padding-left: 20upx;">{{item.createTime||''}}</view>
					<view style="width: 20%;">{{item.cnyUnitPrice*item.usde}}CNY/{{item.usdtUnitPrice*item.usde | returnNumber}}USDT</view>
					<view style="width: 50%;display: flex;justify-content: flex-end;padding-right: 20upx;">{{item.usde||''}}</view>
				</view>
				<view class="flex_c" style="font-size: 14px;padding-left: 20upx;height: 70upx;" v-if="item.buyOrSell==1&&item.dealStatus<2">
					
					<image src='/static/usdt.png' mode="aspectFit" style="width: 40upx; height: 40upx;"></image>
					<text style="color:#7d889a;padding-left: 10upx;">{{item.sellUsdtType}}</text>
				    <text style="padding-left: 20upx;" @longpress="toCopy(item.sellUsdtAddress)">{{item.sellUsdtAddress}}</text>
					<image src="../../static/home-code.png" @tap="showPicture(item.sellQrCode)" v-if="item.sellQrCode!==''" mode="aspectFit" style="width: 40upx; height: 40upx;padding-left: 40upx;"></image>
				</view>
					
				<view class="flex" style="width:97%;justify-content: flex-end;padding-bottom: 10upx;margin-top: 10upx;" >
					<view class="flex_c_c btnClass" style="margin-right: 20upx;" @tap="showPicture(item.proofPicture)" v-if="item.proofPicture !==''">
						查看憑證
					</view>
					<view class="flex_c_c btnClass" @tap="uploadPZ(item.dealCode)" v-if="item.buyOrSell==1&&item.dealStatus<2">
						上傳憑證
					</view>
					<view class="flex_c_c btnClass" @tap="showDialog(item.dealCode)" v-if="item.buyOrSell==2&&item.dealStatus<2">
						完成訂單
					</view>
				</view>
				
				
			</view>
		</block>
		<popupVerify ref="dialogVerify" @input="confirmFinish" :phone="userDetail.phone" :email="userDetail.mail"></popupVerify>
		<uniLoadMore :status="loadingType"></uniLoadMore>
			
		
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import popupVerify from "@/components/popupVerify.vue"
	import popupMessage from "@/components/popupMessage.vue"
	let _this,timer;
	export default {
		components:{
			uniLoadMore,
			popupMessage,
			popupVerify
		},
		filters:{
			
			returnNumber:function(e){
				return e.toFixed(4)
			},
			returnStatus:function(e){
				if (e ==0){
					return '等待交易'
				}else if (e ==1){
					return '已上傳憑證'
				}else if (e == 2){
					return '已完成'
				}
				else if(e == 3){
					return '已取消'
				}
			}
		},
		
		data() {
			return {
				loadingType:'more',
				dataIndex: 1,
				pageNum: 1,
				pageSize: 20,
				items:[],
				userDetail:'',
				isFinish: 0,
				content:'',
				dealCode:''
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
		onShow:function(){
			this.fetchList()
			this.fetchUserDetail()
		},
		onLoad:function(){
			_this = this
			this.fetchList()
			this.fetchUserDetail()
		},
		methods:{
			async fetchUserDetail(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
				
				
			},
			toCopy:function(data){
				uni.setClipboardData({
					data: data
				})
			},
			showDialog:function(e){
				this.dealCode = e
				this.content = `請務必登錄第三方支付賬戶確認收到該筆支付，
                                我確認已登錄收幣賬戶，並核對收幣無誤`
				this.$refs.dialog.show()
			},
			confirmInput:function(type){
				this.$refs.dialogVerify.show()
				// this.finishOrder()

			},
			confirmFinish:function(){
				
				this.finishOrder()
			},
			async fetchList(){
				if (this.loadingType == ''){
					return
				}
				let data ={
					isFinish: this.isFinish,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				
				const res = await this.$http.get('/udeal/udeal_list',{data: data})
				if (res.data.data.isLastPage){
					this.loadingType = ''
				}else {
					this.pageSize += 20
				}
				this.items = res.data.data.list
				
				
				console.log(res)
			},
			showPicture:function(src){
				uni.previewImage({
					urls: [src],
					success:function(){
						console.log('正在预览中')
					}
					
				})
			},
			async finishOrder(){
				let data ={
					dealCode: this.dealCode
				}
				uni.showLoading({
					title: '提交中',
					mask: true
				})
				const res = await this.$http.get('/udeal/finish',{data: data})
				uni.hideLoading()
				uni.showToast({
					title: '訂單已完成',
					duration: 1500
				});
				this.dataIndex = 2
				this.isFinish = 1
				this.items= []
				this.fetchList()
			},
			uploadPZ:function(code){
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        _this.pictures = ''
								 
						  uni.uploadFile({
							  url: 'http://test.144f.com:8080/sl-web'+'/basicdata/upload', 
							  filePath: tempFilePaths[0],
							  name:'file',
							  success: async (uploadFileRes) => {
								  console.log(uploadFileRes);	
								  _this.pictures=JSON.parse(uploadFileRes.data).data.msg
								  uni.showToast({
									title: '上传成功',
									icon:'none',
									duration: 1000
								  });
								  let data ={
									  dealCode:code,
									  proof: _this.pictures
								  }
								  const res = await this.$http.get('/udeal/upload_proof',{data: data})
								  console.log(res)
								  this.fetchList()
							  }
						 });
					},
				})	
			},
			// async delOrder(orderCode){
			// 	uni.showModal({ 
			// 		title: "友情提示",  
			// 		content: '確認要取消訂單嗎？',  
			// 		success:  async (res) => {  
			// 			if (res.confirm) {  
			// 				let data ={
			// 					orderCode: orderCode,		//买/卖单编码
			// 					buyOrSell: this.dataIndex		//1买，2卖
			// 				}
			// 				const res = await this.$http.get('/udeal/cancel_order',{data: data})
			// 				console.log(res)
			// 			}	
			// 		}  
			// 	})  
				
			// },
			selectLabel:function(e){
				this.dataIndex = e.target.dataset.index
			    
				this.pageSize = 20
				this.loadingType = 'more'
				
				if (this.dataIndex == 2){
					this.isFinish = 1
					this.fetchList()
				}
				if (this.dataIndex == 1){
                    this.isFinish = 0
					this.fetchList()
				}
			},
			
		}
		
	}
</script>

<style lang="scss">
    page{background:#091224;width: 750upx;overflow-x: hidden;color: #FFFFFF;}
    .buySellActive{background: #1b2944;color: #FFFFFF;width:50%;height: 100upx;font-size: 15px;}
    .buySell{background: #111c30;color: #3d4663;width:50%;height: 100upx;font-size: 15px;}
	.tip{
		  color: #7d889a;
		  font-size: 13px;
	}
	.inputClass{
		  background: #121c31;
		  height: 90upx;
		  border-radius: 8upx;
		  padding-left: 20upx;
		  font-size: 14px;
		  color: #FFFFFF;
		  width: 70%;
	}
	.placeholderClass{
		  color: #7d889a;
		  font-size: 14px;
	}
	.inClass{
		  color: #34f073;
		  font-size: 16px;
		  font-weight: bold;
		  display: flex;
		  width: 300upx;
		  height: 90upx;
		  border-radius: 8upx;
		  background: #2a3650;
		  justify-content: center;
		  align-items: center;
	}
	.btnClass{color: #34f073;width: 150upx;heigh: 90upx;border-radius: 20upx;border: 2upx solid #34f073;font-size: 15px;}
</style>
