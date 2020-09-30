<template>
	<view>
		<view style="margin: 30upx 30upx;">
			<view style="font-size: 14px;margin-top: 20upx;">{{i18n.payment.linkType}}</view>
			<view style="background: #121c31;font-size: 14px;height:80upx;margin-top: 20upx;" class="flex_c">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="flex_sb" style="padding: 0 20upx;width: 650upx;">
						<view>{{array[index]}}</view>
						<view>
							<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width: 30upx;"></image>
						</view>
					</view>
				    
				</picker>
				
			</view>
			
			
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.usdt" class="inputClass" type="text" :placeholder="i18n.payment.enterAddress"  placeholder-class="placeholderClass"/>
			</view>
			<view style="font-size: 14px;margin-top: 20upx;">
				{{i18n.registerBackup.paymentPassword}}
			</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.payPassword" class="inputClass" type="password" :placeholder="i18n.common.paymentPassword" placeholder-class="placeholderClass"/>
	
			</view>
			<view style="font-size: 15px;margin-top: 20upx;font-weight: bold;">
				{{i18n.payment.addCode}}
			</view>
            <view style="margin-top: 30upx;" @tap="uploadUSDT">
				<image src="/static/img_add.png" mode="aspectFit" style="height: 200upx;width:200upx;"></image>
				<image :src="form.qrCode" @tap.stop="showPicture(form.qrCode)" mode="aspectFit" style="height: 200upx;width:200upx; margin-left: 30upx;" v-if="form.qrCode !==''"></image>
			</view>
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">{{i18n.user.save}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	let _this
	export default {
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		data() {
			return {
				index: 0,
				array: ['ERC20','OMNI'],
				form:{
					usdt:'',
					usdtType:'',
					payPassword:'',	//支付密码
                    qrCode:''
				},
				ratio:'',
				pictures:''
			};
		},
		onLoad:function(){
			_this  = this
			uni.setNavigationBarTitle({
			    title:this.$i18nMsg().user.modify
			});
			this.fetch()
			
		},
		methods:{
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
								  _this.form.qrCode = JSON.parse(uploadFileRes.data).data.msg
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
				this.form.usdtType = this.array[this.index]
				const res = await this.$http.get('/user/bind_usdt',{data: this.form})
				uni.hideLoading()
				
				uni.showToast({
					title: '保存成功',
					icon: 'none',
					duration: 1000
				});
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					});
				}, 2000);

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
