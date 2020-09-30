<template>
	<view>
		<block v-for="(item,index) in items" :key="index">
			<view style="font-size: 13px;text-align: center;">{{item.createTime}}</view>
			<view style="background: #121c31;margin-top: 20upx;margin-left: 30upx;margin-right: 30upx;border-radius: 6upx;padding:20upx;">
				<view>
					<text style="font-size: 15px;">{{i18n.user.question }}：{{item.userTitle}}</text>
				</view>
				<view>
					<text style="font-size: 15px;color: #bbbbbb;padding-left: 20upx;">{{item.userContent}}</text>
				</view>
				<view v-if="item.systemIsRead==1">
					<text style="font-size: 15px;">{{ i18n.user.serviceReplay}}：{{item.systemTitle}}</text>
				</view>
				<view v-if="item.systemIsRead==1">
					<text style="font-size: 15px;color: #bbbbbb;padding-left: 20upx;">{{item.systemContent}}</text>
				</view>
				<view  class="flex_sb">
					<view></view>
					<view>{{item.systemIsRead==0?'暫未回復':'已回復'}}</view>
				</view>
			</view>
		</block>
		
		
		<uniLoadMore :status="loadingType"></uniLoadMore>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	let _this,timer;
	export default {
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		components:{
			uniLoadMore
		},
		data() {
			return {
				loadingType:'more',
				items:[],
				pageNum: 1,
				pageSize: 20,
			};
		},
	onReachBottom:function(){
		 if (timer != null) {
		            clearTimeout(timer);
		        }
		   timer = setTimeout(function() {
		        _this.fetchList();
		        }, 1000);
	},
	onLoad:function(){
		_this = this
		this.fetchList()
		uni.setNavigationBarTitle({
		            title:this.$i18nMsg().page.feedBack
		        });
	},
		methods:{
			async fetchList(){
				if (this.loadingType == ''){
					return
				}
				let data ={
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				
				const res = await this.$http.get('/message/list',{data: data})
				if (res.data.data.isLastPage){
					this.loadingType = ''
				}else {
					this.pageSize += 20
				}
				this.items = res.data.data.list
				console.log(res)
			},
		}
	}
</script>

<style lang="scss">
     page{
     	  background: #091224;
		  font-size: 14px;
		  color: #FFFFFF;
     }
</style>
