<template>
	<view>
		<view style="margin: 0 30upx;">
			<view class="tip">
				{{ i18n.registerBackup.tip3}}
				<!-- 請按順序點擊您的助記詞，以便確認備份助記詞的正確 -->
			</view>
			<view @longpress="tapPaste" class="wrap">
				<textarea  placeholder-style="color:#7d889a;" :placeholder="i18n.registerBackup.pressAndPaste" style="text-align: center;height: 200upx;font-size: 15px;padding: 30upx;" v-model="words"></textarea>
			</view>
            <view class="flex_wrap" style="margin-top:30upx;">
				<block v-for="(item,index) in shuffleWord" :key="index">
					<view style="width: 25%;margin-top: 20upx;" class="flex_c_c">
						<view class="wordBox" :style="{color: item.isChecked?'#34f073':''}" @tap="tapWord(index)">{{item.name}}</view>
					</view>
					
				</block>
			</view>
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="btn_class" @tap="submit">{{ i18n.registerBackup.next}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		data() {
			return {
				words:'',
				shuffleWord:[],
				userCode:''
			};
		},
		onLoad:function(options){
            uni.setNavigationBarTitle({
                title:this.$i18nMsg().page.confirm
            });
			this.userCode = options.userCode
			console.log(this.userCode)
			this.getShuffleWord()
		},
		methods:{
			async getShuffleWord(){
				let data ={
					userCode: this.userCode
				}
				const res = await this.$http.get('/user/scrambled_mnemonic',{data: data})
				
				let tmp = res.data.data.list
				tmp.forEach((item)=>{
					this.shuffleWord.push({name: item})
				  }
				)
			},
			tapPaste:function(){
				let that = this
				 uni.getClipboardData({
					 success: function (res) {
						 console.log(res)
						 that.words = res.data
					 }
				 });
			},
			tapWord:function(index){
				this.$set(this.shuffleWord[index],'isChecked',true) 
				this.words = this.words + this.shuffleWord[index].name + ' '
			},
			async submit(){
				let data = this.words.split(' ')
				console.log(data.join(' '))
				let data1 ={
					userCode: this.userCode,
					mnemonicWord: this.words
				}
				const res = await this.$http.post('/user/mnemonic_check',{data: data1})
				
				uni.setStorageSync('token',res.data.data.msg)
				setTimeout(function() {
					uni.switchTab({
						url:"/pages/index/index"
					})	
				}, 500);
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
	  background: #111c30;
  }
</style>
