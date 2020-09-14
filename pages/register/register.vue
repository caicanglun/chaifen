<template>
	<view>
		<view style="margin: 60upx 30upx;">
			<view>
				<input class="inputClass" v-model="form.userName" :placeholder="i18n.registerBackup.enterAccount" placeholder-class="placeholderClass"/>
			</view>
			<view style="margin-top: 40upx;">
				<input class="inputClass" v-model="form.password" type="password" :placeholder="i18n.registerBackup.enterRule+i18n.registerBackup.walletPwd" placeholder-class="placeholderClass"/>
			</view>
			<view style="margin-top: 40upx;">
				<input class="inputClass" v-model="form.passwordRepeat" type="password" :placeholder="i18n.registerBackup.enterPwd" placeholder-class="placeholderClass"/>
			</view>
			<view style="margin-top: 40upx;">
				<input class="inputClass" v-model="form.secondPassword" type="password" :placeholder="i18n.registerBackup.paymentPw" placeholder-class="placeholderClass"/>
			</view>
			<view style="margin-top: 40upx;">
				<input class="inputClass" v-model="form.secondPasswordRepeat" type="password" :placeholder="i18n.registerBackup.confirmPaymentPw" placeholder-class="placeholderClass"/>
			</view>
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">{{i18n.registerBackup.create}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					userName: '',
					password: '',
					passwordRepeat:'',
					secondPassword:'',
					secondPasswordRepeat:''
				}
			};
		},
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		onLoad:function(){
			uni.setNavigationBarTitle({
			            title:this.$i18nMsg().page.createWallet
			});
		},
		methods:{
			hasCaseLetter(str) {
			    for (var i in str) {
			        var asc = str.charCodeAt(i);
			        if ((asc >= 65 && asc <= 90)) {
			            return true;
			        }
			    }
			    return false;
			},
			hasLetter(str) {
			    for (var i in str) {
			        var asc = str.charCodeAt(i);
			        if ((asc >= 65 && asc <= 90 || asc >= 97 && asc <= 122)) {
			            return true;
			        }
			    }
			    return false;
			},
			async submit(){
				 if (!this.hasLetter(this.form.userName)){
					 uni.showToast({
					 	title: '用戶名必須包含字母',
					 	icon: 'none'
					 });
					 return
				 }
				 if (this.form.userName.length<4 && this.form.userName.length>9){
					 uni.showToast({
					 	title: '用戶名長度為3~9位',
					 	icon: 'none'
					 });
					 return
				 }
				 if (this.form.password.length<8){
					 uni.showToast({
					 	title: '密碼不能少於8位',
					 	icon: 'none'
					 });
					 return
				 }
				 // if (!this.hasCaseLetter(this.form.password)){
					//  uni.showToast({
					// 	title: '密碼必須包含大寫字母',
					// 	icon: 'none'
					//  });
					//  return
				 // }
				 
				 if (this.form.secondPassword.length<8){
					 uni.showToast({
						title: '支付密碼不能少於8位',
						icon: 'none'
					 });
					 return
				 }
				 // if (!this.hasCaseLetter(this.form.secondPassword)){
					// 	 uni.showToast({
					// 		title: '支付密碼必須包含大寫字母',
					// 		icon: 'none'
					// 	 });
					// 	 return
				 // }
				 if (this.form.password !== this.form.passwordRepeat) {
					 uni.showToast({
					 	title: '登錄密碼不一致',
						icon: 'none'
					 });
					 return
				 }
				 if (this.form.secondPassword !== this.form.secondPasswordRepeat) {
					 uni.showToast({
						title: '支付密碼不一致',
						icon: 'none'
					 });
					 return
				 }
				 let data ={
					 userName: this.form.userName, //用户名
					 walletPassword: this.form.password, //	钱包密码
					 payPassword: this.form.secondPassword	//支付密码

				 }
				 const res = await this.$http.get('/user/sign_in',{data: data})
				 console.log(res)
				 
				 uni.navigateTo({
				 	url: `./zhujiciBack?userCode=${res.data.data.msg}`
				 	
				 });
				 
			}
		}
	}
</script>

<style lang="scss">
  page{
	  background: #091224;
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
