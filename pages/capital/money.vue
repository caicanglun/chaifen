<template>
	<view>
		<view style="margin: 0 30upx;">
			<view class="topBlock">
				<view class="flex" style="padding-top: 40upx;padding-left: 40upx;">
					<block v-for="(item,index) in sliceArr" :key="index">
						<view @tap="tapSlice(item.id)"  :class="sliceIndex==item.id?'active':'switchTab'">{{item.name}}</view>
					</block>
				
				</view>
				<view class="flex_c_c" style="margin-top: 30upx;" v-if="sliceIndex ==1">
					<view  style="font-size: 30px;font-weight: bold;">{{userDetail.usde||0}}</view>
					<view style="font-size: 15px;padding-top: 20upx;padding-left: 5upx;">USDF</view>
				</view>
				<view  class="flex_c_c" style="font-size: 14px;color: #909baf;" v-if="sliceIndex ==1">
					¥{{userDetail.usde*7 ||0}}
				</view>
				<view class="flex_c_c" style="margin-top: 30upx;" v-if="sliceIndex ==2">
					<view  style="font-size: 30px;font-weight: bold;">{{userDetail.signinUsde||0}}</view>
					<view style="font-size: 15px;padding-top: 20upx;padding-left: 5upx;">USDF</view>
				</view>
				<view  class="flex_c_c" style="font-size: 14px;color: #909baf;" v-if="sliceIndex ==2">
					¥{{userDetail.signinUsde*7 ||0}}
				</view>
			</view>
			
		</view>
		<view class="flex_sb" style="font-size: 16px;margin-top:30upx;padding: 0 20upx;">
			<view>財務記錄</view>
			<view class="flex_c">
				<image src="/static/icon_filter@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
				<text style="padding-left: 20upx;"></text>
				<picker @change="bindPickerChange" :value="index" :range="array">
				     <view class="uni-input">{{index==-1?'篩選':array[index]}}</view>
				</picker>
			</view>
		</view>
		<view style="margin-top: 40upx;">
			<view class="flex_c" style="font-size: 14px;background: #23355d;height: 80upx;">
				<view style="width: 30%;padding-left: 20upx;">時間</view>
				<view style="width: 30%;">類型</view>
				<view style="width: 40%;display: flex;justify-content: flex-end;padding-right: 20upx;">金額</view>
			</view>
			<block v-for="(item,index) in record" :key="index">
				<view v-if="sliceIndex ==1">
					<view class="flex_c" style="font-size: 14px;height: 80upx;background: #1a2843;padding-bottom: 30upx;">
						<view style="width: 30%;padding-left: 20upx;">{{item.createTime}}</view>
						<view style="width: 30%;">{{item.details}}</view>
						<view style="width: 40%;display: flex;justify-content: flex-end;padding-right: 20upx;">{{item.usde}}</view>
					</view>
				</view>
				<view v-else>
					<view class="flex_c" style="font-size: 14px;height: 80upx;background: #1a2843;padding-bottom: 30upx;" >
						<view style="width: 30%;padding-left: 20upx;">{{item.createTime}}</view>
						<view style="width: 30%;">{{item.details}}</view>
						<view style="width: 40%;display: flex;justify-content: flex-end;padding-right: 20upx;">{{item.usde}}</view>
					</view>
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
				record:[{time: '01-12 06:05',usde: '25.2356',counter: '50.0000'}],
				loadingType: 'more',
				sliceArr: [{id: 1,name: '資金賬戶'},{id: 2,name: '資產賬戶'}],
				sliceIndex: 1,
				userDetail:'',
				pageNum: 1,
				pageSize: 20,
				flowType:['動力A','動力B','動力C','储能池释放','资金转资产','静态奖励','动态复投','静态复投'],
				index: -1,
				array: ['全部','初始源', '提現','认购', '動力A','動力B','動力C','储能池释放','资金转资产','静态奖励','动态复投','静态复投','USDF交易'],
				usdeArr:['動力A','動力B','動力C','储能池释放','资金转资产','静态奖励','动态复投','静态复投'],
				signinUsdeArr:['初始源','认购','系统赠送资产','提現','USDF交易','充值'],
				zichanList:[],
				zijinList:[]
			};
		},
		onLoad:function(){
			_this = this
			this.fetchList()
			this.fetchUserDetail()
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
			bindPickerChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.target.value)
			    this.index = e.target.value
				if (this.index ==0){
					this.flowType = []
					this.fetchList()
				}else {
					this.flowType = [this.array[this.index]]
					
					
					this.fetchList()
				}
				
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
			handleDate:function(d){
				let arr = d.split(' ')
				let date1 = arr[0].split('-')
				let date2 = arr[1].split(':')
				
				return date1[1]+'-'+date1[2]+' '+date2[0]+':'+date2[1]
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
				
				// this.filterList(res.data.data.list)
				// this.zijinlistback(res.data.data.list)
				// this.record = this.zijinList
				console.log(res)
			},
	// 	    zijinlistback:function(list){
	// 			list.forEach((item)=>{
	
	// 					this.zijinList.push(item)
					
	// 			})
	// 		},
			// filterList:function(list){
			// 	list.forEach((item)=>{
			// 		if (item.details=="资金转资产" || item.details=="提現"){
			// 			this.zichanList.push(item)
			// 		}
			// 	})
			// },
			tapSlice:function(index){
				this.sliceIndex = index
				if (index ==1){
					this.pageSize = 20
					this.loadingType = 'more'
					this.flowType = this.usdeArr
				}else if(index ==2){
					this.loadingType = 'more'
					this.pageSize = 20
					this.flowType = this.signinUsdeArr
				}
				this.fetchList()
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
		
	.switchTab{
		color: #909baf;
		font-size:14px;
		margin-right: 30upx;
		padding: 5upx 10upx;
		border-radius: 5upx;
	}
	.active{
		color: #34F073;
		font-size:14px;
		margin-right: 30upx;
		background: #283651;
		padding: 5upx 10upx;
		border-radius: 5upx;
	}
	
</style>
