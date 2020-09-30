<template>
	<view>
		<view style="margin: 0 30upx;">
			
			<view style="width:100%;height: 200upx;font-size: 15px;background: #111c30;color: white;margin-top: 20upx;" @longpress="tapPaste">
				<view style="padding: 30upx 80upx;word-break: break-word;">
					{{key}}
				</view>
			</view>
			
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="btn_class" @tap="submit">{{ i18n.user.copy }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	function shuffle(arr) {
	　　for (var i = arr.length - 1; i >= 0; i--) {
	　　　　var randomIndex = Math.floor(Math.random() * (i + 1));
	　　　　var itemAtIndex = arr[randomIndex];
	　　　　arr[randomIndex] = arr[i];
	　　　　arr[i] = itemAtIndex;
	　　}
	　　return arr
	}
	export default {
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		data() {
			return {
				words:'',
				userCode:'',
				key:''
			};
		},
		onLoad:function(options){
			
			this.key = options.key
			// this.fetchWords()
		},
		methods:{
			async fetchWords(){
				let data ={
					userCode: this.userCode
				}
				const res = await this.$http.get('/user/mnemonic_list',{data: data})
				this.words = res.data.data.list.join(' ')
			},
			tapPaste:function(){
					  
					  uni.setClipboardData({ data: this.words, success:function(data){
					  	uni.showToast({
					  		title: '复制成功'
							
					  	});
					  }, fail:function(err){console.log(err)}, complete:function(res){} })
			},
			submit:function(){
				uni.setClipboardData({
					data: this.key
				})
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
</style>
