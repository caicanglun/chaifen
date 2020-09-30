<template>
	<view>
		<view style="margin: 10upx 30upx;line-height: 50px;">
			<view class="flex_sb" style="align-items: center;border-bottom: 1upx solid #2a3855;" @tap="toBindPhone">
				<view>{{ i18n.user.mobile}}</view>
				<view class="flex_c_c">
					<text style="padding-right: 10upx;" v-if="userDetail.phone!==''">{{userDetail.phone | showStar}}</text>
					<text style="padding-right: 10upx;" v-else>{{ i18n.user.toBind}}</text>
					<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
				</view>
			</view>
			<view class="flex_sb" style="align-items: center;border-bottom: 1upx solid #2a3855;" @tap="toMailBind">
				<view>{{ i18n.user.email}}</view>
				<view class="flex_c_c"><text style="padding-right: 10upx;">{{userDetail.mail?userDetail.mail:i18n.user.toBind}}</text><image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image></view>
			</view>
			<view class="flex_sb" style="align-items: center;border-bottom: 1upx solid #2a3855;" @tap="toModiLoginPass">
				<view>{{ i18n.common.loginPw}}</view>
				<view class="flex_c_c"><text style="padding-right: 10upx;">{{ i18n.user.modify}}</text><image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image></view>
			</view>
			<view class="flex_sb" style="align-items: center;border-bottom: 1upx solid #2a3855;" @tap="toModiPayPass">
				<view>{{ i18n.registerBackup.paymentPassword}}</view>
				<view class="flex_c_c"><text style="padding-right: 10upx;">{{ i18n.user.modify}}</text><image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image></view>
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
				userDetail: '',
			};
		},
		filters:{
			showStar:function(value){
				
				return value.substr(0,3)+'****'+value.substr(-3)
			}
		},
		onShow:function(){
			this.fetch()
		},
		onLoad:function(){
			this.fetch()
			uni.setNavigationBarTitle({
			    title:this.$i18nMsg().page.safe
			});
		},	
		methods:{
			async fetch(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
				
			},
			toBindPhone:function(){
				// uni.showToast({
				// 	title: '待开放',
				// 	icon: 'none',
				// 	duration: 1000
				// });
				if (this.userDetail.phone !==''){
					return
				}
				uni.navigateTo({
					url: './bindPhone'
					
				});
			},
			toModiPayPass:function(){
				uni.navigateTo({
					url: `./modiPayPass?phone=${this.userDetail.phone}&email=${this.userDetail.mail}`
				})	
			},
			toModiLoginPass:function(){
				uni.navigateTo({
					url: `./modifyLoginPass?phone=${this.userDetail.phone}&email=${this.userDetail.mail}`,
					
				});
			},
			toMailBind:function(){
				if (this.userDetail.mail ==''){
					uni.navigateTo({
						url: './bindEmail',
						
					});
				}
				
			}
		}
	}
</script>

<style lang="scss">
page{background:#091224;width: 750upx;overflow-x: hidden;color: #FFFFFF;font-size: 14px;}
</style>
