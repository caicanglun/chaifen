<template>
	<view>
		<view style="margin: 30upx 30upx;">
			<view class="flex_sb" style="font-size: 14px;margin-top: 20upx;">
				<view>錢包地址：</view>
				<view>鏈類型：ERC20</view>
			</view>
			<view style="background: #121c31;font-size: 14px;height:80upx;margin-top: 20upx;" class="flex_c">
				
				<view class="flex_sb" style="padding: 0 20upx;width: 650upx;">
					<view>{{receiving_address}}</view>
					<view class="img_back" @tap="pasterNode">
						<image src="/static/pro/copy.png" mode="aspectFit" style="height: 40upx;width:40upx;"></image>
					</view>
				</view>

			</view>
			
			<!-- <view class="flex_c_c" style="height: 250upx;width: 250upx;background: white;">
				<image :src="img" mode="aspectFit" style="height: 210upx;width:210upx;"></image>
			</view> -->
			<view style="font-size: 14px;margin-top: 20upx;">兌換USDF</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.money" class="inputClass" type="number" @blur="quzheng" placeholder="請輸入兌換充值數量"  placeholder-class="placeholderClass"/>
			</view>
			<view style="font-size: 14px;margin-top: 20upx;">需充值USDT數量：<text style="color: #34f073">{{amounter}}</text></view>
			<view style="font-size: 14px;margin-top: 20upx;">
				支付密碼
			</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.payPassword" class="inputClass" type="password" placeholder="請輸入支付密碼" placeholder-class="placeholderClass"/>
	
			</view>
			<view style="font-size: 14px;margin-top: 20upx;">
				备注
			</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.remark" class="inputClass" type="text" placeholder="請填写备注信息" placeholder-class="placeholderClass"/>
				
			</view>
			<view style="font-size: 15px;margin-top: 20upx;font-weight: bold;">
				上傳憑證
			</view>
            <view style="margin-top: 30upx;" @tap="uploadUSDT">
				<image src="/static/img_add.png" mode="aspectFit" style="height: 200upx;width:200upx;"></image>
				<image :src="form.provePicture" @tap.stop="showPicture(form.provePicture)" mode="aspectFit" style="height: 200upx;width:200upx; margin-left: 30upx;" v-if="form.provePicture !==''"></image>
			</view>
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">保存</view>
			</view>
		</view>
		<view style="position: fixed;bottom:10px;color: #818b9e;font-size: 13px;margin-top:30upx;padding: 30upx;">
			請按照匯率換算準確充值，否則將無法審核通過，有誤請聯系客服。
			請勿向上述地址充值任何非ERC20_USDT幣種，否則資產將不可找回。 最小充值金額100，小於最小金額的充值將無法入賬，且無法退回
		</view>
	</view>
</template>

<script>
	import QR from "@/common/wxqrcode.js";
	let _this
	export default {
		data() {
			return {
				img:'',
				receiving_address:'',
				form:{
					money:'',   //			金额
					payPassword:'',	//	支付密码
					provePicture:'' ,//	凭证图片地址（非必填）
					remark:''
				},
				pictures:'',
				unitPrice:'',
				amounter:''
			};
		},
		onNavigationBarButtonTap:function(val){
			 
			this.tapSettingButton() 
		    
		},
		
		onLoad:function(){
			_this  = this
			this.fetchAddr()
			// this.fetch()
			this.fetchUnitPrice()
			
		},
		methods:{
			quzheng:function(){
				this.form.money = parseInt(this.form.money/100)*100
				this.amounter = (this.form.money * this.unitPrice).toFixed(6)
			},
			// inputConfirm:function(){
			// 	console.log('sfwef')
			// 	if (form.money !==''){
			// 		this.amounter = this.form.money * this.unitPrice 
			// 	}
				
			// },
			async fetchUnitPrice(){
				const res = await this.$http.get('/udeal/unit_price')
				this.unitPrice = res.data.data.usdt
				console.log(this.unitPrice)
				
			},
			tapSettingButton:function(){
				uni.navigateTo({
					url: './chargeList'
				
				});
			},
			// showQrCode:function(){
			// 	this.img = QR.createQrCodeImg(this.receiving_address, {
			// 	     size: parseInt(300)//二维码大小  
			// 	})
			// 	this.showPicture(this.img)
			// },
			pasterNode:function(){
				uni.setClipboardData({
					data: this.receiving_address
				})
			},
			async fetchAddr(){
				const res = await this.$http.get('/topup/receiving_address')
				this.receiving_address = res.data.data.msg
				// this.img = QR.createQrCodeImg(this.receiving_address, {
				//      size: parseInt(300)//二维码大小  
				// })
				// console.log(this.img)
				console.log(res)
			},
			async fetch(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				
				this.form.qrCode = res.data.data.qrCode
				this.form.usdt = res.data.data.usdtAddress
				this.form.usdtType = res.data.data.usdtType
				this.array.forEach((item,index)=>{
					if (item == this.form.usdtType){
						this.index = index
					}
				})
				
			},
			showPicture:function(src){
				uni.previewImage({
					urls: [src],
					success:function(){
						console.log('正在预览中')
					}
					
				})
			},
			uploadUSDT:function(){
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        _this.pictures = ''
								 
						  uni.uploadFile({
							  url: 'http://test.144f.com:8080/sl-web'+'/basicdata/upload', 
							  filePath: tempFilePaths[0],
							  name:'file',
							  success: async (uploadFileRes) => {
								  console.log(uploadFileRes);	
								  _this.pictures=JSON.parse(uploadFileRes.data).data.msg
								  _this.form.provePicture = JSON.parse(uploadFileRes.data).data.msg
								  uni.showToast({
									title: '上传成功',
									icon:'none',
									duration: 1000
								  });
								  // let data ={
									 //  icon: _this.pictures
								  // }
								  // const res = await this.$http.get('/user/update_icon',{data: data})
								  // console.log(res)
							  }
						 });
					}
									 
									  
				})        
			},
			bindPickerChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.target.value)
			    this.index = e.target.value
			},
			
			async submit(){
				if (this.form.money < 100){
					uni.showToast({
						title: '最小充值数量100'
					});
				}
				uni.showLoading({
					title:'提交中',
					mask: true
				})
				const res = await this.$http.get('topup/apply_add',{data: this.form})
				uni.hideLoading()
				
				uni.showToast({
					title: '保存成功',
					icon: 'none',
					duration: 1000
				});
				this.form.payPassword = ''
				this.form.money = ''
				this.form.provePicture = ''
			},
			
		}
	}
</script>

<style lang="scss">
  page{
	  background: #091224;
	  color: white;
  }
  .tip{
  	  color: #7d889a;
  	  font-size: 13px;
  }
  .inputClass{
	  background: #121c31;
	  height: 90upx;
	  border-radius: 8upx;
	  padding-left: 20upx;
	  font-size: 14px;
	  color: #FFFFFF;
	  width: 70%;
  }
  .placeholderClass{
	  color: #7d889a;
	  font-size: 14px;
  }
  .inClass{
  	  color: #34f073;
  	  font-size: 16px;
  	  font-weight: bold;
  	  display: flex;
  	  width: 300upx;
  	  height: 90upx;
  	  border-radius: 8upx;
  	  background: #2a3650;
  	  justify-content: center;
  	  align-items: center;
  }
  
</style>
