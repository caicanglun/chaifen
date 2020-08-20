<template>
	<view>
		<view class="flex">
			<view class="flex_c_c" :class="[dataIndex==1?'buySellActive':'buySell']" data-index='1' @tap="selectLabel">我要購買</view>
			<view class="flex_c_c" :class="[dataIndex==2?'buySellActive':'buySell']" data-index='2' @tap="selectLabel">我要出售</view>
		</view>
		<view style="margin: 30upx 30upx;">
			<view style="background: #121c31;font-size: 14px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;">USDF</text>
			</view>
			<view style="font-size: 14px;margin-top: 20upx;">支付方式</view>
			<view class="flex" style="margin-top: 30upx;color: white;">
					<radio-group @change="radioChange" class="flex">
						<label class="flex" style="font-size: 14px;padding-right: 30upx;" v-for="(item, index) in items" :key="item.value">
							<view>
								<radio :value="item.value" :checked="index === current" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
			</view>
			<view class="flex_sb" style="font-size: 14px;margin-top: 30upx;">
				<view>交易價格</view>
				<view>7<text style="color:#34F073;">CNY</text>/1.00547<text style="color:#34F073;">USDT</text></view>
			</view>
			<view style="font-size: 14px;margin-top: 30upx;">交易數量</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.usde" class="inputClass" type="text" @blur="quzheng" placeholder="請輸入交易數量" placeholder-class="placeholderClass"/>
				<view class="flex_c" style="justify-content: flex-end;width: 30%;padding: 0 20upx;">
					
					<view style="font-size:14px;color: #34F073;">USDF</view>
				</view>
			</view>
			<view style="font-size: 14px;margin-top: 30upx;">安全驗證</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.payPassword" class="inputClass" type="password" placeholder="請輸入支付密碼" placeholder-class="placeholderClass"/>
				
			</view>
			
			<view class="flex_sb" style="font-size: 11px;color: #7d889a;line-height: 20px;margin-top: 30upx;">
				<view>可用余額： <text style="color:#34F073;">{{dataIndex==1?buyMaxCount:userDetail.usde}}</text></view>
				<view>手續費： <text style="color:#34F073;">{{dataIndex==1?buyRate:sellRate}}</text></view>
			</view>
			
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">發佈掛單</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buyMaxCount: 0,
				buyRate:'0.00%',
				sellRate: '5.00%',
				dataIndex: 1,
				form:{
					usde:'',
					payPassword:''
				},
				secondPass:'',
				current: 0,
				items: [{
				                    value: '1',
				                    name: 'USDT',
									checked: 'true'
				                }
				            ],
				userDetail:''
			};
		},
		onLoad:function(){
			this.fetchUserDetail()
		},
		methods:{
			async fetchUserDetail(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
				
				
			},
			quzheng:function(){
				this.form.usde = parseInt(this.form.usde/100)*100
			},
			selectLabel:function(e){
				this.dataIndex = e.target.dataset.index
				if (this.dataIndex == 2){
					
					
				}
				if (this.dataIndex == 1){
					
				}
			},
			async submit(){
				if (this.form.usde <100){
					uni.showToast({
						title: '最少數量100'
					});
					return
				}
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				if (this.dataIndex ==1){
					const res = await this.$http.get('/udeal/buy_add',{data: this.form})
					this.form.usde = ''
					uni.hideLoading()
					uni.navigateTo({
						url: './orderList'
						
					});
					console.log(res)
					
				}else if (this.dataIndex ==2){
					const res = await this.$http.get('/udeal/sell_add',{data: this.form})
					this.form.usde = ''
					uni.hideLoading()
					uni.navigateTo({
						url: './orderList'	
					});
					
				}
			},
			radioChange: function(evt) {
			            for (let i = 0; i < this.items.length; i++) {
			                if (this.items[i].value === evt.target.value) {
			                    this.current = i;
			                    break;
			                }
			            }
						console.log(this.current)
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
