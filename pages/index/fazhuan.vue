<template>
	<view>
		<view class="flex_sa" style="margin: 10upx 30upx;height: 300upx;background: #121c31;border-radius: 8upx;">
			<view class="flex_c" style="flex-direction: column;">
				<view style="padding-top:100upx;color: #7d889a;font-size: 12px;">從</view>
				<view style="padding-top:10upx;font-size: 15px;font-weight: bold;" class="flex_c">資金賬戶</view>
			</view>
			<view class="flex_c">
				<image src="/static/icon_Transfer@2x.png" mode="aspectFit" style="height: 80upx;width: 80upx;"></image>
			</view>
			<view class="flex_c" style="flex-direction: column;">
				<view style="padding-top:100upx;color: #7d889a;font-size: 12px;">劃轉到</view>
				<view style="padding-top:10upx;font-size: 15px;font-weight: bold;" class="flex_c">資產賬戶</view>
			</view>
		</view>
		<view style="margin: 30upx 30upx;">
			<view style="background: #121c31;font-size: 14px;height:80upx;" class="flex_c">
				<text style="padding-left: 10upx;">USDF</text>
			</view>
			
			<view style="font-size: 14px;margin-top: 20upx;">劃轉數量</view>
			<view style="margin-top: 20upx;background: #121c31;" class="flex_sb">
				<input v-model="form.usde" class="inputClass" type="text" placeholder="請輸入劃轉數量" placeholder-class="placeholderClass"/>
				<view class="flex_c" style="justify-content: flex-end;width: 30%;padding: 0 20upx;">
					
					<view style="font-size:14px;color: #34F073;" @tap="allin">全部</view>
				</view>
			</view>
			
			<view style="font-size: 11px;color: #7d889a;line-height: 20px;margin-top: 20upx;">
				<view>可用： <text style="color:#34F073;">{{userDetail.usde}}</text><text style="padding-left: 10upx;color:#34F073;">USDF</text></view>
			</view>
			
			<view  class="flex_c_c" style="margin-top: 60upx;">
				<view class="inClass" @tap="submit">轉出</view>
			</view>
			<view class="flex_c" style="flex-direction: column;font-size: 12px;color: #7d889a;line-height: 20px;margin-top: 20upx;">
				<view>只能將資產劃轉到對應賬戶才可以進行</view>
				<view>交易，賬戶間劃轉不收取手續費</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					usde: ''
				},
				userDetail:''
			};
		},
		onLoad:function(){
			this.fetchUserDetail()
		},
		methods:{
			allin:function(){
				this.form.usde = this.userDetail.usde
			},
			async fetchUserDetail(){
				const res  = await this.$http.get('/user/details')
				console.log(res)
				this.userDetail = res.data.data
				
			},
			async submit(){
				if (this.form.usde <0) { 
					uni.showToast({
						title: '數量不能少於零',
						icon: 'none'
					});
					return
				}
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				const res = await this.$http.get('/deal/usde_signin',{data: this.form})
				uni.hideLoading()
				console.log(res)
				uni.showToast({
					title: '劃轉成功',
					icon: 'none',
					duration: 1000
				});
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					});
				}, 1500);
				
				 
			},
			scanCodeToken:function(){
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				});
			},
			scanCodeNode: function(){
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				});
			}
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
