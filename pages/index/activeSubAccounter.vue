<template>
	<view>
		<view style="margin: 30upx 30upx;">
			<view class="tip">{{ i18n.wallet.activeTip3}}0{{ i18n.wallet.activeTip4}}</view>
			
			<view class="flex_sb" style="margin-top: 100upx;">
				<view><text class="tip">{{i18n.walletAsset.avalible}}：</text><text style="color:#34f073;font-size:13px;">{{ablityShut}}{{i18n.wallet.help}}</text></view>
				<view><text class="tip">{{ i18n.wallet.needPay}}：</text><text style="color:#34f073; font-size:13px;">0.0000{{i18n.wallet.help}}</text></view>
			</view>
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">{{i18n.wallet.active}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	let _this
	export default {
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		data() {
			return {
				ablityShut:'',
				form:{
					creditToken: '111',	//授信令牌
					userCode: '111'		,//节点码
					leftRight: '0'
				},
				
				current: 0			
			};
		},
		onLoad:function(){
			_this = this
			uni.setNavigationBarTitle({
			    title:this.$i18nMsg().wallet.activeAccount
			});
			this.fetchShut()
		},
		methods:{
			async fetchShut(){
				const res = await this.$http.get('/user/main_shunt')
				this.ablityShut = res.data.data.msg
				console.log(res)
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
			async submit(){
				// this.form.leftRight = parseInt(this.items[this.current].value) 
				
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
