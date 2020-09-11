<template>
	<view>
	<view style="margin: 0 30upx;">
		<view class="topBlock">
			<view style="padding: 30upx;">
				<view class="flex_c_c" style="margin-top: 120upx;">
					<view style="font-size: 25px;font-weight: bold;font-style: italic;">引领熵趋势 掌握熵价值</view>
				</view>
				<view class="flex_c_c" style="margin-top: 80upx;">
					<view style="font-size: 14px;">{{i18n.ecologyInitsource.currentPrice}}：1ETF ≈ {{price}} USDF</view>
				</view>
			</view>
		</view>
		<view v-if="isActive" style="font-size:15px;margin-top: 60upx;">{{i18n.ecologyInitsource.join}}</view>
		<view v-else style="font-size:15px;margin-top: 60upx;"> {{i18n.ecologyInitsource.sAndDy}}</view>
		<view style="font-size:15px;margin-top: 30upx;">
			{{i18n.ecologyInitsource.buyAmount}}
		</view>
		<view class="flex" style="flex-wrap: wrap;margin-top: 30upx;">
			<block v-for='(item,index) in level' :key="index">
				<view class="btn_class11" :style="{color: item.id==selectIndex?'#34f073':''}"  @tap='selectItem(item)'>{{item.label}}</view>
			</block>
		</view>
		<view class="flex_sb" style="margin-top: 40upx;">
			<view v-if="userDetail.isMain==1">
				<text style="font-size: 13px;color: #909baf;">{{i18n.ecologyInitsource.avalible}}：</text><text style="font-size: 13px;color: #34f073;">{{userDetail.signinUsde|| 0}}</text>
			</view>
			<view v-if="userDetail.isMain==0">
				<text style="font-size: 13px;color: #909baf;">{{i18n.ecologyInitsource.avalible}}：</text><text style="font-size: 13px;color: #34f073;">{{ablityShut}}{{i18n.ecologyInitsource.help}}</text>
			</view>
			<view @tap="toDealHall" v-if="userDetail.isMain==1">
				<text style="font-size: 13px;color: #909baf;">{{i18n.ecologyInitsource.not}}USDF?</text><text style="font-size: 13px;color: #34f073;padding-left: 10upx;">{{i18n.ecologyInitsource.go}}</text>
			</view>
		</view>
		<view style="margin-top: 30upx;">
			<view v-if="isActive" class="flex_c_c" >
				<view  class="btn_class" @tap="showDialog(1)">
					{{i18n.ecologyInitsource.nowBuy}}
				</view>
			</view>
			
			<view v-else class="flex_sa">
				<view class="btn_class" @tap="showDialog(2)">{{i18n.ecologyInitsource.staticReinvestment}}</view>
				<view class="btn_class" style="color: #ff0000" @tap="showDialog(3)">{{i18n.ecologyInitsource.dyReinvestment}}</view>
			</view>
		</view>
		<view class="flex_c_c">
				<view>
					<text style="font-size: 13px;color: #909baf;">{{i18n.ecologyInitsource.get}}</text><text style="font-size: 13px;color: #34f073;padding-left: 20upx;">{{ storeRate }}</text><text style="font-size: 13px;color: #909baf;">{{i18n.ecologyInitsource.startAccount}}</text>
				</view>
		</view>
    </view>
	<!-- 提示框顯示 -->
	<popupMessage ref="dialog" title="認購確認" @input="confirmInput(type)" :label="content"></popupMessage>
	
	<view style="margin-top: 50upx;">
		<view>
			<view class="flex">
				<block v-for="(item,index) in sliceArr" :key="index">
					<view @tap="tapSlice(item.id)" style="font-size:16px;margin-right: 40upx;" :style="{color: sliceIndex==item.id?'white':'#909baf'}">{{item.name}}</view>
				</block>
				
				
			</view>
			<view style="margin-top: 40upx;">
				<view class="flex_c" style="font-size: 14px;background: #23355d;height: 80upx;">
					<view style="width: 30%;padding-left: 20upx;">{{i18n.ecologyInitsource.time}}</view>
					<view style="width: 20%;">{{i18n.ecologyInitsource.type}}</view>
					<view style="width: 50%;display: flex;justify-content: flex-end;padding-right: 20upx;">{{i18n.ecologyInitsource.buyAmount}}</view>
				</view>
				<block v-for="(item,index) in record" :key="index">
					<view class="flex_c" style="font-size: 14px;height: 80upx;background: #1a2843;padding-bottom: 30upx;">
						<view style="width: 30%;padding-left: 20upx;">{{item.createTime}}</view>
						<view style="width: 20%;">{{item.details}}</view>
						<view style="width: 50%;display: flex;justify-content: flex-end;padding-right: 20upx;">{{item.usde}}</view>
						
					</view>
				</block>
				
			</view>
			<view style="width: 100%;height: 100upx;"></view>
		</view>
	</view>
	</view>
</template>

<script>
	import popupMessage from "@/components/popupMessage.vue"
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
				ablityShut:'',
				type: 1,
				price:'',
				record:[],
				isActive: true,
				level: [],
				selectIndex: -1,
				record:[],
				sliceIndex: 1,
				sliceArr: [{id: 1,name: this.$i18nMsg().ecologyInitsource.staticBuy},{id: 2,name: this.$i18nMsg().ecologyInitsource.dyBuy}],
				userDetail:'',
				storeRate: 0,
				pageNum: 1,
				pageSize: 20,
				flowType:['认购'],
				content:'',
				
				
			};
		},
		onNavigationBarButtonTap:function(val){
			 
			this.tapSettingButton() 
		    
		},
		onLoad:function(){
			this.fetchShut()
			this.fetchPrice()
			this.fetchList()
			this.fetchList11()
			this.fetchUserDetail()
			uni.setNavigationBarTitle({
			            title:this.$i18nMsg().ecologyIndex.link3
			        });
			var currentWebview = this.$mp.page.$getAppWebview();
			currentWebview.setTitleNViewButtonStyle(0, {  
				text: this.$i18nMsg().ecologyInitsource.titleRight, 
			});  
		},
		methods:{
			async fetchShut(){
				const res = await this.$http.get('/user/main_shunt')
				this.ablityShut = res.data.data.msg
				console.log(res)
			},
			tapSettingButton:function(){
				this.showDialog(4)
			},
			toDealHall:function(){
				if(this.userDetail.phone == ''){
					// uni.showToast({
					// 	title: '請先綁定手機號碼',
					// 	icon: 'none'
					// });
					this.showDialog(5)
					
				}else {
					uni.navigateTo({
						url: '/pages/usdfDeal/hall'
						
					});
				}
				
				
			},
			showDialog(index){
				this.type = index
				let tmp = ''
				this.level.forEach((item)=>{
					if (item.id == this.selectIndex){
						tmp = item.label
					}
				})
				if (index ==1){
					this.content = `確認認購${tmp}`
				}else if (index ==2){
					this.content = `確認靜態復投${tmp}`
				}else if (index ==3){
					this.content = `確認動態復投${tmp}`
				}else if (index ==4){
					this.content = `需耐心等待排隊時間到期，將自動買入熵值`
				}
				else if (index ==5){
					this.content = `請先綁定手機號碼`
				}
				
				this.$refs.dialog.show()
			},
			confirmInput:function(type){
				console.log(type)
				// this.secondPassword = e
				// console.log(this.secondPassword)
				if (type  ==1){
					this.buyStore()
				}else if (type ==2){
					this.buyStore()
				}else if (type ==3){
					this.dynicRenew()
				}else if (type ==5){
					uni.navigateTo({
						url: '/pages/userCenter/secureCenter/secureCenter'
						
					});
				}
				
			},
			async fetchChaifen(){
				
				const res = await this.$http.get('/user/stock_flow')
				let tmp = res.data.data.list
				tmp.forEach((item)=>{
					this.$set(item,'details','配送')
					this.$set(item,'usde',item.stockCount)
					item.createTime = this.handleDate(item.createTime)
				})
				this.record = tmp
				console.log(res)
			},
			//动态复投	
			async dynicRenew(){
				if (this.selectIndex == -1){
					uni.showToast({
						title: '請選擇購買等級',
						icon: 'none'
					});
					return
				}
				let data ={
					level: this.selectIndex
				}
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				const res = await this.$http.get('/dm/anew',{data: data})
				uni.hideLoading()
				uni.showToast({
					title: '复投成功',
					duration: 2000
				});
				// setTimeout(function() {
				// 	uni.navigateBack({
				// 		delta:  -1
				// 	});
				// }, 2000);
			},
			async fetchPrice(){
				
				const res = await this.$http.get('/st/unit_price')
				this.price = res.data.data.msg
				
				console.log(res)
			},
			async fetchList11(){
				// let data ={
				// 	pageNum: this.pageNum,
				// 	pageSize: this.pageSize,
				// 	flowType: this.flowType
				// }
				// const res = await this.$http.get('/user/flow',{data: data})
				
				// this.record = res.data.data.list
				// this.record.forEach((item)=>{
				// 	item.details = '初始源'
				// 	item.usde = -(item.usde/2)
				// 	item.createTime = this.handleDate(item.createTime)
				// })
				// console.log(res)
				let data ={
					type: 0
				}
				const res = await this.$http.get('/st/buy_list',{data: data})
				this.record = res.data.data.list
				this.record.forEach((item)=>{
					item.createTime = this.handleDate(item.createTime)
					if (item.isFinish == 0){
						this.$set(item,'details','排隊中')
						this.$set(item,'usde',item.totalPrice)
					}else {
						this.$set(item,'details','已完成')
						this.$set(item,'usde',item.stockCount)
					}
					
				})
				console.log(res)
			},
			async fetchListDynic(){
				let data ={
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					flowType: this.flowType
				}
				const res = await this.$http.get('/user/flow',{data: data})
				
				this.record = res.data.data.list
				this.record.forEach((item)=>{
					item.details = '进行中'
					item.usde = -(item.usde)
					item.createTime = this.handleDate(item.createTime)
				})
				console.log(res)
			},
			handleDate:function(d){
				let arr = d.split(' ')
				let date1 = arr[0].split('-')
				let date2 = arr[1].split(':')
				
				return date1[1]+'-'+date1[2]+' '+date2[0]+':'+date2[1]
			},
			async fetchUserDetail(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
				if (this.userDetail.staticUserStatus >0){
					this.isActive = false
				}
				
			},
			async buyStore(){
				if (this.selectIndex == -1){
					uni.showToast({
						title: '請選擇購買等級',
						icon: 'none'
					});
					return
				}
				let data ={
					level: this.selectIndex
				}
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				const res = await this.$http.get('/st/share_subscription',{data: data})
				uni.hideLoading()
				uni.showToast({
					title: '认购成功',
					duration: 1000
				});
				setTimeout(function() {
					uni.navigateBack({
						delta:  -1
					});
				}, 2000);
				
			},
			async fetchList(){
				const res = await this.$http.get('/basicdata/user_level')
				this.level = res.data.data.list
				console.log(res)
			},
			selectItem:function(item){
				
				if (!item.canSelect){
					uni.showToast({
						title: item.hint,
						icon: 'none'
					});
					return
				}
				this.selectIndex = item.id
				this.storeRate = item.id/2
				
			},
			tapSlice:function(index){
				this.sliceIndex = index
				if (index == 1){
					this.fetchList11()
				} else {
					this.fetchListDynic()
				}
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
	margin-right: 30upx;
	margin-top: 30upx;
  	background: #2a3650;
  	justify-content: center;
  	align-items: center;
  }
</style>
