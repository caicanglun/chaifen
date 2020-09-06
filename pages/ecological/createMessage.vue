<template>
	<view>
		<view style="margin: 0 30upx;">
			<view style="background: #121c31;" class="flex_sb">
				<input v-model="form.messageTitle" type="text" class="inputClass"  :placeholder="i18n.user.feedbackQuestion" placeholder-class="placeholderClass"/>
					
			</view>
			<view class="wrap">
				<textarea  placeholder-style="color:#7d889a;font-size:14px;" :placeholder="i18n.user.feedbackContent" style="height: 200upx;font-size: 14px;padding: 20upx;" v-model="form.messageDetails"></textarea>
			</view>
            
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="btn_class" @tap="submit">{{i18n.user.feedbackSubmit}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					messageTitle:''	,//标题
					messageDetails:	'' //	内容

				},
				
			};
		},
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		onNavigationBarButtonTap:function(val){
			 
			this.tapSettingButton() 
		    
		},
		onLoad:function(options){
             uni.setNavigationBarTitle({
                         title:this.$i18nMsg().user.contactUs
                     });
			var currentWebview = this.$mp.page.$getAppWebview();  
			currentWebview.setTitleNViewButtonStyle(0, {  
				text: this.$i18nMsg().user.moreMessage, 
			});  
		},
		methods:{
            tapSettingButton:function(){
            	uni.navigateTo({
            		url: './messageList'
            	
            	});
            },
			async submit(){
				
				const res = await this.$http.get('/message/add',{data: this.form})
				console.log(res)
				uni.showToast({
					title: '提交成功',
					icon: 'none'
				});
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					});
				}, 1500);
				
				
			}
		}
	}
</script>

<style lang="scss">
  page{
  	  background: #091224;
  }
  .tip{
  	  color: #7d889a;
  	  font-size: 14px;
  }
  .wrap{
	 background: #111c30;
	 color: white;
	 margin-top: 30upx;
	 
  }
  .wordBox{
	  height: 70upx;
	  width:  140upx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  color: #7d889a;
	  border-radius: 8upx;
	  background: #121c31;
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
</style>

