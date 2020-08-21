<template>
	<view>
		<view class="topBlock" @tap="toLeadingWord">
				<view class="inClass">{{i18n.registerIndex.exportAccount}}</view>
		</view>
		<view  class="flex_c_c" style="color: #7d889a;height: 80upx;font-size: 13px;">
			 {{i18n.registerIndex.hasWallet}}
		</view>
		<view  class="flex_c_c" style="color: #FFFFFF;height: 70upx;font-size: 18px;font-weight: bold;">OR</view>
		<view class="flex_c_c" @tap="toCreate">
			<view class="inClass" style="color: #fe2c2c">{{i18n.registerIndex.createAccount}}</view>
		</view>
		<view  class="flex_c_c" style="color: #7d889a;height: 80upx;font-size: 13px;">
			 {{i18n.registerIndex.firstWallet}}
		</view>
		<view  style="display: flex;margin: 100upx 30upx;justify-content: space-between;font-size: 14px;color: white;">
			<view>
				 <picker @change="bindPickerChange" :value="index" :range="array">
				      <view class="uni-input">{{array[index]}}</view>
				 </picker>
			</view>
			<view @tap='toLogin'>{{i18n.registerIndex.toLogin}}</view>
		</view>
		<!-- {{i18n.tab.user}} -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: ['繁體中文', 'English'],
				index: 0,
			};
		},
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		onShow:function(){
			console.log(uni.getStorageSync('locale'))
			if (uni.getStorageSync('locale')){
				if (uni.getStorageSync('locale')=='zh-CN'){
					this.index = 0
				}else if (uni.getStorageSync('locale')=='en-US'){
					this.index = 1
				}
			}
		},
		onLoad:function(){
			console.log(uni.getStorageSync('locale'))
			if (uni.getStorageSync('locale')){
				if (uni.getStorageSync('locale')=='zh-CN'){
					this.index = 0
				}else if (uni.getStorageSync('locale')=='en-US'){
					this.index = 1
				}
			}
		},
		methods:{
			bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.index = e.target.value
						if (this.index==0){
							uni.setStorageSync('locale','zh-CN')
							this.$i18n.locale='zh-CN'
							
						}else if (this.index == 1){
							uni.setStorageSync('locale','en-US')
							this.$i18n.locale='en-US'
							
						}
						
						
			},
			toLeadingWord:function(){
				uni.navigateTo({
					url: './leadingWords',	
				});
			},
			toCreate:function(){
				uni.navigateTo({
					url: './register',	
				});
			},
			toLogin:function(){
				uni.navigateTo({
					url: './startLogin'
				});
			}
			
		}
	}
</script>

<style lang="scss">
  page{
	  background: #091224;
  }
  .topBlock{
	  width: 100%;
	  height: 500upx;
	  display: flex;
	  align-items: flex-end;
	  justify-content: center;
	  
  }
  .inClass{
	  color: #34f073;
	  font-size: 16px;
	  font-weight: bold;
	  display: flex;
	  width: 300upx;
	  height: 90upx;
	  border-radius: 8upx;
	  background: #121c31;
	  justify-content: center;
	  align-items: center;
  }
</style>
