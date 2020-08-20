<template>
	<view>
		
		<view style="height: 65upx;">
			<dropMenuRegion @selected="selectBulletin"></dropMenuRegion>
		</view>
		
		
		<view style="white-space: pre-wrap;">
			<!-- <view style="margin-top: 20upx;" class="flex_c_c">
				<image src="../../static/gif/eco8.png" mode="aspectFit" style="height: 100upx;width: 100upx;"></image>
			</view> -->
			<view style="background: #0d0d31;width: 750upx;height: 200upx;">
				<view style="padding:30upx;">
					<view style="font-size: 18px;font-weight: bold;">{{bulletin.title}}</view>
					<view style="font-size: 12px;margin-top: 20upx;">{{bulletin.createTime}}</view>
				</view>
			</view>
			
			
			<!-- <view class="flex_c" style="font-size: 15px;border-bottom: 1upx solid #999999;height: 100upx;"> {{bulletin.title}}</view> -->
			<view style="margin-top: 20upx;padding: 0 30upx;font-size: 15px;">
				<rich-text type="text" :nodes="demoHtml"></rich-text>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	var graceRichText = require("@/components/richText.js");
	import dropMenuRegion from "@/components/dropMenuRegion.vue"
	export default {
		components:{
			dropMenuRegion
		},
		filters:{
			// handleTime:function(val){
			// 	return val.split(' ')[0]
			// }
		},
		data() {
			return {
				show_business_change:false,
				bulletin:'',
				code:'',
				demoHtml:'',
				msg:[]
				
			};
		},
		
		onLoad:function(options){
			this.code = options.code
			this.fetch()
			// this.fetchBulletin()
		},
			
		methods:{
			selectBulletin:function(e){
				console.log(e)
				if (e !==''){
					this.code = e
					this.fetch()
				}
			},
			async fetch(){
				let data ={
					announcementCode: this.code
				}
				const res = await this.$http.get('/announcement/details',{data: data})
				console.log(res)
				this.bulletin = res.data.data
				this.demoHtml = graceRichText.format(res.data.data.content)
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
