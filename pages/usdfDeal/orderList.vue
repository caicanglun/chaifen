<template>
	<view>
		<view class="flex">
			<view class="flex_c_c" :class="[dataIndex==1?'buySellActive':'buySell']" data-index='1' @tap="selectLabel">{{ i18n.otc.buyPending}}</view>
			<view class="flex_c_c" :class="[dataIndex==2?'buySellActive':'buySell']" data-index='2' @tap="selectLabel">{{ i18n.otc.sellPending}}</view>
		</view>
		
		
		<block v-for="(item,index) in items" :key="index">
			<view class="flex_sb" style="padding: 0upx 20upx;margin-top: 20upx;">
				<view style="font-size: 15px;font-weight: bold;">{{dataIndex==1?i18n.trade.buyIn:i18n.trade.sellOut}}USDF</view>
				<view style="font-size: 15px;color: #7d889a;font-weight: bold;">{{item.isFinish==0?i18n.trade.processing:i18n.trade.completed}}</view>
			</view>
			<view class="flex_c" style="font-size: 14px;height: 80upx;color: #7d889a;">
				<view style="width: 30%;padding-left: 20upx;">{{ i18n.trade.time}}</view>
				<view style="width: 50%;">{{ i18n.otc.tradeTotal}}</view>
				<view style="width: 20%;display: flex;justify-content: flex-end;padding-right: 20upx;">{{ i18n.trade.amount}}(USDF)</view>
			</view>
			<view style="margin-top: 20upx;border-bottom: 1upx solid #7d889a;font-weight: bold;">
				<view class="flex_c" style="font-size: 14px;height: 80upx;padding: 10upx;">
					<view style="width: 30%;padding-left: 20upx;">{{item.createTime||''}}</view>
					<view style="width: 20%;">{{item.cnyUnitPrice*item.usde}}CNY/{{item.usdtUnitPrice*item.usde |returnNumber}}USDT</view>
					<view style="width: 50%;display: flex;justify-content: flex-end;padding-right: 20upx;">{{item.usde||''}}</view>
				</view>
				<view class="flex" style="width:97%;justify-content: flex-end;padding-bottom: 10upx;" @tap="delOrder(item.orderCode)">
					<view class="flex_c_c" style="color: #ff0000;width: 100upx;heigh: 90upx;border-radius: 20upx;border: 2upx solid #ff0000;font-size: 15px;">
						{{ i18n.otc.deleteText}}
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
		components:{
			uniLoadMore
		},
		filters:{
			returnNumber:function(e){
				return e.toFixed(4)
			}
			
		},
		data() {
			return {
				loadingType:'more',
				dataIndex: 1,
				pageNum: 1,
				pageSize: 20,
				items:[],
				userDetail:''
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
			uni.setNavigationBarTitle({
			    title:this.$i18nMsg().otc.myPending
			});
			_this = this
			this.fetchList()
		},
		methods:{
			async fetchList(){
				if (this.loadingType == ''){
					return
				}
				let data ={
					userCode: '1111',	//用户编码。查看本用户的时候，随便传个值。否则传空字符串
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				if (this.dataIndex ==1){
					const res = await this.$http.get('/udeal/buy_list',{data: data})
					if (res.data.data.isLastPage){
						this.loadingType = ''
					}else {
						this.pageSize += 20
					}
					this.items = res.data.data.list
				}else {
					const res = await this.$http.get('/udeal/sell_list',{data: data})
					if (res.data.data.isLastPage){
						this.loadingType = ''
					}else {
						this.pageSize += 20
					}
					this.items = res.data.data.list
				}

			},
			async delOrder(orderCode){
				
				uni.showModal({ 
					title: "友情提示",  
					content: '確認要取消訂單嗎？',  
					success:  async (res) => {  
						if (res.confirm) {  
							let data ={
								orderCode: orderCode,		//买/卖单编码
								buyOrSell: this.dataIndex		//1买，2卖
							}
							const res = await this.$http.get('/udeal/cancel_order',{data: data})
							this.loadingType = 'more'
							this.fetchList()
							
							
						}	
					}  
				})  
				
			},
			selectLabel:function(e){
				this.dataIndex = e.target.dataset.index
				this.pageSize = 20
				this.loadingType = 'more'
				this.fetchList()
				
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
</style>
