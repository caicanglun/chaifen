<template>
	<view>
		<view style="margin: 30upx 30upx;">
			<view style="font-size: 14px;">賬戶名</view>
			<view style="margin-top: 20upx;">
				<input v-model="form.userName" class="inputClass" placeholder="請輸入賬號" placeholder-class="placeholderClass"/>
			</view>
			<view style="font-size: 14px;margin-top: 20upx;">錢包密碼</view>
			<view style="margin-top: 20upx;">
				<input class="inputClass" v-model="form.password" type="password" placeholder="請輸入8-16位錢包密碼" placeholder-class="placeholderClass"/>
			</view>
			<view style="font-size: 14px;margin-top: 20upx;">確認密碼</view>
			<view style="margin-top: 20upx;">
				<input v-model="passwordRepeat" class="inputClass" type="password" placeholder="重複輸入密碼" placeholder-class="placeholderClass"/>
			</view>
			
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">創建</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					userName:'',
					password:''

				},
				passwordRepeat:''
			};
		},
		methods:{
			async submit(){
				 if (this.form.password !== this.passwordRepeat) {
					 uni.showToast({
					 	title: '登錄密碼不一致',
						icon: 'none'
					 });
					 return
				 }
				 uni.showLoading({
				 	title: '提交中',
					mask: true
				 })
				 const res = await this.$http.get('/user/sub_account',{data: this.form})
				 uni.hideLoading()
				 uni.showToast({
				 	title: '創建成功',
					duration: 1000
				 });
				 uni.navigateBack({
				 	delta: 1
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
  .inputClass{
	  background: #121c31;
	  height: 90upx;
	  border-radius: 8upx;
	  padding-left: 20upx;
	  font-size: 14px;
	  color: #FFFFFF;
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
