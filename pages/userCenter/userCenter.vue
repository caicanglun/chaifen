<template>
	<view style="margin: 0 30upx;">
		<view class="topBlock">
			<view style="padding: 30upx;">
				<view class="flex_sb">
					<text style="font-size: 14px;">ID: {{userDetail.userCode}}</text>
					<text style="font-size: 16px;font-weight: bold;" @tap="toSubAccounter">查看子賬戶</text>
				</view>
				<view class="flex_c_c" style="margin-top: 30upx;" @tap="toSetIcon">
					<view v-if="userDetail.icon!==''">
						<image :src="userDetail.icon" mode="aspectFit" style="width: 60upx;height: 60upx;"></image>
					</view>
					<view v-else>
						<image src="/static/gif/eco8.png" mode="aspectFit" style="width: 60upx;height: 60upx;"></image>
					</view>
				</view>
				<view class="flex" style="justify-content: center;align-items: flex-end;height: 100upx;">{{userDetail.userName}}</view>
				<view class="flex_c_c">
					<view class="text-overflow">{{userDetail.walletAddress}}</view>
				</view>
				
				
				<view style="margin-top:30upx;" class="flex_sb">
					<view class="flex_c" @tap="showDialog(1)">
						<image src="/static/icon_manag@2x.png" mode="aspectFit" style="height: 40upx;width:40upx;"></image>
						<text style="font-size: 15px; padding-left: 20upx;">身份管理</text>
					</view>
					<view  class="flex_c" @tap="toAddress">
						<image src="/static/icon_address@2x.png" mode="aspectFit" style="height: 40upx;width:40upx;"></image>
						<text style="font-size: 15px; padding-left: 20upx;">地址本</text>
					</view>
				</view>
				
			</view>
		</view>
		<popMe ref="dialog" title="请输入密碼" @input="confirmInput" placeholder="請輸入支付密碼"></popMe>
		<view style="margin-top: 30upx;">
			
			<view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;" @tap="showDialog(2)">
				<view class="flex_c">
					<image src="/static/user1.png" class="iconClass" mode="aspectFit"></image>
					<text style="padding-left: 30upx;font-size: 16px;font-weight: bold;">我的團隊</text>
				</view>
				<view class="flex_c">
					<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
				</view>
			</view>
			
			
			<!-- <view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;" @tap="toAccountManage">
				<view class="flex_c">
					<image src="/static/user2.png" class="iconClass" mode="aspectFit"></image>
					<text style="padding-left: 30upx;font-size: 16px;font-weight: bold;">賬號管理</text>
				</view>
				<view class="flex_c">
					<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
				</view>
			</view> -->
			<view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;" @tap="toShouKuan">
				<view class="flex_c">
					<image src="/static/user8.png" class="iconClass" mode="aspectFit"></image>
					<text style="padding-left: 30upx;font-size: 16px;font-weight: bold;">收款方式</text>
				</view>
				<view class="flex_c">
					<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
				</view>
			</view>
			<view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;" @tap="toSecureCenter">
				<view class="flex_c">
					<image src="/static/user3.png" class="iconClass" mode="aspectFit"></image>
					<text style="padding-left: 30upx;font-size: 16px;font-weight: bold;">安全中心</text>
				</view>
				<view class="flex_c">
					<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
				</view>
			</view>
			
			<view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;" @tap="toShare">
				<view class="flex_c">
					<image src="/static/user5.png" class="iconClass" mode="aspectFit"></image>
					<text style="padding-left: 30upx;font-size: 16px;font-weight: bold;">邀請好友</text>
				</view>
				<view class="flex_c">
					<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
				</view>
			</view>
			
			<view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;" @tap="about">
				<view class="flex_c">
					<image src="/static/user6.png" class="iconClass" mode="aspectFit"></image>
					<text style="padding-left: 30upx;font-size: 16px;font-weight: bold;">關於我們</text>
				</view>
				<view class="flex_c">
					<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
				</view>
			</view>
			<view class="flex_sb" style="height: 90upx;border-bottom: 1upx solid #2a3855;" @tap="toSetting">
				<view class="flex_c">
					<image src="/static/user7.png" class="iconClass" mode="aspectFit"></image>
					<text style="padding-left: 30upx;font-size: 16px;font-weight: bold;">設置</text>
				</view>
				<view class="flex_c">
					<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import popMe from "@/components/popupMe.vue";
	export default {
		components:{
			popMe
		},
		data() {
			return {
				secondPassword:'',
				userDetail: '',
				index:''
			};
		},
		onShow:function(){
			this.fetch()
		},
		onLoad:function(){
			this.fetch()
		},
		methods:{
			toAccountManage:function(){
				// uni.showToast({
				// 	title: '待開放',
				// 	icon:'none',
				// 	duration: 1000
				// });
				uni.navigateTo({
					url: './AccountManager',
					
				});
			},
			toSetIcon:function(){
				uni.navigateTo({
					url: './setIcon',	
				});
			},
			showDialog:function(e){
				this.index = e
				this.$refs.dialog.show()
			},
			toShouKuan:function(){
				uni.navigateTo({
					url: './payMode'
				
				});
			},
			about:function(){
				uni.navigateTo({
					url: './about',
					
				});
			},
			async fetch(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
				this.$store.dispatch('copeFun',this.userDetail.userCode)
				console.log(this.$store.state.userCode)
			},
			toIdentity:function(){
				this.$refs.dialog.show()
				// uni.navigateTo({
				// 	url: './identityManage',
					
				// });
			},
				
			toMyTeam:function(){
				uni.navigateTo({
					url: '/pages/userCenter/myTeam'
				});
			},
			toAddress:function(){
				uni.navigateTo({
					url: './addressBook',
					
				});
			},
			toSecureCenter:function(){
				uni.navigateTo({
					url: './secureCenter/secureCenter',
					
				});
			},
			toShare:function(){
				
				if (this.userDetail.staticUserStatus < 1){
					uni.navigateTo({
						url: `./share`,
						
					});
				}
				else {
					uni.navigateTo({
						url: `./share?userCode=${this.userDetail.userCode}&creditToken=${this.userDetail.creditToken}`,
						
					});
					
				}
				
			},
			toSubAccounter:function(){
				// uni.showToast({
				// 	title: '待開放',
				// 	icon:'none',
				// 	duration: 1000
				// });
				uni.navigateTo({
					url: './subAccounter'
				});
			},
			toManage:function(){
				this.$refs.dialog.show()
			},
			confirmInput:function(e){
				this.secondPassword = e
				this.$refs.dialog.content = ''
				
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
					if (this.index ==1){
						uni.navigateTo({
							url: './identityManage',
											
						});
					}else if (this.index ==2){
						this.toMyTeam()
					}
					
				}else {
					uni.showToast({
						title: '支付密码不正确',
						icon:'none',
						duration: 1000
					});
				}
			},
			toSetting:function(){
				uni.navigateTo({
					url: './setting',
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
	.text-overflow{
	  white-space:nowrap;      
	  overflow:hidden;    
	  text-overflow:ellipsis; 
	  font-size: 12px;
	  width: 450upx;
	  
	  
	}
.topBlock{
	height: 400upx;
	width: 100%;
	background: url(../../static/gif/asset.gif);
	background-size: 100% 100%;
}
.iconClass{
	height: 60upx;
	width: 60upx;
}
</style>
