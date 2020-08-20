<template>
	<view>
		<view style="margin: 20upx; 40upx;background: #121c31; height: 300upx;" >
			<view class="flex_c_c" style="padding-top: 100upx;font-size: 26px;font-weight: bold;">
				{{usde||0.0000}}
			</view>
			<view class="flex_c_c" style="font-size: 16px;">可用餘額</view>
		</view>
		<view style="padding-left: 50upx;font-size: 18px;font-weight: bold;margin-top: 40upx;">
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
				account: '',
				pageNum: 1,
				pageSize: 20,
				flowType:['動力C'],
				usde:''
			};
		},
		onLoad:function(options){
			_this = this
			this.usde = options.usde
			// this.account = options.account
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
				if (this.loadingType ==''){
					return 
				}
				this.pageSize += 20
				let data ={
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					flowType: this.flowType
				}
				const res = await this.$http.get('/user/flow',{data: data})
				if (res.data.data.isLastPage){
					this.loadingType = ''
				}
				this.record = res.data.data.list
				this.record.forEach((item)=>{
					item.createTime = this.handleDate(item.createTime)
					
				})
				console.log(res)
			},
			async fetchList(){
				let data ={
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					flowType: this.flowType
				}
				const res = await this.$http.get('/user/flow',{data: data})
				
				this.record = res.data.data.list
				this.record.forEach((item)=>{
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
		}
	}
</script>

<style lang="scss">
     page{
		  background: #091224;
		  color: white;
	}
</style>

