<template>
	<view>
		

		<view style="margin: 10upx 30upx;">
			<view class="banner-class">
				<view class="flex_column" style="padding: 80upx;">
					<view class="flex_c_c">
						<text style="font-size:13px;color: #50bdef">{{i18n.wallet.assetAdd}}</text>
						<image src="../../static/icon_shut@2x.png" class="home_eye" mode="aspectFit" @tap="switchShow" v-if="!isShow"></image>
						<image src="../../static/icon_visible@2x.png" class="home_eye" mode="aspectFit" @tap="switchShow" v-if="isShow"></image>
					</view>
					<view v-if="!isShow" class="flex_c_c" style="font-size:20px;color: #50bdef;padding-top:30upx;">******</view>
					<view v-if="isShow"  class="flex_c_c" style="font-size:23px;font-weight: bold;color: #50bdef;padding-top:20upx;">{{userDetail.usde||0.0000}}</view>
					<view v-if="isShow" class="flex_c_c" style="font-size:13px;font-weight: bold;color: #50bdef;padding-top:20upx;">¥{{(userDetail.usde*7).toFixed(6)}}</view>
				</view>
				<view style="position: absolute; top: 130px;right: 70px;z-index: 99;" @tap="toShoukuanma">
					<image src="../../static/home-code.png" class="home_code" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<!-- 提示框顯示 -->
		<popupMessage ref="dialog" title="友情提示" @input="confirmInput()" :label="content"></popupMessage>
		<view class="gonggao">
			<swiper class="limitp-hg" vertical="true" autoplay="true" circular="true" interval="3000">
					<swiper-item v-for="(item, index) in msg" :key="index">
						<navigator class="scrool-list-item" :url="`/pages/index/detailBulletin?code=${item.announcementCode}`">
						  <image src="/static/icon_announ@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;">
						  <text style="padding-left: 20upx;font-size: 15px;">{{item.title}}</text>
						</navigator>
					</swiper-item>
			</swiper>

		</view>
		<view class="bottomBlock">
			<view class="content" v-if="!isActive">
				<view><text style="font-size: 16px;color: white;">{{i18n.wallet.activeAccount}}</text></view>
				<view style="color: white;font-size: 15px;">
					{{i18n.wallet.activeTip}}
					<!-- 授信令牌是社區身份的標識，在熵鏈網絡及各類延展DAPP中具有無障礙的通行能力和資產行使權力，未來熵鏈還將
					在生態圈內外擁有各種服務特權，廣泛用於互聯網及實體經濟中 -->
				</view>
				<view class="flex_c_c" style="margin-top: 30upx;" @tap="toActive">
					<view class="inClass">{{i18n.wallet.nowActive}}</view>
				</view>
			</view>
			<view v-if="isActive" class="flex_sa" style="padding: 20upx;">
				<view class="flex_column" @tap="toInitBuy">
					<image src="../../static/home-menu1.png" mode="aspectFit" style="height: 120upx; width: 120upx;"></image>
					<text style="color: white;font-size: 14px;padding-top: 10upx;width:150upx;">{{i18n.ecologyIndex.link3}}</text>
				</view>
				<view class="flex_column" @tap="toWallet">
					<image src="../../static/home-menu2.png" mode="aspectFit" style="height: 120upx; width: 120upx;"></image>
					<text style="color: white;font-size: 14px;padding-top: 10upx;">{{i18n.wallet.assetWallet}}</text>
				</view>
				<view class="flex_column" @tap="toUSDFDeal">
					<image src="../../static/home-menu3.png" mode="aspectFit" style="height: 120upx; width: 120upx;"></image>
					<text style="color: white;font-size: 14px;padding-top: 10upx;">{{i18n.ecologyIndex.link5}}</text>
				</view>
				
			</view>
			<view v-if="isActive" class="flex_sa" style="padding: 20upx;">
				<view class="flex_column" @tap="toCharge">
					<image src="../../static/home-menu4.png" mode="aspectFit" style="height: 120upx; width: 120upx;"></image>
					<text style="color: white;font-size: 14px;padding-top: 10upx;">{{i18n.ecologyIndex.link2}}</text>
				</view>
				<view style="width: 120upx;"></view>
			    <view style="width: 120upx;"></view>
			</view>
			
		</view>
		<!-- <view  class="description">
	        <view style="padding: 20upx 30upx;">
				<view><text style="font-size: 16px;color: white;">激活賬戶</text></view>
				<view style="font-size: 15px;color: white;">
					授信令牌是社區身份的標識，在熵鏈網絡及各類延展DAPP中具有無障礙的通行能力和資產行使權力，未來熵鏈還將
					在生態圈內外擁有各種服務特權，廣泛用於互聯網及實體經濟中
				</view>
			</view>
		</view> -->
		
	</view>
</template>

<script>
	import  UpdateVersion from "@/common/update.js";
	import popupMessage from "@/components/popupMessage.vue"
	let _this
	export default {
		components:{
			popupMessage
		},
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		data() {
			return {
				 type:'',
				 title: 'Hello',
				 msg : [],
				 isActive: '',
				 
				 isShow: false,
				 userDetail:'',
				 content:'',
				 link:''
			}
		},
		
		onShow:function(){
			this.setBar()
			this.fetchUserDetail()
			this.getVersion()
			this.fetchBulletin()
			this.checkOut()
			this.fetchAddress()
			this.checkBindPhone()
			
		},
		onLoad() {
			_this = this
			this.setBar()
			this.fetchUserDetail()
			this.getVersion()
			this.fetchBulletin()
			this.checkOut()
			this.fetchAddress()
			this.checkBindPhone()
			uni.setNavigationBarTitle({
			            title:this.$i18nMsg().v2.home
			        });

		},
		methods: {
				
			setBar:function(){
				uni.setTabBarItem(
				  {
					index: 0,
					text: this.$i18nMsg().tab.wallet
				   } 
				)
				uni.setTabBarItem(
				  {
					index: 1,
					text: this.$i18nMsg().tab.ecology
				   } 
				);
				uni.setTabBarItem(
				  {
					index: 2,
					text: this.$i18nMsg().tab.trade
				   } 
				);
				uni.setTabBarItem(
				  {
					index: 3,
					text: this.$i18nMsg().tab.user
				   } 
				);
				
			},
			checkBindPhone:function(){
				if (this.userDetail.phone == ''){
					this.type = 3
					this.showDialog()
				}
			},
			fetchAddress:function(){
				
				uni.request({
					url: 'http://api.bq04.com/apps/5ef9443323389f2df4dc0226/download_token?api_token=8bf033a4189a8fc5faf4010a8af18964',
					success:function(res){
						
						_this.link = `http://download.bq04.com/apps/5ef9443323389f2df4dc0226/install?download_token=${res.data.download_token}`
						
					}
				})
			},
			toCharge:function(){
				if(this.userDetail.phone == ''){
					uni.showToast({
						title: this.$i18nMsg().trade.bindMobile,
						icon: 'none'
					});
					return
				}
				uni.navigateTo({
					url: '/pages/chongzhi/createCharge',
					
				});
			},
			checkOut:function(){
				//動態出局
				if (this.userDetail.userStatus ==4){
					this.type = 2
					this.showDialog()
				}
				//靜態出局
				if (this.userDetail.staticUserStatus>2 &&(this.userDetail.staticUserStatus%3==0)){
					this.type = 1
					this.showDialog()
				}
			},
			showDialog(){
				
				
				if (this.type ==1){
					this.content = `當前賬戶靜態已出局,複投後享受正常收益`
					// this.content = this.$i18nMsg().wallet.currentAccount+this.$i18nMsg().wallet.staticState+this.$i18nMsg().wallet.goOut
				}else if (this.type ==2){
					this.content = `當前賬戶動態已出局,複投後享受正常收益`
					// this.content = this.$i18nMsg().wallet.currentAccount+this.$i18nMsg().wallet.dynamicStatic+this.$i18nMsg().wallet.goOut
				}
				else if (this.type ==3){
					console.log()
					// this.content = '檢測到妳未綁定郵箱和手機，請綁定'
					this.content = this.$i18nMsg().wallet.examinate
					// console.log(this.$i18nMsg().wallet.examinate)
				}
				this.$refs.dialog.show()
			},
			confirmInput:function(type){
				console.log('jowfewf')
				// this.secondPassword = e
				// console.log(this.secondPassword)
				if (this.type==3){
					uni.navigateTo({
						url: '/pages/userCenter/secureCenter/secureCenter'
						
					});
				}else {
					uni.navigateTo({
						url: './buyStore'
						
					});
				}
				
				
			},
			toUSDFDeal:function(){
				if (this.userDetail.phone==''){
					this.type =3
					this.showDialog()
				}else {
					uni.navigateTo({
						url: '/pages/usdfDeal/hall',
						
					});
				}
				
			},
			toShoukuanma:function(){
				let data  = JSON.stringify(this.userDetail)
				uni.navigateTo({
					url: `/pages/userCenter/shoukuanma?userDetail=${data}`,
					
				});
			},
			async fetchBulletin(){
				const res = await this.$http.get('/announcement/list')
				this.msg = res.data.data.list
				console.log(res)
			},
			async getVersion(){
			  
				let version = plus.runtime.version 
				console.log(version)
				const res1 = await this.$http.get('/basicdata/versions')
				console.log(res1.data.data.versions)
				if (version.toString() !== res1.data.data.versions.toString()){
					
					uni.showModal({ //提醒用户更新  
						title: "更新提示",  
						content: '請更新到最新版本',  
						success: (res) => {  
							if (res.confirm) {  
								// plus.runtime.openURL(res1.data.data.address); 
								 UpdateVersion.prototype.downloadPack(_this.link)
							}  
						}  
					})  
				}
				   
			},
			async fetchUserDetail(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
				if (this.userDetail.userStatus !== 0){	
					this.isActive = true
				}else {
					this.isActive = false
				}
				if (this.userDetail.dynamicIsMax == 1){
					this.type =1
					this.showDialog()
				}
				if (this.userDetail.staticIsMax == 1){
					this.type = 2
					this.showDialog()
				}
				
			},
            toActive:function(){
				if (this.userDetail.isMain ==0){
					uni.navigateTo({
						url: './activeSubAccounter'
					});
				}else {
					uni.navigateTo({
						url: './activeAccounter'
					});
				}
				
			},
			switchShow:function(){
				this.isShow = !this.isShow
			},
			toInitBuy:function(){
				uni.navigateTo({
					url: './buyStore'
					
				});
			},
			toWallet:function(){
				uni.navigateTo({
					url: './wallet',
				
				});
			}
		}
	}
</script>

<style>
	page{
		background: #091224;
	}
	
	.navtitle{
		color: #f1ffff;
		font-weight: bold;
		font-size:16px;
		margin-top: 20upx;
		text-align: center;
	}
	/* .banner-class{
		heigth: 400upx;
		width: 100%;
		position: relative;
	} */
	.banner-class{
		height: 370upx;
		width: 100%;
		background: url(../../static/gif/home-banner.gif);
		background-size: 100% 100%;
		position: relative;
	}
	.home_code{
		height: 80upx;
		width: 80upx;
	}
	.home_eye{
		height: 40upx;
		width: 40upx;
		padding-left: 20upx;
		margin-bottom: -10upx;
	}
	.limitp-hg{
			width:calc(100% - 50rpx);
			height: 60rpx;
			line-height: 60rpx;
		}
    .gonggao{
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20upx 30upx;
		height: 90upx;
		border-radius: 8upx;
		background: rgba(13,35,61,0.9);
		color: white;

	}
	.bottomBlock{
		margin-top:50upx;
		height: 800upx;
		width: 100%;
		background: url(../../static/gif/bottomBg.gif);
		background-size: auto;
	}
	
	.content{
		border-radius: 4upx;
		margin:0 30upx;
		background: rgba(13,35,61,0.7);
		padding: 20upx;
		height: 330upx;
	}
	
	.inClass{
		  color: #34f073;
		  font-size: 16px;
		  font-weight: bold;
		  display: flex;
		  width: 100%;
		  height: 90upx;
		  border-radius: 8upx;
		  /* background: #8a8e98; */
		  background: rgba(138,142,152,0.3);
		  justify-content: center;
		  align-items: center;
	}
</style>
