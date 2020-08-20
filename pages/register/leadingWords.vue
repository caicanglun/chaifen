<template>
	<view>
		
		<view style="margin: 30upx 30upx;">
			<view style="font-size: 16px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;font-weight: bold;">助記詞</text>
			</view>
			<view class="wrap">
				<textarea  placeholder-style="color:#7d889a;" placeholder="輸入助記詞,並用空格隔開" 
				  style="background: #121c31;height: 150upx;width:620upx;font-size: 15px;padding: 30upx;" v-model="form.mnemonicWord"></textarea>
			</view>
			<view style="font-size: 14px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;">用戶名稱</text>
			</view>
			<view style="background: #121c31;" class="flex_sb">
				<input v-model="form.userCode" type="number" class="inputClass"  placeholder="請輸入賬戶名" placeholder-class="placeholderClass"/>
		
			</view>
			<view style="font-size: 14px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;">設置密碼</text>
			</view>
			<view style="background: #121c31;" class="flex_sb">
				<input v-model="form.newPassword" type="password" class="inputClass"  placeholder="請輸入錢包密碼" placeholder-class="placeholderClass"/>
					
			</view>
			<view style="font-size: 14px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;">確認密碼</text>
			</view>
			<view style="background: #121c31;" class="flex_sb">
				<input v-model="repeatPassword" type="password" class="inputClass" placeholder="請再次輸入錢包密碼" placeholder-class="placeholderClass"/>
					
			</view>

			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">開始導入</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	
	export default {
		
		data() {
			return {
				form:{
					userCode:'',
					mnemonicWord:'',
					newPassword:''
				},
				repeatPassword:'',
				
			};
		},
		onLoad:function(options){
			// this.fetchUserDetail()
			this.phone = options.phone
			this.email = options.email
		},
		methods:{
			
		    
			
			async submit(){
				if (this.form.newPassword !== this.repeatPassword) { 
					uni.showToast({
						title: '兩次密碼不一致',
						icon: 'none'
					});
					return
				}
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				const res = await this.$http.get('/user/change_password',{data: this.form})
				uni.hideLoading()
				console.log(res)
				uni.showToast({
					title: '導入成功',
					icon: 'none',
					duration: 1000
				});
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					});
				}, 1500);
				
				 
			},
			
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
