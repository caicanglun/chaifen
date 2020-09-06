<template>
	<view>
		
		<view style="margin: 30upx 30upx;">
			<view style="font-size: 16px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;font-weight: bold;">{{i18n.registerRestore.helpWord}}</text>
			</view>
			<view class="wrap">
				<textarea  placeholder-style="color:#7d889a;" :placeholder="i18n.registerRestore.enterHelpWord" 
				  style="background: #121c31;height: 150upx;width:620upx;font-size: 15px;padding: 30upx;" v-model="form.mnemonicWord"></textarea>
			</view>
			<view style="font-size: 14px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;">{{i18n.registerRestore.accountName}}</text>
			</view>
			<view style="background: #121c31;" class="flex_sb">
				<input v-model="form.userCode" type="number" class="inputClass"  :placeholder="i18n.registerRestore.enterAccount" placeholder-class="placeholderClass"/>
		
			</view>
			<view style="font-size: 14px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;">{{i18n.registerRestore.setPwd}}</text>
			</view>
			<view style="background: #121c31;" class="flex_sb">
				<input v-model="form.newPassword" type="password" class="inputClass"  :placeholder="i18n.registerRestore.enterWalletPwd" placeholder-class="placeholderClass"/>
					
			</view>
			<view style="font-size: 14px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;">{{i18n.registerRestore.confirmPwd}}</text>
			</view>
			<view style="background: #121c31;" class="flex_sb">
				<input v-model="repeatPassword" type="password" class="inputClass" :placeholder="i18n.registerRestore.twiceEnterPwd" placeholder-class="placeholderClass"/>
					
			</view>

			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">{{i18n.registerRestore.startExport}}</view>
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
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		onLoad:function(options){
			// this.fetchUserDetail()
			this.phone = options.phone
			this.email = options.email
			uni.setNavigationBarTitle({
			            title:this.$i18nMsg().page.restore
			});
		},
		methods:{
			
		    
			
			async submit(){
				if (this.form.newPassword !== this.repeatPassword) { 
					uni.showToast({
						title: this.$i18nMsg().registerRestore.pwdDiff,
						icon: 'none'
					});
					return
				}
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				const res = await this.$http.get('/user/change_and_bind',{data: this.form})
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
