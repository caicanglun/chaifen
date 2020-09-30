<template>
	<view>
		<view class="flex_sb" style="padding: 0 10upx;height: 80upx;">
			<view></view>
			<view class="flex_sb" style="width: 350upx;">
				<view class="flex_c_c" :class="[dataIndex==1?'buySellActive':'buySell']" data-index='1' @tap="selectLabel">{{ i18n.trade.buyIn}}</view>
				<view class="flex_c_c" :class="[dataIndex==2?'buySellActive':'buySell']" data-index='2' @tap="selectLabel">{{ i18n.trade.sellOut}}</view>
			</view>
		    <view class="flex_c" style="font-size: 30px;font-weight: bold;width:60upx;padding-bottom: 30upx;position: relative;" @tap="setShowLabel">... 
			</view>	
		</view>
		<popupMenu ref="dialog" title="友情提示" @input="confirmInput" :label="content"></popupMenu>
		<view style="background: #111c30;width: 100%;height: 80upx;margin-top: 20upx;">
			<view class="flex_c_c" style="background:#1b2944;font-size: 15px;width: 130upx;height: 80upx;">USDF</view>
		</view>
		<block v-for="(item,index) in items" :key="index">
			<view style="padding:10upx 20upx;margin-top: 20upx;" v-if="item.isFinish==0">
				<view class="flex_sb">
				    <view class="flex_c">
						<view v-if="item.icon!==''">
							<image :src="item.icon" mode="aspectFit" style="width: 40upx;height: 40upx;"></image>
						</view>
						<view v-else>
							<image src="/static/gif/eco8.png" mode="aspectFit" style="width: 50upx;height: 50upx;"></image>
						</view>
						<text style="font-size: 15px;font-weight: bold;padding-left: 20upx;">{{item.userName}}</text>
					</view>
					<view style="font-size: 14px;font-weight: bold;">{{item.creditLevel}}{{ i18n.trade.starCredit}}</view>
				</view>
				<view class="flex_sb">
					<view>
						<view><text style="color: #7d889a;font-size: 15px;">{{ i18n.trade.amount}}</text><text style="padding-left:10upx;font-size: 16px;font-weight: bold;">{{item.usde}}</text> </view>
						<view><text style="color: #7d889a;font-size: 15px;">{{ i18n.trade.tradePrice}}</text><text style="padding-left:10upx;font-size: 16px;font-weight: bold;">{{item.usdtUnitPrice}}USDT/{{item.cnyUnitPrice}}CNY</text>  </view>
					</view>
					<view class="flex_c">
						<image src="/static/usdt.png" mode="aspectFit" style="width: 40upx;height: 40upx;"></image>
					</view>
				</view>
			</view>
			
		</block>
		
		<uniLoadMore :status="loadingType"></uniLoadMore>
			
	</view>
</template>

<script>
	import popupMenu from "@/components/popupMenu.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	let _this,timer;
	export default {
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		components:{
			popupMenu,
			uniLoadMore
		},
		data() {
			return {
				loadingType:'more',
				content:'',
				isShowLabel: false,
				dataIndex: 1,
				form:{
					counter:''
				},
				secondPass:'',
				current: 0,
				items:[],
				pageNum: 1,
				pageSize: 20,
			
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
			    title:this.$i18nMsg().page.USDFTransaction
			});
			this.fetchList()
		},
		methods:{
			async fetchList(){
				if (this.loadingType == ''){
					return
				}
				let data ={
					userCode: '',	//用户编码。查看本用户的时候，随便传个值。否则传空字符串
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
					console.log(res)
				}else {
					const res = await this.$http.get('/udeal/sell_list',{data: data})
					if (res.data.data.isLastPage){
						this.loadingType = ''
					}else {
						this.pageSize += 20
					}
					this.items = res.data.data.list
					console.log(res)
				}
				
			},
			showDialog(){
				this.$refs.dialog.show()
			},
			setShowLabel:function(){
				this.isShowLabel = !this.isShowLabel
				this.showDialog()
			},
			selectLabel:function(e){
				this.dataIndex = e.target.dataset.index
				this.pageSize = 20
				this.loadingType = 'more'
				this.fetchList()
				
			},
			async submit(){
				
			},
			confirmInput:function(e){
				console.log(e)
				if (e==1){
					uni.navigateTo({
						url: './orderRecord'
						
					});
				}else if (e ==2){
					uni.navigateTo({
						url: './orderList'
						
					});
				}else if (e==3){
					uni.navigateTo({
						url: './buySellUsdf',
						
					});
				}
			},
			// radioChange: function(evt) {
			//             for (let i = 0; i < this.items.length; i++) {
			//                 if (this.items[i].value === evt.target.value) {
			//                     this.current = i;
			//                     break;
			//                 }
			//             }
			// 			console.log(this.current)
			// },
		}
		
	}
</script>

<style lang="scss">
    page{background:#091224;width: 750upx;overflow-x: hidden;color: #FFFFFF;}
    .buySellActive{background: #283651;border-radius: 6upx;color: #34f073;width:150upx;height: 60upx;font-size: 15px;}
    .buySell{background: #283651;border-radius: 6upx;color: #818ca0;width:150upx;height: 60upx;font-size: 15px;}
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
		  width: 200upx;
		  height: 90upx;
		  border-radius: 8upx;
		  background: #2a3650;
		  justify-content: center;
		  align-items: center;
	}
</style>
