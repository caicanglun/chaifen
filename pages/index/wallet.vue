<template>
	
	<view style="margin: 0 30upx;">
		<view class="topBlock">
			<view style="padding: 30upx;">
				<view class="flex_c_c" style="margin-top: 50upx;font-size: 16px;">{{i18n.v2.total}}（USDF)</view>
				<view class="flex_c_c" style="margin-top: 30upx;">
					<view style="font-size: 30px;font-weight: bold;">{{userDetail.usde||0}}</view>
				</view>
				<view style="margin-top: 80upx;" class="flex_sa">
					<view class="flex_c">
						<image src="/static/opt2.png" mode="aspectFit" style="height: 40upx;width:40upx;"></image>
						<text style="font-size: 15px;padding-left: 20upx;" @tap="toTixian">{{i18n.walletAsset.withdraw}}</text>
					</view>
					<view class="flex_c">
						<image src="/static/opt3.png" mode="aspectFit" style="height: 40upx;width:40upx;"></image>
						<text style="font-size: 15px;padding-left: 20upx;" @tap="toFaZhuan">{{i18n.walletAsset.transfer}}</text>
					</view>

				</view>
			</view>
		</view>
		<view style="margin-top: 50upx;padding: 0 39upx;">
			<view class="flex_sb">
				<view style="height: 200upx;width: 300upx;background: #111c30;" @tap="toInitStore">
					<view style="margin-top:30upx;font-size: 18px;" class="flex_c_c">{{i18n.ecologyDetail.types[1]}}</view>
					<view class="flex_c_c"><image src="/static/next.png" mode="aspectFit" style="height: 100upx;width: 100upx;"></image></view>
				</view>
				<view style="height: 200upx;width: 300upx;background: #111c30;" @tap="toShangZhi">
					<view style="margin-top:30upx;font-size: 18px;" class="flex_c_c">{{i18n.ecologyDetail.types[3]}}</view>
					<view class="flex_c_c"><image src="/static/next.png" mode="aspectFit" style="height: 100upx;width: 100upx;"></image></view>
				</view>
			</view>
			<view class="flex_sb" style="margin-top: 20upx;">
				<view style="height: 200upx;width: 300upx;background: #111c30;" @tap="toDongliyuan">
					<view style="margin-top:30upx;font-size: 18px;" class="flex_c_c">{{i18n.ecologyIndex.link6}}</view>
					<view class="flex_c_c"><image src="/static/next.png" mode="aspectFit" style="height: 100upx;width: 100upx;"></image></view>
				</view>
				<view style="height: 200upx;width: 300upx;background: #111c30;" @tap="toZhuliyuan">
					<view style="margin-top:30upx;font-size: 18px;" class="flex_c_c">{{i18n.ecologyDetail.types[2]}}</view>
					<view class="flex_c_c"><image src="/static/next.png" mode="aspectFit" style="height: 100upx;width: 100upx;"></image></view>
				</view>
			</view>
			<view class="flex_sb" style="margin-top: 20upx;">
				<view style="height: 200upx;width: 300upx;background: #111c30;" @tap="toEnergyPool">
					<view style="margin-top:30upx;font-size: 18px;" class="flex_c_c">{{i18n.ecologyDetail.types[4]}}</view>
					<view class="flex_c_c"><image src="/static/next.png" mode="aspectFit" style="height: 100upx;width: 100upx;"></image></view>
				</view>
				<view style="height: 200upx;width: 300upx;background: #111c30;" @tap="toMoney">
					<view style="margin-top:30upx;font-size: 18px;" class="flex_c_c">USDF</view>
					<view class="flex_c_c"><image src="/static/next.png" mode="aspectFit" style="height: 100upx;width: 100upx;"></image></view>
				</view>
			</view>
			
		</view>
		
		
    </view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				isActive: false,
				level: [{id: 1,name: '100USDF'},{id: 2,name: '500USDF'},{id: 3,name: '1000USDF'}],
				selectIndex: -1,
				record:[{time: '01-12 06:05',type: '排隊中',counter: '50.0000'}],
				sliceIndex: 1,
				sliceArr: [{id: 1,name: '靜態認購'},{id: 2,name: '動態認購'}],
				userDetail:''
			};
		},
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		onShow:function(){
			this.fetchUserDetail()
		},
		onLoad:function(){
			this.fetchUserDetail()
			uni.setNavigationBarTitle({
			            title:this.$i18nMsg().wallet.assetWallet
			        });
		},
		methods:{
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
					url: `./fazhuan`
					
				});
			},
			toTixian:function(){
				uni.navigateTo({
					url: `./tixian`,
					
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
	height: 400upx;
	width: 100%;
	background: url(../../static/gif/asset.gif);
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
