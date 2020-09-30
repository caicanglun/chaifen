<template>
	
	<view style="margin: 0 30upx;">
		<view class="topBlock">
			<view style="padding: 30upx;">
				<view class="flex_c_c" style="margin-top: 50upx;font-size: 18px;font-weight: bold;">
				{{userDetail.userName}}<text style="padding-left: 20upx;">ID:{{userDetail.userCode}}</text>
				</view>
				
				<view class="flex_c_c" style="margin-top: 20upx;color: #7782ba;font-size: 13px;">{{userDetail.walletAddress}}</view>
			</view>
		</view>
		<view style="margin-top: 50upx;padding: 0 39upx;">
			<view class="flex_sb">
				<view style="height: 200upx;width: 300upx;background: #111c30;" @tap="toShoukuanma(2)">
					<view style="margin-top:30upx;font-size: 18px;" class="flex_c_c">{{i18n.user.paymentCode}}</view>
					<view class="flex_c_c"><image src="/static/next.png" mode="aspectFit" style="height: 100upx;width: 100upx;"></image></view>
				</view>
				<view style="height: 200upx;width: 300upx;background: #111c30;" @longpress="copyAddress">
					<view style="margin-top:30upx;font-size: 18px;" class="flex_c_c">{{i18n.user.copyAddress}}</view>
					<view class="flex_c_c"><image src="/static/next.png" mode="aspectFit" style="height: 100upx;width: 100upx;"></image></view>
				</view>
			</view>
			<popMe ref="dialog" title="请输入密碼" @input="confirmInput" placeholder="請輸入支付密碼"></popMe>
			<view class="flex_sb" style="margin-top: 20upx;">
				<view style="height: 200upx;width: 300upx;background: #111c30;" @tap="toShoukuanma(1)">
					<view style="margin-top:30upx;font-size: 18px;" class="flex_c_c">{{i18n.user.nodeCode}}</view>
					<view class="flex_c_c"><image src="/static/next.png" mode="aspectFit" style="height: 100upx;width: 100upx;"></image></view>
				</view>
				<view style="height: 200upx;width: 300upx;background: #111c30;" @tap="showDialog(1)">
					<view style="margin-top:30upx;font-size: 18px;" class="flex_c_c">{{i18n.user.outputKey}}</view>
					<view class="flex_c_c"><image src="/static/next.png" mode="aspectFit" style="height: 100upx;width: 100upx;"></image></view>
				</view>
			</view>
			<view class="flex_sb" style="margin-top: 20upx;">
				<view style="height: 200upx;width: 300upx;background: #111c30;" @tap="showDialog(2)">
					<view style="margin-top:30upx;font-size: 18px;" class="flex_c_c">{{i18n.user.output}} keyStore</view>
					<view class="flex_c_c"><image src="/static/next.png" mode="aspectFit" style="height: 100upx;width: 100upx;"></image></view>
				</view>
				<view style="height: 200upx;width: 300upx;background: #111c30;" @tap="showDialog(3)">
					<view style="margin-top:30upx;font-size: 18px;" class="flex_c_c">{{i18n.user.outputSeed}}</view>
					<view class="flex_c_c"><image src="/static/next.png" mode="aspectFit" style="height: 100upx;width: 100upx;"></image></view>
				</view>
			</view>
			
		</view>
		
		
    </view>
	
	
</template>

<script>
	import popMe from "@/components/popupMe.vue";
	export default {
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		components:{
			popMe
		},
		data() {
			return {
				index:'',
				isActive: false,
				level: [{id: 1,name: '100USDF'},{id: 2,name: '500USDF'},{id: 3,name: '1000USDF'}],
				selectIndex: -1,
				record:[{time: '01-12 06:05',type: '排隊中',counter: '50.0000'}],
				sliceIndex: 1,
				sliceArr: [{id: 1,name: '靜態認購'},{id: 2,name: '動態認購'}],
				userDetail:'',
				secondPassword:''
			};
		},
		onShow:function(){
			this.fetchUserDetail()
		},
		onLoad:function(){
			this.fetchUserDetail()
		},
		methods:{
			showDialog:function(e){
				this.index = e
				this.$refs.dialog.show()
			},
			confirmInput:function(e){
				this.secondPassword = e
				this.$refs.dialog.content = ''
				console.log(this.secondPassword)
				this.checkPayPassword()
				
				
			},
			async checkPayPassword(){
				let data ={
					payPassword: this.secondPassword
				}
				const res = await this.$http.get('/user/check_pay_pass',{data: data})
				console.log(res)
				this.secondPassword = ''
				if (res.data.data.msg=='true'){
					if(this.index ==1){
						this.toOutKey()
					}else if(this.index ==2){
						this.toOutPublic()
					}else if (this.index ==3){
						this.toOutWords()
					}
					
				}else {
					uni.showToast({
						title: '支付密码不正确',
						icon:'none',
						duration: 1000
					});
				}
			},
			toOutWords:function(){
				uni.navigateTo({
					url: `./outWords?userCode=${this.userDetail.userCode}`,
					
				});
			},
			toOutPublic:function(){
				uni.navigateTo({
					url: `./outPublic?key=${this.userDetail.publicKey}`,
					
				});
			},
			copyAddress:function(){
				uni.setClipboardData({
					data: this.userDetail.walletAddress
				})
			},
			toOutKey:function(){
				uni.navigateTo({
					url: `./outKey?key=${this.userDetail.privateKey}`,
					
				});
			},
			async fetchUserDetail(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
				
			},
			toDongliyuan:function(){
				uni.navigateTo({
					url: '/pages/capital/dongliyuan'
					
				});
			},
			toShoukuanma:function(e){
				let data  = JSON.stringify(this.userDetail)
				uni.navigateTo({
					url: `./shoukuanma?userDetail=${data}&type=${e}`,
					
				});
			},
			toMoney:function(){
				uni.navigateTo({
					url: '/pages/capital/money'
					
				});
			},
			toInitStore:function(){
				uni.navigateTo({
					url: '/pages/capital/initStore'
					
				});
			},
			toFaZhuan:function(){
				uni.navigateTo({
					url: './fazhuan'
					
				});
			},
			toTixian:function(){
				uni.navigateTo({
					url: './tixian',
					
				});
			},
			selectItem:function(index){
				this.selectIndex = index
			},
			tapSlice:function(index){
				this.sliceIndex = index
			},
			toZhuliyuan:function(){
				uni.navigateTo({
					url: `/pages/capital/zhuliyuan?account=${this.userDetail.shuntPool}`
					
				});
			},
			toShangZhi:function(){
				uni.navigateTo({
					url: '/pages/capital/shangzhijilu'
				});
			},
				
			toEnergyPool:function(){
				uni.navigateTo({
					url: `/pages/capital/energyPool?account=${this.userDetail.energyPool}`
					
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
   .topBlock{
	height: 300upx;
	width: 100%;
	background: url(../../static/wallet-address-box.png);
	background-size: 100% 100%;
  }
  .btn_class11{
  	color: #909baf;
  	font-size: 16px;
  	font-weight: bold;
  	display: flex;
  	width: 200upx;
  	height: 75upx;
  	border-radius: 8upx;
  	background: #2a3650;
  	justify-content: center;
  	align-items: center;
  }
</style>
