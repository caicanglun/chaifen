<template>
	<view>
		<view style="margin: 30upx 30upx;">
			<view style="background: #121c31;font-size: 14px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;">USDF</text>
			</view>
			
			<view style="margin-top: 30upx;background: #121c31;" class="flex_sb">
				<input v-model="form.address" class="inputClass" placeholder="請輸入有效地址" placeholder-class="placeholderClass"/>
				<view class="flex_c">
					<image src="/static/icon_Scan@2x.png" mode="aspectFit" style="height: 50upx;width: 50upx;padding-right: 20upx;" @tap="scanCodeToken"></image>
				</view>
			</view>
			
			
			<view style="margin-top: 30upx;background: #121c31;" class="flex_sb">
				<input v-model="form.name" class="inputClass" type="password" placeholder="名稱" placeholder-class="placeholderClass"/>
	
			</view>
			<view style="margin-top: 30upx;background: #121c31;" class="flex_sb">
				<input v-model="form.subscript" class="inputClass" type="password" placeholder="描述(選填)" placeholder-class="placeholderClass"/>
				
			</view>
			
			
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					address:'',	   //目标用户id
					name:'',			//金额
					subscript:'',	//支付密码

				},
				ratio:''
			};
		},
		onLoad:function(){
			
		},
		methods:{
			
			async submit(){
				uni.showToast({
					
					title: '格式不符',
					icon:'none',
					duration: 1000
				});
				return
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
						delta: -1
					});
				}, 2000);

			},
			scanCodeToken:function(){
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						this.form.address = res.result
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
