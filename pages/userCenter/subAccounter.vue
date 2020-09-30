<template>
	<view>
		<view>
			<view style="margin: 20upx 30upx;" v-if="items.length>0">
					 <uni-grid :column="3" :show-border="false" :square="false">
					 
							<uni-grid-item v-for="(item, index) in items " :key="index" >
								<view style="display: flex;align-items:center;flex-direction: column; width:220upx;margin-top: 40upx;" @tap="switchID(item.userCode,item.isUsing)">
									<view class="flex_c_c circleSelect" style="width: 160upx;height: 160upx;">
										<view class="flex_c_c" v-if="item.icon!==''">
											<image :src="item.icon" style="width: 140upx;height: 140upx;border-radius: 50%" mode="aspectFit"></image>
										</view>
										<view class="flex_c_c" v-else>
											<image src="/static/gif/eco8.png" style="width: 140upx;height: 140upx;border-radius: 50%" mode="aspectFit"></image>
										</view>
										<view class="widgit" v-if="item.isUsing==1">當前</view>
										<view class="widgitMaster" v-if="item.isMain==1">主</view>
									</view>
									<view class="flex_c_c" style="font-size: 14px;margin-top: 20upx;">{{item.userCode}}</view>
								</view>
								
							</uni-grid-item>
						    <uni-grid-item>
								<view style="display: flex;align-items:center;flex-direction: column; width:220upx;margin-top: 40upx;" @tap="toAddSub">
									<view class="flex_c_c" style="width: 140upx;height:140upx;">
										<view class="flex_c_c">
											<image src="/static/img_add.png" style="width: 140upx;height: 140upx;border-radius:50%;" mode="aspectFit"></image>
										</view>
										
									</view>
									<view class="flex_c_c" style="font-size: 14px;margin-top: 20upx;">{{i18n.user.create}}</view>
								</view>
							</uni-grid-item>
							
					 </uni-grid>
			</view>
						 
			
			<!-- <block v-for="(item,index) in items" :key="index">
				<view class="flex_column" style="margin-top: 20upx;margin-right: 40upx;" @tap="switchID(item.userCode,item.isUsing)">
					<view class="flex_c_c circleSelect" style="width: 160upx;height: 160upx;">
						<view class="flex_c_c" v-if="item.icon!==''">
							<image :src="item.icon" style="width: 140upx;height: 140upx;border-radius: 50%" mode="aspectFit"></image>
						</view>
						<view class="flex_c_c" v-else>
							<image src="/static/gif/eco8.png" style="width: 140upx;height: 140upx;border-radius: 50%" mode="aspectFit"></image>
						</view>
						<view class="widgit" v-if="item.isUsing==1">當前</view>
						<view class="widgitMaster" v-if="item.isMain==1">主</view>
					</view>
					<view class="flex_c_c" style="font-size: 14px;margin-top: 20upx;">{{item.userCode}}</view>
				</view>
			</block> -->
			
			
			
		</view>
		<view style="margin-top: 100upx;" class="fixedButton" >
			<view>
				<view class="btn_class" @tap="submit">{{ i18n.user.oneStepCollect }}</view>
			</view>
			<view style="color: #818b9e;font-size: 13px;margin-top:10upx;">
				{{ i18n.common.warmTip}}
			</view>
			<view style="color: #818b9e;font-size: 13px;margin-top:10upx;padding: 0 30upx;">
				{{i18n.user.subAccountTip}}
			</view>
			<!-- <view style="color: #818b9e;font-size: 13px;margin-top:10upx;">
				創建子賬戶需要激活方可創建，子賬戶將終身綁定主賬戶，子賬
			</view>
			<view style="color: #818b9e;font-size: 13px;margin-top:10upx;">
				戶的操作將通過主賬戶切換進入完成，並且子賬戶認購，創建金
			</view>
			<view style="color: #818b9e;font-size: 13px;margin-top:10upx;">
				額全部由主賬戶的資金扣除
			</view> -->
		</view>
		
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		data() {
			return {
				items:[]
			};
		},
		onShow:function(){
			this.fetch()
		},
		onLoad:function(){
			this.fetch()
			uni.setNavigationBarTitle({
			    title:this.$i18nMsg().page.subAccount
			});
		},
		methods:{
			async switchID(userCode,isUsing){
				if (isUsing ==0){
					let data ={
						userCode: userCode
					}
					const res = await this.$http.get('/user/cut_account',{data: data})
					uni.setStorageSync('token',res.data.data.msg)
					uni.showToast({
						title: '切換成功'
					});
					this.fetch()
				}	
			},
			async fetch(){
				const res = await this.$http.get('user/account_tree')
				this.items = res.data.data.list
				console.log(res)
			},
			toAddSub:function(){
				this.items.forEach((item)=>{
					if (item.isUsing==1){
						if (item.isMain ==1){
							uni.navigateTo({
								url: './addSub'
							});
						}else {
							uni.showToast({
								title: '子賬戶不能創建子賬戶',
								icon:'none',
								duration: 1000
							});
						}
					}
				})
				
			},
			async submit(){
				uni.showLoading({
					title: '歸集中',
					mask: true
				})
				const res = await this.$http.get('/user/gather')
				uni.hideLoading()
				uni.showToast({
					title: '歸集成功'
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
  .circleSelect{
	  position: relative;
	  border: 2upx solid #12f6f7;
	  border-radius: 50%;
  }
  .widgit{
	 background: #34f073;
	 color: white;
	 height: 40upx;
	 width: 80upx;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 position: absolute;
	 border-radius: 10upx;
	 z-index: 99;
	 bottom: 0;
	 right: 0;
	 font-size: 15px;
	 font-weight: bold;
  }
  .widgitMaster{
  	 background: #34f073;
  	 color: white;
  	 height: 40upx;
  	 width: 60upx;
  	 display: flex;
  	 justify-content: center;
  	 align-items: center;
  	 position: absolute;
  	 border-radius: 10upx;
  	 z-index: 99;
  	 top: -0;
  	 left: 0;
  	 font-size: 15px;
  	 font-weight: bold;
  }
  .fixedButton{
	  position: fixed;
	  bottom: 0;
	  height: 400upx;
	  width: 100%;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  
	
  }
</style>
