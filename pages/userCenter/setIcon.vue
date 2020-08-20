<template>
	<view>
		<view style="margin: 10upx 30upx;line-height: 50px;">
			<view class="flex_sb" style="align-items: center;border-bottom: 1upx solid #2a3855;" @tap="upload">
				<view>頭像</view>
				<view class="flex_c_c">
					<view v-if="userDetail.icon!==''" class="flex_c">
							<image :src="userDetail.icon" mode="aspectFit" style="width: 50upx;height: 50upx;"></image>
					</view>
					<view v-else class="flex_c">
						<image src="/static/pro/logo.png" mode="aspectFit" style="width: 50upx;height: 50upx;"></image>
					</view>
					<image src="/static/icon_next@2x.png" mode="aspectFit" style="height: 30upx;width:30upx;"></image>
				</view>
			</view>
			<view class="flex_sb" style="align-items: center;border-bottom: 1upx solid #2a3855;">
				<view>昵稱</view>
				<view class="flex_c_c"><input placeholder="請輸入昵稱" v-model="nickname" style="width: 150upx;"/></view>
			</view>
			<view class="flex_sb" style="align-items: center;border-bottom: 1upx solid #2a3855;">
				<view>賬戶名</view>
				<view class="flex_c_c"><input placeholder="請輸入賬戶名稱" v-model="userName" style="width: 150upx;"/></view>
				<!-- <view class="flex_c_c"><text style="padding-right: 10upx;">{{userDetail.userName}}</text></view> -->
			</view>
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">保存</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	let _this
	export default {
		data() {
			return {
				userDetail: '',
				nickname: '',
				userName:''
			};
		},
		onLoad:function(){
			_this = this
			this.fetch()
		},	
		methods:{
			async fetch(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
				this.nickname = this.userDetail.nickname
				this.userName = this.userDetail.userName
			},
				
			upload:function(){
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
								  uni.showToast({
									title: '上传成功',
									icon:'none',
									duration: 1000
								  });
								  let data ={
									  icon: _this.pictures
								  }
								  const res = await this.$http.get('/user/update_icon',{data: data})
								  console.log(res)
							  }
						 });
					}
									 
									  
				})        
			},
			async submit(){
				let data ={
					nickname: this.nickname,
					userName: this.userName
				}
				const res = await this.$http.get('/user/update_nickname',{data: data})
				console.log(res)
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
			toBindPhone:function(){
				uni.showToast({
					title: '待开放',
					icon: 'none',
					duration: 1000
				});
			},
			toModiPayPass:function(){
				uni.navigateTo({
					url: './modiPayPass'
				})	
			},
			toModiLoginPass:function(){
				uni.navigateTo({
					url: './modifyLoginPass',
					
				});
			},
			toMailBind:function(){
				if (this.userDetail.mail ==''){
					uni.navigateTo({
						url: './bindEmail',
						
					});
				}
				
			}
		}
	}
</script>

<style lang="scss">
page{background:#091224;width: 750upx;overflow-x: hidden;color: #FFFFFF;font-size: 14px;}
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
