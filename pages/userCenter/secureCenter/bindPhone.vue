<template>
	<view>
		
		<view style="margin: 30upx 30upx;">
			<view style="font-size: 14px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;">手机号码</text>
			</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.phone" type="number" class="inputClass" maxlength="11" placeholder="請輸入手机號碼" placeholder-class="placeholderClass"/>
		
			</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.vCode" class="inputClass" type="text" placeholder="請輸入手機驗證碼" placeholder-class="placeholderClass"/>
				<view class="flex_c" style="justify-content: flex-end;width: 30%;padding: 0 20upx;">
					
					<view style="font-size:14px;color: #34F073;" v-show="showBotton" @tap="sendVcode">發送驗證碼</view>
					<view style="font-size:14px;color: #FFFFFF;" v-show="!showBotton" >{{count}} s</view>
				</view>
			</view>

			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">綁定</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					phone: '',
					vCode:''
					
				},
				userDetail:'',
				showBotton: true,
				count: '',
				timer: null,
			};
		},
		onLoad:function(){
			// this.fetchUserDetail()
		},
		methods:{
			getCode(){
				console.log('sfwfwef')
				 const TIME_COUNT = 120;
				 if (!this.timer) {
					 this.count = TIME_COUNT;
					 this.showBotton = false;
					 this.timer = setInterval(() => {
				          if (this.count > 0 && this.count <= TIME_COUNT) {
				              this.count--;
				           } else {
							  this.showBotton = true;
							  clearInterval(this.timer);
							  this.timer = null;
					       }
				    }, 1000)
				 }
			},
		    async sendVcode(){
				
				if (this.form.phone == ''){
					uni.showToast({
						title: '手机号码不能為空',
						icon: 'none',
						duration: 1000
					});
					return
				}
				this.getCode()
				let data ={
					phone: this.form.phone
				}
		    	const res  = await this.$http.get('/user/phone_veri',{data: data})
		    	uni.showToast({
		    		title: '發送成功',
					duration:  1000
		    	});
		    	
		    },
			
			async submit(){
				if (this.form.phone == '') { 
					uni.showToast({
						title: '手机号码不能為空',
						icon: 'none'
					});
					return
				}
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				const res = await this.$http.get('/user/bind_phone',{data: this.form})
				uni.hideLoading()
				console.log(res)
				uni.showToast({
					title: '綁定成功',
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
