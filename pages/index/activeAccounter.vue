<template>
	<view>
		<view style="margin: 30upx 30upx;">
			<view class="tip">須知：輸入授信令牌並支付0授信額度，便可激活賬戶</view>
			<view style="font-size: 14px;margin-top: 20upx;">授信令牌</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.creditToken" class="inputClass" placeholder="請輸入授信令牌,並且需要0授信額度" placeholder-class="placeholderClass"/>
				<view class="flex_c">
					<image src="/static/icon_Scan@2x.png" mode="aspectFit" style="height: 50upx;width: 50upx;padding-right: 20upx;" @tap="scanCodeToken"></image>
				</view>
			</view>
			<view style="font-size: 14px;margin-top: 20upx;">節點碼(選填)</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.userCode" class="inputClass" type="text" placeholder="請輸入節點碼,選擇您的所在區" placeholder-class="placeholderClass"/>
				<view class="flex_c">
					<image src="/static/icon_Scan@2x.png" mode="aspectFit" style="height: 50upx;width: 50upx;padding-right: 20upx;" @tap="scanCodeNode"></image>
				</view>
				
			</view>
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
			<view class="flex_sb" style="margin-top: 100upx;">
				<view><text class="tip">可用：</text><text style="color:#34f073;font-size:13px;">0.0000授信額度</text></view>
				<view><text class="tip">需要支付：</text><text style="color:#34f073; font-size:13px;">0授信額度</text></view>
			</view>
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">激活</view>
			</view>
		</view>
	</view>
</template>

<script>
	let _this
	export default {
		data() {
			return {
				form:{
					creditToken: '',	//授信令牌
					userCode: ''		,//节点码
					leftRight: ''
				},
				items: [{
				                    value: '1',
				                    name: '熵增',
									checked: 'true'
				                },
				                {
				                    value: '2',
				                    name: '熵減' 
				                }
				               
				            ],
				current: 0			
			};
		},
		onLoad:function(){
			_this = this
		},
		methods:{
			radioChange: function(evt) {
			            for (let i = 0; i < this.items.length; i++) {
			                if (this.items[i].value === evt.target.value) {
			                    this.current = i;
			                    break;
			                }
			            }
						console.log(this.current)
			},
			async submit(){
				this.form.leftRight = parseInt(this.items[this.current].value) 
				
				const res = await this.$http.get('/user/set_token',{data: this.form})
				console.log(res)
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				prevPage.$vm.isActive = true
				// prevPage.setData({
				//    isActive:true
				// })
				uni.showToast({
					title: '激活成功',
					icon: 'none'
				});
				
				uni.navigateBack({
					delta: -1
				});
				 
			},
			scanCodeToken:function(){
				
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						_this.form.creditToken = res.result
				    }
				});
			},
			scanCodeNode: function(){
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						_this.form.userCode = res.result
				    }
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
	  width: 80%;
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
