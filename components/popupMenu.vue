<template>
	<view>
		<!-- 弹出层 -->
		<view  class="uni-banner" style="font-size: 14px;line-height: 50px;padding: 30upx 50upx;" v-if="bannerShow">
			<view  @tap="confirmBanner(1)">
				<image src="/static/icon_1.png" mode="aspectFit" style="height: 30upx;width: 30upx;"></iamge>
				<text style="padding-left: 20upx;">{{ i18n.otc.orderRecord}}</text>
			</view>
			<view @tap="confirmBanner(2)">
				<image src="/static/icon_2.png" mode="aspectFit" style="height: 30upx;width: 30upx;"></iamge>
				<text style="padding-left: 20upx;">{{ i18n.otc.myPending}}</text>
			</view>
			<view @tap="confirmBanner(3)">
				<image src="/static/icon_3.png" mode="aspectFit" style="height: 30upx;width: 30upx;"></iamge>
				<text style="padding-left: 20upx;">{{ i18n.otc.releasePending}}</text>
			</view>
		</view>
		
		<!-- 做黑色阴影颜色 -->
		<view class="uni-mask" v-if="bannerShow" @tap="closeBanner"></view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icons/uni-icons.vue";
	export default {
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		components:{
			uniIcon
		},
		props:{
			title:{
				type: String,
				default: '请输入'
			},
			label:{
				type: String,
				default: '无内容'
			},
			placeholder:{
				type: String,
				default: '请输入'
			}
		},
		data() {
			return {
				
				bannerShow:false,
				content: ''
			};
		},
		methods:{
			radioChange:function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].id === evt.target.id) {
						this.current = i;
						this.content = this.items[i].label
						break;
					}
				}
				
			},
			closeBanner:function(){
				this.bannerShow=false;
			},
			show:function(){
				this.bannerShow=true;
			},
			confirmBanner:function(e){
				
				this.$emit('input',e)
			
				
				this.bannerShow = false
			}
		}
		
	}
</script>

<style lang="scss">
     /* 弹出层形式的广告 */
     	.uni-banner {
     		width: 250upx;
     		position: fixed;
     		right: 50upx;
     		top: 8vh;
     		z-index: 99;
     		border-radius: 5upx;
			background: #111c30;
     	}
     	.uni-mask{
     		position: fixed;
     		top:0;
     		left:0;
     		z-index:50;
     		width:100%;
     		height:100%;
     		background:rgba(0,0,0,0.4);
     	}
		.popupTitle{
			height: 100upx;
			background: #1a2843;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size:16px;
			font-weight: bold;
		}
		
     	.textarea-borer{
     		border: 2upx solid #DCDCDC;
     		height: 140upx;
     		width: 500upx;
     		border-radius: 6upx;
     		padding-right: 20upx;
     		background-color:#F7F7F7;
     		font-size: 14px;
     	}
     	
		.iconClose{
			position:absolute;
			top: 2upx;
			right: 2upx;
		}
		.input-wrap{
			
			
			border-radius: 10upx;
			margin: 0 30upx;
			height: 200upx;
			
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.input-class{
			width: 100%;
			height: 90upx;
			background-color:#1a2843;
		}
		.uni-list-cell {
			display: flex;
			
			justify-content: flex-start
		}
		.uni-list-cell-pd {
			padding: 22upx 30upx;
		}
		.uni-list {
			background-color: #FFFFFF;
			position: relative;
			width: 100%;
			display: flex;
			flex-direction: column;
		}
		.newPartCancel{
			background: #283651;
			color: #fe2c2c;
			width: 250upx;
			height: 80upx;
			font-size:14px;
			border-radius: 6upx;
			display: flex;
			justify-content: center;
			align-items: center
		}
	    .newPart{
			background: #283651;
			color: #34f073;
			width: 250upx;
			height: 80upx;
			font-size:14px;
			border-radius: 6upx;
			display: flex;
			justify-content: center;
			align-items: center
        }     
</style>
