<template>
	<view>
		<view style="margin: 30upx 30upx;">
			<view>
				<input class="inputClass" v-model="form.userCode" type="number" placeholder="請輸入用戶ID" placeholder-class="placeholderClass"/>
			</view>
			<view style="margin-top: 40upx;">
				<input class="inputClass" v-model="form.walletPassword" type="password" placeholder="錢包密碼" placeholder-class="placeholderClass"/>
			</view>
			
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">登錄</view>
			</view>
			<tfggVerify ref="verifyElement" @result="verifyResult" ></tfggVerify>
		</view>
	</view>
</template>

<script>
	import tfggVerify from "@/components/tfgg-verify/tfgg-verify.vue"
	export default {
		components:{
			tfggVerify
		},
		data() {
			return {
				form:{
					userCode:'',				//用户id
					walletPassword:''		//钱包密码

				}
			};
		},
		methods:{
			async verifyResult(res){
				
				if(res){
					this.$refs.verifyElement.reset();//校验成功重置插件
					console.log('验证成功')
					uni.showToast({
						title: '驗證成功'
					});
					const res = await this.$http.get('/user/login',{data: this.form})
					uni.setStorageSync('token',res.data.data.msg)
					this.$nextTick(function(){
						uni.switchTab({
							url:"/pages/index/index"
						})	
					})
				
				}
				
			 },
			       
			       
			/* 校验插件重置 */
			verifyReset(){
				this.$refs.verifyElement.reset();
			},
			async submit(){
				 /* 显示校验弹窗 */
				this.$refs.verifyElement.show();
				 
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
