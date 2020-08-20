<template>
	<view>
		<!-- 弹出层 -->
		<view  class="uni-banner" style="font-size: 14px;line-height: 50px;" v-if="bannerShow">
			<view>
				<view class="flex_c" style="font-size: 16px;font-weight: bold;background: #1a2843;height: 90upx;padding-left: 30upx;">安全驗證</view>
				<view class="flex" style="margin-top: 20upx;">
					<view class="flex_c_c" :class="[dataIndex==1?'buySellActive':'buySell']" data-index='1' @tap="selectLabel">手機號</view>
					<view class="flex_c_c" :class="[dataIndex==2?'buySellActive':'buySell']" data-index='2' @tap="selectLabel">郵箱</view>
				</view>
				<view v-if="dataIndex==1" style="padding-left: 30upx;">
					{{phone | showStar}}
				</view>
				<view v-else style="padding-left: 30upx;">
					{{email | showStar}}
				</view>
				<view style="margin-top: 20upx;padding:0 30upx;background: #1b2944;margin-left:30upx;margin-right: 30upx;" class="flex_sb" v-if="dataIndex==1" >
					<input v-model="form.vCode" class="inputClass" type="text" placeholder="請輸入手機驗證碼" placeholder-class="placeholderClass"/>
					<view class="flex_c" style="justify-content: flex-end;width: 30%;padding: 0 20upx;">
						
						<view style="font-size:14px;color: #34F073;" v-show="showBotton" @tap="sendVcode">發送驗證碼</view>
						<view style="font-size:14px;color: #FFFFFF;" v-show="!showBotton" >{{count}} s</view>
					</view>
				</view>
				<view style="margin-top: 20upx;padding:0 30upx;background: #1b2944;margin-left:30upx;margin-right: 30upx;" class="flex_sb" v-else>
					<input v-model="form.vCode" class="inputClass" type="text" placeholder="請輸入郵箱驗證碼" placeholder-class="placeholderClass"/>
					<view class="flex_c" style="justify-content: flex-end;width: 30%;padding: 0 20upx;">
						
						<view style="font-size:14px;color: #34F073;" v-show="showBotton" @tap="sendVcode">發送驗證碼</view>
						<view style="font-size:14px;color: #FFFFFF;" v-show="!showBotton" >{{count}} s</view>
					</view>
				</view>
				<view  class="flex_c_c" style="margin-top: 40upx;">
					<view class="inClass" @tap="submit">確定</view>
				</view>
			</view>
		</view>
		
		<!-- 做黑色阴影颜色 -->
		<view class="uni-mask" v-if="bannerShow" @tap="closeBanner"></view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icons/uni-icons.vue";
	export default {
		components:{
			uniIcon
		},
		filters:{
			showStar:function(value){
				
				return value.substr(0,3)+'****'+value.substr(-3)
			}
		},
		props:{
			title:{
				type: String,
				default: '请输入'
			},
			phone:{
				type: String,
				default: ''
			},
			email:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				form:{
					phone: '',
					vCode:''	
				},
				emailCode:'',
				
				bannerShow:false,
				content: '',
				dataIndex: 1,
				showBotton: true,
				count: '',
				timer: null,
			};
		},
		mounted:function(){
			this.form.phone = this.phone
		},
		methods:{
			getCode(){
				console.log('sfwfwef')
				 const TIME_COUNT = 120;
				 if (!this.timer) {
					 this.count = TIME_COUNT;
					 this.showBotton = false;
					 this.timer = setInterval(() => {
				          if (this.count > 0 && this.count <= TIME_COUNT) {
				              this.count--;
				           } else {
							  this.showBotton = true;
							  clearInterval(this.timer);
							  this.timer = null;
					       }
				    }, 1000)
				 }
			},
			async sendVcode(type){
				
				if (this.dataIndex==1){
					if (this.phone == ''){
						uni.showToast({
							title: '請先綁定手機號碼',
							icon: 'none',
							duration: 1000
						});
						return
					}
					this.getCode()
					let data ={
						phone: this.phone
					}
					const res  = await this.$http.get('/user/phone_veri',{data: data})
					uni.showToast({
						title: '發送成功',
						duration:  1000
					});
				}else if(this.dataIndex==2){
					if (this.email == ''){
						uni.showToast({
							title: '請先綁定郵箱號碼',
							icon: 'none',
							duration: 1000
						});
						return
					}
					this.getCode()
					let data ={
						mail: this.email,
						type: 2
					}
					const res  = await this.$http.get('/user/mail_vcode',{data: data})
					uni.showToast({
						title: '發送成功',
						duration:  1000
					});
				}
				
				
			},
			async submit(){
				if (this.dataIndex == 1){
					let data ={
						phone: this.phone,
						vCode: this.form.vCode
					}
					console.log(data)
					const res = await this.$http.get('/user/bind_phone',{data:data})
					this.$emit('input')
					this.bannerShow = false
				}else if (this.dataIndex == 2){
					let data ={
						mail: this.email,
						vCode: this.form.vCode
					}
					console.log(data)
					const res = await this.$http.get('/user/check_vcode',{data:data})
					console.log(res)
					this.$emit('input')
					this.bannerShow = false
				}
				
				
			},
			selectLabel:function(e){
				this.dataIndex = e.target.dataset.index
				if (this.dataIndex == 2){

				}
				if (this.dataIndex == 1){
					
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
     		width: 750upx;
			height: 600upx;
     		position: fixed;
     		bottom: 0;
     		z-index: 99;
     		
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
		  .buySellActive{background: #1b2944;color: #FFFFFF;width:50%;height: 100upx;font-size: 15px;}
		  .buySell{background: #121c31;color: #3d4663;width:50%;height: 100upx;font-size: 15px;}
		 .inputClass{
		 	  background: #1b2944;
		 	  height: 90upx;
		 	  border-radius: 8upx;
		 	  padding-left: 20upx;
		 	  font-size: 14px;
		 	  color: #FFFFFF;
		 	  width: 70%;
		 }
		 .inClass{
		 	  color: #34f073;
		 	  font-size: 16px;
		 	  font-weight: bold;
		 	  display: flex;
		 	  width: 250upx;
		 	  height: 70upx;
		 	  border-radius: 8upx;
		 	  background: #2a3650;
		 	  justify-content: center;
		 	  align-items: center;
		 }
</style>
