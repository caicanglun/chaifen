<template>
	<view>
		<view style="margin: 0 30upx;">
			<view class="tip">
				強烈建議妳將助記詞抄寫在紙上并保存在只有妳知道的安全地方，任何人得到助記詞都可以消費你的數字資產
			</view>
			<view  class="flex_c" style="background: #1d6943;font-size: 14px;color: white;height: 90upx;margin-top:30upx;">
				<text style="padding-left: 20upx;">助記詞用於恢復妳的錢包，丟失他們妳將永遠失去錢包</text>
			</view>
			<view class="tip" style="margin-top: 30upx;">
				長按下方助記詞，可複製到剪貼板
			</view>
			<view style="width:100%;height: 200upx;font-size: 15px;background: #111c30;color: white;margin-top: 20upx;" @longpress="tapPaste">
				<view style="padding: 30upx 80upx;">
					{{words}}
				</view>
			</view>
			
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="btn_class" @tap="submit">下壹步</view>
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
		data() {
			return {
				words:'',
				userCode:''
			};
		},
		onLoad:function(options){
			
			this.userCode = options.userCode
			this.fetchWords()
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
				uni.navigateTo({
					url: `./wordsConfirm?userCode=${this.userCode}`
				});
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
