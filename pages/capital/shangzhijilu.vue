<template>
	<view>
		<view style="margin: 20upx; 40upx;background: #121c31; height: 300upx;" >
			<view style="text-align: center;padding-top: 60upx;font-size: 26px;font-weight: bold;">
				<text style="font-size:16px;padding-right: 10upx;padding-top: 5upx;font-weight: bold;">ECF</text>{{userDetail.stockCount}}
			</view>
			<view class="flex_c_c" style="font-size: 14px;">可用餘額</view>
			<view style="text-align: center;"><text style="font-size: 16px;">折合：</text><text style="font-size: 14px;">{{(userDetail.stockCount*price).toFixed(6)}}</text><text style="padding-left:10upx;font-size: 15px;">USDF</text></view>
		</view>
		<view class="flex">
			<block v-for="(item,index) in sliceArr" :key="index">
				<view @tap="tapSlice(item.id)" style="font-size:16px;margin-right: 40upx;" :style="{color: sliceIndex==item.id?'white':'#909baf'}">{{item.name}}</view>
			</block>

		</view>
		<view style="margin-top: 40upx;">
			<view class="flex_c" style="font-size: 14px;background: #23355d;height: 80upx;">
				<view style="width: 30%;padding-left: 20upx;">時間</view>
				<view style="width: 20%;">類型</view>
				<view style="width: 50%;display: flex;justify-content: flex-end;padding-right: 20upx;">數量</view>
			</view>
			<block v-for="(item,index) in record" :key="index">
				<view class="flex_c" style="font-size: 14px;height: 80upx;background: #1a2843;padding-bottom: 30upx;" v-if="item.isFinish==1">
					<view style="width: 30%;padding-left: 20upx;" v-if="sliceIndex==1">{{item.finishTime||''}}</view>
					<view style="width: 30%;padding-left: 20upx;" v-else>{{item.createTime||''}}</view>
					<view style="width: 20%;">{{item.details||''}}</view>
					<view style="width: 50%;display: flex;justify-content: flex-end;padding-right: 20upx;">{{item.stockCount||''}}</view>
				</view>
			</block>
			<uniLoadMore :status="loadingType"></uniLoadMore>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	let _this,timer;
	export default {
		components:{
			uniLoadMore
		},
		data() {
			return {
				record:[],
				loadingType: 'more',
				sliceArr: [{id: 1,name: '交易記錄'},{id: 2,name: '配送記錄'}],
				sliceIndex: 1,
				pageNum: 1,
				pageSize: 20,
				flowType:['认购'],
				userDetail:'',
				price:''
			};
		},
		onLoad:function(){
			_this = this
			this.fetchPrice()
			this.fetchUserDetail()
			this.fetchList()
		},
		onReachBottom:function(){
			 if (timer != null) {
			            clearTimeout(timer);
			        }
			   timer = setTimeout(function() {
			        // _this.fetchMoreList();
			        }, 1000);
		},
		methods:{
			async fetchChaifen(){
				
				const res = await this.$http.get('/user/stock_flow')
				let tmp = res.data.data.list
				tmp.forEach((item)=>{
					this.$set(item,'details','配送')
					this.$set(item,'usde',item.stockCount)
					this.$set(item,'isFinish',1)
					item.createTime = this.handleDate(item.createTime)
				})
				this.record = tmp
				console.log(res)
			},
			async fetchPrice(){
				
				const res = await this.$http.get('/st/unit_price')
				this.price = res.data.data.msg
				
				console.log(res)
			},
			async fetchUserDetail(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
				
			},
			async fetchMoreList(){
				if (this.loadingType ==''){
					return 
				}
				this.pageSize += 20
				let data ={
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				const res = await this.$http.get('/user/flow',{data: data})
				if (res.data.data.isLastPage){
					this.loadingType = ''
				}
				this.record = res.data.data.list
				this.record.forEach((item)=>{
					item.finishTime = this.handleDate(item.finishTime)
					if (item.buyOrSell==1){
						this.$set(item,'details','买方')
					}else{
						this.$set(item,'details','卖方')
					}
				})
				console.log(res)
			},
			handleDate:function(d){
				let arr = d.split(' ')
				let date1 = arr[0].split('-')
				let date2 = arr[1].split(':')
				return date1[1]+'-'+date1[2]+' '+date2[0]+':'+date2[1]
			},
			async fetchList(){
				let data ={
					isFinish: '',
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				const res = await this.$http.get('/deal/stock_flow',{data: data})
				this.record = res.data.data.list
				console.log(res)
				this.record.forEach((item,index)=>{
					item.finishTime = this.handleDate(item.finishTime)
					if (item.buyOrSell==1){
						this.$set(item,'details','买方')
					}else{
						this.$set(item,'details','卖方')
					}
					
				})
				
			},
			// async fetchList(){
			// 	let data ={
			// 		pageNum: this.pageNum,
			// 		pageSize: this.pageSize,
			// 		flowType: this.flowType
			// 	}
			// 	const res = await this.$http.get('/user/flow',{data: data})
			// 	this.record = res.data.data.list
			// 	this.record.forEach((item)=>{
			// 		item.createTime = this.handleDate(item.createTime)
			// 	})
			// 	console.log(res)
			// },
			tapSlice:function(index){
				this.sliceIndex = index
				if (index == 1){
					this.loadingType = 'more'
					this.fetchList()
				} else {
					this.fetchChaifen()
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
</style>
