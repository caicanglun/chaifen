<template>
	<view>
		<view style="margin: 20upx; 40upx;background: #121c31; height: 250upx;" >
			<view style="text-align: center;padding-top: 60upx;font-size: 26px;font-weight: bold;">
				{{ablelity}}
			</view>
			<view class="flex_c_c" style="font-size: 14px;">可用餘額</view>
			<!-- <view style="text-align: center;"><text style="font-size: 16px;">折合：</text><text style="font-size: 14px;">0.056855</text><text style="padding-left:10upx;font-size: 15px;">USDE</text></view> -->
		</view>
		<view class="flex" style="font-size: 16px;">
			財務記錄
		</view>
		<view style="margin-top: 40upx;">
			<view class="flex_c" style="font-size: 14px;background: #23355d;height: 80upx;">
				<view style="width: 30%;padding-left: 20upx;">時間</view>
				<view style="width: 20%;">類型</view>
				<view style="width: 50%;display: flex;justify-content: flex-end;padding-right: 20upx;">金額</view>
			</view>
			<block v-for="(item,index) in record" :key="index">
				<view class="flex_c" style="font-size: 14px;height: 80upx;background: #1a2843;padding-bottom: 30upx;">
					<view style="width: 30%;padding-left: 20upx;">{{item.createTime}}</view>
					<view style="width: 20%;">{{item.details}}</view>
					<view style="width: 50%;display: flex;justify-content: flex-end;padding-right: 20upx;">{{item.usde}}</view>
				</view>
			</block>
			<!-- <uniLoadMore :status="loadingType"></uniLoadMore> -->
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
				sliceArr: [{id: 1,name: '靜態認購'},{id: 2,name: '動態認購'}],
				sliceIndex: 1,
				flowType:['初始源'],
				pageNum:1,
				pageSize:20,
				ablelity:0
			};
		},
		onLoad:function(){
			_this = this
			this.fetchList()
		},
		onReachBottom:function(){
			 if (timer != null) {
			            clearTimeout(timer);
			        }
			   timer = setTimeout(function() {
			        _this.fetchMoreList();
			        }, 1000);
		},
		methods:{
			async fetchMoreList(){
				
			},
			async fetchList(){
				// let data ={
				// 	type: 0
				// }
				// const res = await this.$http.get('/st/buy_list',{data: data})
				// this.record = res.data.data.list
				// this.record.forEach((item)=>{
				// 	item.createTime = this.handleDate(item.createTime)
				// 	if (item.isFinish == 0){
				// 		this.$set(item,'details','排隊中')
				// 	}else {
				// 		this.$set(item,'details','已完成')
				// 	}
				// })
				// console.log(res)
				let data ={
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					flowType: this.flowType
				}
				const res = await this.$http.get('/user/flow',{data: data})
				
				this.record = res.data.data.list
				this.record.forEach((item)=>{
					item.createTime = this.handleDate(item.createTime)
					this.ablelity = this.ablelity+parseInt(item.usde) 
				})
			},
			handleDate:function(d){
				let arr = d.split(' ')
				let date1 = arr[0].split('-')
				let date2 = arr[1].split(':')
				
				return date1[1]+'-'+date1[2]+' '+date2[0]+':'+date2[1]
			},
			tapSlice:function(index){
				this.sliceIndex = index
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
