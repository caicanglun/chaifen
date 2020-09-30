<template>
	<view>
		<view style="margin: 10upx 30upx;">
			<view style="background: #121c31;font-size: 14px;height:80upx;align-items: center;" class="flex_sb">
				<view>
					<text style="padding-left: 10upx;">{{index==-1?i18n.user.paymentCode:array[index]}}</text>
				</view>
				<view style="padding-rigth: 10upx;">
					<picker @change="bindPickerChange" :value="index" :range="array">
					     <view class="uni-input">{{index==-1?i18n.walletRecharge.selectCode:array[index]}}</view>
					</picker>
				</view>
			</view>
			<view style="background: #121c31;font-size: 14px;height:80upx;margin-top: 30upx;" class="flex_c" v-if="index<1">
				<text style="padding-left: 10upx;">USDF</text>
				
			</view>
			<view class="wrap" style="margin-top:20upx;padding-bottom: 50upx;" v-if="!(userDetail.isMain==0&&index==1)">
				<!-- <view class="flex_c_c">
					<image src="/static/generate11.png" mode="aspectFit" style="width: 250upx;width: 250upx;margin-top: -50upx;"></image>
				</view> -->
				<view class="flex_c_c" style="padding-top: 30upx;">
					 <view class="flex_c_c" style="height: 250upx;width: 250upx;background: white;">
					 	<image :src="img" mode="aspectFit" style="height: 210upx;width:210upx;"></image>
					 </view>
				</view>
				<view class="flex_c_c" style="margin-top: 40upx;">
					<view class="btn_class" @tap="capture">{{i18n.walletRecharge.saveImg}}</view>
				</view>
				<view class="flex_c_c" style="font-size: 14px;margin-top: 30upx;" v-if="index==0">{{i18n.walletWithdraw.withdrawAddress}}</view>
				<view class="flex_c_c" style="font-size: 14px;margin-top: 20upx;">{{content}}</view>
				<view class="flex_c_c" style="margin-top: 20upx;">
					<view class="img_back" @tap="pasterNode">
						<image src="/static/pro/copy.png" mode="aspectFit" style="height: 40upx;width:40upx;"></image>
					</view>
				</view>
				
				
				
			</view>
		</view>
		
		
	    <view style="position: fixed;bottom:10px;color: #818b9e;font-size: 13px;margin-top:30upx;padding: 30upx;" v-if="index==0">
			<!-- 請勿向上述地址充值任何非該幣種資產，否則資產將不可找回。 最小充值金額--，小於最小金額的充值將無法入賬，且無法退回 -->
			{{i18n.walletRecharge.tip1}}{{i18n.walletRecharge.tip2}}
		</view>
	</view>
</template>

<script>
	import QR from "@/common/wxqrcode.js";
	export default {
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		data() {
			return {
				userCode:'',
				creditToken:'',
				img:'',
				content: '',
				userDetail:'',
				index: -1,
				array: ['收款碼','授信令牌', '節點碼'],
			};
		},
		onLoad:function(options){
			if (options.type==2){
				this.index = 0
			}
			if (options.type==1){
				this.index = 2
			}
			this.userDetail = JSON.parse(options.userDetail) 
			this.content = this.userDetail.userCode
			this.img = QR.createQrCodeImg(this.content, {  
			     size: parseInt(300)//二维码大小  
			})
		},
		methods:{
			bindPickerChange: function(e) {
			    
			    this.index = e.target.value
				console.log(this.index)
				if (this.index == 0){
					this.content = this.userDetail.userCode
				}else if (this.index ==1){
					this.content = this.userDetail.creditToken
				}else if (this.index == 2){
					this.content = this.userDetail.userCode
				}
				this.img = QR.createQrCodeImg(this.content, {
				     size: parseInt(300)//二维码大小  
				})
				uni.setNavigationBarTitle({
				    title: this.array[this.index]
				});

			},
			pasterLink:function(){
				uni.setClipboardData({
					data: 'http://web.etfspro.com/#/'
				})
			},
			pasterShouxin:function(){
				uni.setClipboardData({
					data: this.creditToken
				})
			},
			pasterNode:function(){
				uni.setClipboardData({
					data: this.content
				})
			},
			
			backTo:function(){
				uni.navigateBack({
					delta: -1
				});
				
			},
			share() {
			  // 分享图文到微信聊天界面
			  uni.share({
			      provider: "weixin",
			      scene: "WXSceneSession",
			      type: 1,
			      summary: "歡迎來到ETF！",
			      success: function (res) {
			          console.log("success:" + JSON.stringify(res));
			      },
			      fail: function (err) {
			          console.log("fail:" + JSON.stringify(err));
			      }
			  });
			},
			share11(){
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];  
				console.log("当前页"+pages.length-1);
				var bitmap=null;  
				var currentWebview = page.$getAppWebview();
				bitmap = new plus.nativeObj.Bitmap('amway_img');  
				// 将webview内容绘制到Bitmap对象中  
				currentWebview.draw(bitmap,function(){  
				    console.log('截屏绘制图片成功');  
				    bitmap.save( "_doc/a.jpg"  
				    ,{}  
				    ,function(i){  
				        console.log('保存图片成功：'+JSON.stringify(i));  
				        uni.shareWithSystem({
				          summary: '',
				          href: 'https://uniapp.dcloud.io',
				          imageUrl: i.target,		 
				          success(){
				            // 分享完成，请注意此时不一定是成功分享
				          },
				          fail(){
				            // 分享失败
				          }
				        })	
				    }  
					,function(e){  
						console.log('保存图片失败：'+JSON.stringify(e));  
							});  
						},function(e){  
							console.log('截屏绘制图片失败：'+JSON.stringify(e));  
						});  
						//currentWebview.append(amway_bit);    
			   
			},
			capture() {  
			                var pages = getCurrentPages();  
			                var page = pages[pages.length - 1];  
							console.log("当前页"+pages.length-1);
			                var bitmap=null;  
			                var currentWebview = page.$getAppWebview();
			                bitmap = new plus.nativeObj.Bitmap('amway_img');  
			                // 将webview内容绘制到Bitmap对象中  
			                currentWebview.draw(bitmap,function(){  
			                    console.log('截屏绘制图片成功');  
			                    bitmap.save( "_doc/a.jpg"  
			                    ,{}  
			                    ,function(i){  
			                        console.log('保存图片成功：'+JSON.stringify(i));  
			                        uni.saveImageToPhotosAlbum({  
			                            filePath: i.target,  
			                            success: function () {  
			                                bitmap.clear(); //销毁Bitmap图片  
			                                uni.showToast({  
			                                    title: '保存成功',  
			                                    mask: false,  
			                                    duration: 1500  
			                                });  
			                            }  
			                        });  
			                    }  
								,function(e){  
									console.log('保存图片失败：'+JSON.stringify(e));  
										});  
									},function(e){  
										console.log('截屏绘制图片失败：'+JSON.stringify(e));  
									});  
									//currentWebview.append(amway_bit);    
			}  
								          
			
		}
		
	}
</script>

<style lang="scss">
   page{
	  background: #091224;
	  color: white;
   }
   .title{
	   color: white;
	   font-size: 16px;
	   font-weight: bold;
	   
	  
   }
   .iconClass{
	  width: 45upx;
	  height: 45upx;
	  padding-left: 20upx;
   }
   .fuli{
	   width: 500upx;
	   height: 400upx;
   }
   .wrap{
	 background: #121c31; 
	 // margin: 0upx 30upx;
	 // height: 700upx;
   }
   .img_back{
	   display: flex;
	   align-items: center;
	   justify-content: center;
	   height: 80upx;
	   width: 80upx;
	   border-radius: 50%;
	   background: #293452;
   }
</style>
