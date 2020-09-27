<template>
	<view>
		<!-- 弹出层 -->
		<view  class="uni-banner"  v-if="bannerShow">
			
			<view class="popupTitle" @tap="closeBanner">
				<text>{{title}}</text>
				
			</view>
		
			<!-- <view class="flex_c_c">
				<textarea v-model="content" placeholder="请输入" placeholder-style="color: #b3b3b3;font-size: 13px;" class="textarea-borer"></textarea>
			</view> -->
			<view class="input-wrap">
				<input v-model="content" type="password" style="text-align: center;" :placeholder="placeholder" placeholder-style="text-align: center;color: #b3b3b3;font-size: 13px;" class="input-class"/>
			</view>
			<view class="flex_sb" style="margin: 0 30upx 20upx 30upx;">
				 <view class="newPartCancel" @tap="closeBanner">{{i18n.common.cancel}}</view>
				 <view class="newPart" @tap="confirmBanner">{{i18n.common.confirm}}</view>
			</view>
			

		</view>
		
		<!-- 做黑色阴影颜色 -->
		<view class="uni-mask" v-if="bannerShow"></view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icons/uni-icons.vue";
	export default {
		components:{
			uniIcon
		},
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		props:{
			title:{
				type: String,
				default: '请输入'
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
			confirmBanner:function(){
				if (this.content !==''){
					this.$emit('input',this.content)
				}
				
				this.bannerShow = false
			}
		}
		
	}
</script>

<style lang="scss">
     /* 弹出层形式的广告 */
     	.uni-banner {
     		width: 80%;
     		position: fixed;
     		left: 10%;
     		top: 30vh;
     		z-index: 99;
     		border-radius: 20upx;
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
