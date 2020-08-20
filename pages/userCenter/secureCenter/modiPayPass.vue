<template>
	<view>
		
		<view style="margin: 30upx 30upx;">
			
			<view style="font-size: 14px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;">新的密碼</text>
			</view>
			<view style="background: #121c31;" class="flex_sb">
				<input v-model="form.newPassword" type="password" class="inputClass"  placeholder="請輸入妳要設置的密碼" placeholder-class="placeholderClass"/>
					
			</view>
			<view style="font-size: 14px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;">確認密碼</text>
			</view>
			<view style="background: #121c31;" class="flex_sb">
				<input v-model="repeatPassword" type="password" class="inputClass" placeholder="請重複輸入密碼" placeholder-class="placeholderClass"/>
					
			</view>
			
			<!-- <view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.vCode" class="inputClass" type="text" placeholder="請輸入郵箱驗證碼" placeholder-class="placeholderClass"/>
				<view class="flex_c" style="justify-content: flex-end;width: 30%;padding: 0 20upx;">
					
					<view style="font-size:14px;color: #34F073;" @tap="sendVcode">發送驗證碼</view>
				</view>
			</view> -->
			
			
			
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="showDialog">设置</view>
			</view>
			
		</view>
		<popupVerify ref="dialog" @input="confirmInput" :phone="phone" :email="email"></popupVerify>
	</view>
</template>

<script>
	import popupVerify from "@/components/popupVerify.vue"
	export default {
		components:{
			popupVerify
		},
		data() {
			return {
				form:{
					
					newPassword:''
				},
				repeatPassword:'',
				phone:'',
				email:''
			};
		},
		onLoad:function(options){
			this.phone = options.phone
			this.email = options.email
			console.log(options)
		},
		methods:{
			confirmInput:function(){
				this.submit()
			},
			showDialog:function(){
			
				this.$refs.dialog.show()
			},
		    async sendVcode(){
				if (this.form.mail == ''){
					uni.showToast({
						title: '郵箱不能為空',
						icon: 'none',
						duration: 1000
					});
					return
				}
				let data ={
					mail: this.form.mail
				}
		    	const res  = await this.$http.get('/user/verification',{data: data})
		    	uni.showToast({
		    		title: '發送成功',
					duration:  1000
		    	});
		    	
		    },
			
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
				const res = await this.$http.get('/user/update_pay_password',{data: this.form})
				uni.hideLoading()
				console.log(res)
				uni.showToast({
					title: '修改成功',
					icon: 'none',
					duration: 1000
				});
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					});
				}, 1500);
				
				 
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
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
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
