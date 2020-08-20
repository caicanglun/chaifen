<template>
	<view>
		<view style="margin: 30upx 30upx;">
			<view style="background: #121c31;font-size: 14px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;">USDF</text>
			</view>
			<view style="font-size: 14px;margin-top: 20upx;">
				充幣地址
			</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.userCode" class="inputClass" placeholder="請輸入用戶ID" placeholder-class="placeholderClass"/>
				<view class="flex_c">
					<image src="/static/icon_Scan@2x.png" mode="aspectFit" style="height: 50upx;width: 50upx;padding-right: 20upx;" @tap="scanCodeToken"></image>
				</view>
			</view>
			<view style="font-size: 14px;margin-top: 20upx;">數量</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.usde" class="inputClass" type="number" placeholder="請輸入提幣數量,最少10.00" @blur="quzheng" placeholder-class="placeholderClass"/>
				<view class="flex_c" style="justify-content: space-around;width: 30%;">
					<view style="font-size:14px;color: #34F073;padding-right: 25upx;border-right: 2upx solid #3F536E;">USDF</view>
					<view style="font-size:14px;color: #34F073;" @tap="allin">全部</view>
				</view>
			</view>
			<view style="font-size: 11px;color: #7d889a;line-height: 20px;margin-top: 20upx;">
				<view>可用： <text style="color:#34F073;">{{userDetail.signinUsde}}</text><text style="padding-left: 10upx;color:#34F073;">USDF</text></view>
			</view>
			<view style="font-size: 14px;margin-top: 20upx;">
				支付密碼
			</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.payPassword" class="inputClass" type="password" placeholder="請輸入支付密碼" placeholder-class="placeholderClass"/>
	
			</view>
			<view style="font-size: 14px;margin-top: 20upx;">
				手續費
			</view>
			<view style="margin-top: 20upx;background: #121c31;font-size: 14px;height:80upx;padding:0 10upx;" class="flex_sb_c">
				<text>{{ ratio }}</text>
				<text>USDF</text>
			</view>
			<view style="font-size: 12px;color: #7d889a;line-height: 20px;margin-top: 20upx;">
				<view>最小提幣數量為：10.0000USDF</view>
				<view>請務必確認電腦及瀏覽器安全，防止信息被篡改或洩漏</view>
			</view>
			<view style="font-size: 14px;margin-top: 20upx;">
				預計到賬
			</view>
			<view style="background: #121c31;font-size: 14px;height:80upx;padding: 0 10upx;" class="flex_c">
				<text>{{form.usde - form.usde*ratio}}</text><text style="padding-left: 10upx;">USDF</text>
			</view>
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">提幣</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					userCode:'',	   //目标用户id
					usde:'',			//金额
					payPassword:'',	//支付密码

				},
				ratio:'',
				userDetail:''
			};
		},
		onLoad:function(){
			this.fetchRatio()
			this.fetchUserDetail()
			console.log(this.$store.userCode)
		},
		methods:{
			async fetchUserDetail(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
				
			},
			quzheng:function(){
				this.form.usde = parseInt(this.form.usde/10)*10
			},
			allin:function(){
				this.form.usde = this.userDetail.signinUsde
			},
			async fetchRatio(){
				const res = await this.$http.get('/deal/signin_shift_ratio')
				this.ratio = res.data.data.msg
			},
			async submit(){
				if (this.form.usde<10){
					uni.showToast({
						title: '數量最少10',
						icon: 'none',
						duration: 1000
					});
					return
				}
				if(this.form.userCode == this.$store.userCode){
					uni.showToast({
						title: '不能轉賬給自己',
						icon: 'none',
						duration: 1000
					});
					return
				}
				this.form.usde = parseInt(this.form.usde/10)*10
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				const res = await this.$http.get('/deal/signin_shift',{data: this.form})
				uni.hideLoading()
				
				uni.showToast({
					title: '轉賬成功',
					icon: 'none',
					duration: 1000
				});
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					});
				}, 2000);

			},
			scanCodeToken:function(){
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				});
			},
			scanCodeNode: function(){
				uni.scanCode({
				    success: function (res) {
				        this.form.userCode = res.result
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
