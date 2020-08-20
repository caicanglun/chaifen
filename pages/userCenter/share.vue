<template>
	<view>
		<view class="flex_sb" style="margin-top:100upx;">
			<view class="flex_c" @tap="backTo">
				<image src="/static/icon_back@2x.png" mode="aspectFit" class="iconClass"></image>
			</view>
			<view class="flex_c_c title" >邀請好友
			
			</view>
			<view style="width:20upx;"></view>
		</view>
		<view class="flex_c_c" style="margin-top: 60upx;">
			<image src="/static/newFont.png" mode="aspectFit" class="fuli"></image>
		</view>
		<view class="wrap" style="margin-top: -30upx;">
			<!-- <view class="flex_c_c">
				<image src="/static/generate11.png" mode="aspectFit" style="width: 250upx;width: 250upx;margin-top: -50upx;"></image>
			</view> -->
			<view class="flex_c_c" style="padding-top: 30upx;">
				 <view class="flex_c_c" style="height: 250upx;width: 250upx;background: white;">
				 	<image :src="img" mode="aspectFit" style="height: 210upx;width:210upx;"></image>
				 </view>
			</view>
			
			<view class="flex_sa" style="margin-top: 30upx;">
				<view style="height: 200upx;" v-if="userCode">
					<view class="flex_c" style="color: #9caccd;font-size: 15px;">節點碼</view>
					<view class="flex_c" style="padding-top: 20upx;color: white;font-size: 16px;font-weight: bold;">{{userCode}}</view>
					
				</view>
				<view style="height: 200upx;" v-if="creditToken">
					<view class="flex_c" style="color: #9caccd;font-size: 15px;">授信令牌</view>
					<view class="flex_c" style="padding-top: 20upx;color: white;font-size: 16px;font-weight: bold;">{{creditToken}}</view>
					
				</view>
				<view style="height: 200upx;width: 33%;">
					<view class="flex_c" style="color: #9caccd;font-size: 15px;">專屬分享鏈接</view>
					<view class="flex_c" style="box-sizing: border-box;word-break: break-word ;padding-top: 20upx;color: white;font-size: 16px;font-weight: bold;">{{link}}</view>
					
				</view>
			</view>
			<view class="flex_sa" style="padding-bottom: 30upx;">
				<view class="img_back" @tap="pasterNode" v-if="userCode"><image src="/static/pro/copy.png" mode="aspectFit" style="height: 40upx;width:40upx;"></image></view>
				<view class="img_back" @tap="pasterShouxin" v-if="creditToken"><image src="/static/pro/copy.png" mode="aspectFit" style="height: 40upx;width:40upx;"></image></view>
				<view class="img_back" @tap="pasterLink"><image src="/static/pro/copy.png" mode="aspectFit" style="height: 40upx;width:40upx;"></image></view>
			</view>
		</view>
		<view class="flex_sa" style="margin-top: 30upx;">
			<view class="btn_class" @tap="capture">保存二維碼</view>
			<view class="btn_class" style="color: #ff0000" @tap="share11">邀請好友</view>
		</view>
		<!-- <view class="flex_c_c" style="height: 240upx;width: 240upx;background: white;">
			<image :src="img" mode="aspectFit" style="height: 200upx;width:200upx;"></image>
		</view> -->
	</view>
</template>

<script>
	import QR from "@/common/wxqrcode.js";
	export default {
		data() {
			return {
				userCode:'',
				creditToken:'',
				img:'',
				link:'http://web.ecfpros.com/#/'
			};
		},
		onLoad:function(options){
			this.userCode = options.userCode
			this.creditToken = options.creditToken
			this.img = QR.createQrCodeImg(this.link, {  
			     size: parseInt(300)//二维码大小  
			})
		},
		methods:{
			pasterLink:function(){
				uni.setClipboardData({
					data: this.link
				})
			},
			pasterShouxin:function(){
				uni.setClipboardData({
					data: this.creditToken
				})
			},
			pasterNode:function(){
				uni.setClipboardData({
					data: this.userCode
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
			      summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
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
	   background: url(../../static/share-bg1.jpeg);
	   background-size: 100% 100%;
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
	 background:rgba($color: #000000, $alpha: 0.5); 
	 margin: 0upx 30upx;
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
