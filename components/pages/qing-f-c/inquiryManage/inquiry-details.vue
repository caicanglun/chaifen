<template>
	<view>
		<view class="login_top" >
			<view class="backto" @tap="backto">返回</view>
			<veiw class="navTitle">询价单详情</veiw>
		</view>
		<view class="hand_box">
			<view class="wrap-box">
				<view class='box-row'>
					<view>
						询价单号: {{inquiry.inquiryNumber ||''}}
					</view>
					<view class="orderSummary" @tap="toOrderSummary">
						 订单总结
					</view>
					<view class="buttonStyle">
						{{inquiry.inquiryStatus ||''}}
					</view>
				</view>
				<view class="box-content">
				  <text class='title'>买帮办：</text><text>{{inquiry.buyDeputyRealName ||''}}</text>
				</view>
				<view class="box-content-buyer">
				  <view style="width: 110upx;"><text class='title'>买家：</text></view>
				  <view class="text-overflow-wrap"><text>{{inquiry.companyName||''}}</text></view>
				</view>
				<view class="box-contentSmall">
						<text>询价类型：</text><text>{{inquiry.inquiryTypeCode==1?'常规询价':'找样询价'}}</text>
				</view>
				<view class="box-contentBottom">
					<view class="created_time">
						<text>建立时间：</text><text>{{inquiry.createTime ||''}}</text>
					</view>
				   <view class='button'>
					   <view class='Clipboard' @tap="toCopyInquiry">复制</view>
					   
					   <view :class="(inquiry.inquiryStatusCode != 4&&inquiry.inquiryStatusCode !=9)?'Clipboard':'Clipboard_close'" @tap="tapClosing">关闭</view>
				   </view>

				</view>

			</view>
		</view>
		<!-- ------弹窗---- -->
		<popupMeUnmatch ref="unMatchRef" :propItems="items"  @input="getContent('unMatchRef',$event)" title="不匹配原因"></popupMeUnmatch>
		<popupMeUnmatch ref="closingRef" :propItems="closeItems" @input="getContent('closingRef',$event)" title="关闭原因"></popupMeUnmatch>
		<popupCopy ref="copyInquiry" @input="getContent('toCopyInquiry',$event)" title="提示"></popupCopy>
		<!-- ------弹窗---- -->
		<!-- 订单总结 -->
		<view class="details-box" style="padding: 20upx;">
			<view class="flex_c_c" style="font-size: 16px;font-weight: bold;">订单总结</view>
			<view class="flex_sb" style="margin-top: 20upx;">
				<view style="width: 50%;font-size: 14px;"><text style="color: #8C8C8C;">状态：</text>成交</view>
				<view style="width: 50%;font-size: 14px;"><text style="color: #8C8C8C;">原因：</text>报价价格优</view>
			</view>
		</view>
		<!-- 订单总结 -->
		<view class="details-box">
			<view class='wrap-box-1'>
				<view class="details-title">
					品名（别名）：{{inquiryInfo.tradeName||''}}
				</view>
				<view style="padding-left:24upx;">
					<chanpinyaosu :inquiryInfo="inquiryInfo"></chanpinyaosu>
				</view>
				
				<view class='recentPrice'>
					<navigator url="/pages/qing-f-c/inquiryManage/recentPrice/recentPrice">查看近期价格>></navigator>
				</view>
			</view>
			
		</view>  <!-- 详情 -->
		
		<view class='banner'>
			<view :class="(!isMatch?'btn':'unSelect')" @tap="swtichMatch(1)">
				直接报价<view><text class="fs_12">（{{directQuotion.length}}）</text></view>
			</view>
		    <view :class="(isMatch?'btn':'unSelect')" @tap="swtichMatch(2)">
		    	卖帮办报价<view><text class="fs_12">（{{quotationList.length}}）</text></view>
		    </view>
		</view>
		<view v-if="!isMatch">
			<view class='no_baojia' v-if="directQuotion.length == 0">
				暂无相关报价信息
			</view>
			<block v-for="(item,index) in directQuotion" :key="index">
				<view class="baojia-box">
					<baojiaListDirect :item="item" @handleEvent="handleEvent" :isDisplayButton="!(inquiry.inquiryStatusCode == 4 ||inquiry.inquiryStatusCode == 9)"></baojiaListDirect>
				</view>
			</block>
			<view class='placeholder-view'></view>
			
			<view class="fixed_bottom box_shadow_btn" v-if="inquiry.inquiryStatusCode != 4&&inquiry.inquiryStatusCode !=9">
			    
			    <button class="btn_all" @tap="submit" hover-class="none" >直接报价</button>
			  
			</view>
		</view>
		<view v-if="isMatch">
			<view class='no_baojia' v-if="quotationList.length == 0">
				暂无相关报价信息
			</view>
			<block v-for="(item,index) in quotationList" :key="index">
				<view class="baojia-box" @tap="toDetail(item.quotationNumber)">
					<baojiaList :item="item" @handleEvent="handleEvent" :isDisplayButton="!(inquiry.inquiryStatusCode == 4 ||inquiry.inquiryStatusCode == 9)"></baojiaList>
				</view>
			</block>
			<view class='placeholder-view'></view>
			
			<view class="fixed_bottom box_shadow_btn" v-if="inquiry.inquiryStatusCode ==2 ">
			  <button class="btn_all" hover-class="none" @tap="pushSellerQuote" v-if="quotationList.length ==0">推送卖帮办报价</button>

			</view>
			
			
			<view class="fixed_bottom box_shadow_btn" v-if="inquiry.inquiryStatusCode ==3 ">
			    <button class="btn_all" hover-class="none" @tap="bindCancel" >催单报价</button>

			</view>
		</view>

	</view>
</template>

<script>
	import popupMe from "@/components/popupMe.vue";
	import popupMeUnmatch from "@/components/popupMeUnmatch.vue"
	import uniIcon from "@/components/uni-icons/uni-icons.vue";
	import baojiaList from "@/components/inquiry/baojia-list-buy.vue";
	import baojiaListDirect from "@/components/inquiry/baojia-list-direct.vue";
	import chanpinyaosu from "@/components/sample-inquiry/chanpinyaosu-quote.vue";
	import popupCopy from "@/components/popupMe-copy.vue";
	let _this,_inquiryNumber
	export default {
		components:{
			popupMe,
			uniIcon,
			baojiaList,
			baojiaListDirect,
			chanpinyaosu,
			popupCopy,
			popupMeUnmatch
		},
		data(){
			return {
				items: [{
						id: '1',
						label: '品质问题'
					},
					{
						id: '2',
						label: '价格因素'
						
					},
					{
						id: '3',
						label: '货期原因'
					},
					{
						id: '4',
						label: '其他'
					},
					],
				closeItems: [{
						id: '1',
						label: '价格高'
					},
					{
						id: '2',
						label: '货期不符'
						
					},
					{
						id: '3',
						label: '品质不匹配'
					},
					{
						id: '4',
						label: '客户以丢单'
					},
					{
						id: '5',
						label: '录入错误'
					},
					{
						id: '6',
						label: '其他'
					},
					],	
				isMatch: true,
				unMatch: '',
				closing: '',
				inquiryInfo:'',
				inquiry:'',
				quotationList:[],
				directQuotion:[],
				isDoRefresh:false,
				quotationNumber:'',
				pageNum:1,
				pageSize:10
				
			};
		},
		
		onShow: function () {
		  let pages = getCurrentPages();
		  let currPage = pages[pages.length-1];
		  if (currPage.data.isDoRefresh == true){
		  	       currPage.data.isDoRefresh = false;
				   _this.getInquiryInfo(_inquiryNumber)
		  		   _this.getDeputyQuotation()
				   _this.getDirectQuotation()
		  	 }
		  _this.getInquiryInfo(_inquiryNumber)
		  _this.getDeputyQuotation()
		  _this.getDirectQuotation()
		},
		onLoad:function(options){
			_this = this
			_inquiryNumber = options.inquiryNumber
			this.getInquiryInfo(_inquiryNumber)
			this.getDeputyQuotation()
			_this.getDirectQuotation()
		},
		methods:{
			toOrderSummary:function(){
				uni.navigateTo({
					url: `/pages/qing-f-c/inquiryManage/orderSummary/orderSummary?inquiryNumber=${_inquiryNumber}`,
					
				});
				
			},
			
			getDirectQuotation:function(){
					let data={
						inquiryNumber:_inquiryNumber,  //		询价单号
					}
					let url = this.Api.directPriceList
					this.myRequest(data,url,'get').then(res => {
					  console.log(res);
					  if (res.data.status == 0){
						 _this.directQuotion = res.data.data.list
						  console.log('直接报价',_this.directQuotion)
					  }
					}).catch(err => {
					  wx.showToast({
					    title: err.data.errMsg,
					    icon: 'none'
					  });
					});
			},
			//询价单详情
			getInquiryInfo:function(inquiryNumber){
				let data={
					inquiryNumber: inquiryNumber
				}
				//let url = this.Api.deputyDetails
				let url = this.Api.zyDetails
				this.myRequest(data,url,'get').then(res => {
				  console.log(res);
				  _this.inquiryInfo = res.data.data.goInitialSample
				  _this.inquiry = res.data.data.inquiry
				  console.log(_this.inquiryInfo)
				}).catch(err => {
				  wx.showToast({
				    title: err.data.errMsg,
				    icon: 'none'
				  });
				});
			},
			//报价单列表
			getDeputyQuotation:function(){
				let data={
					inquiryNumber: _inquiryNumber,  //	询价单号
					pageNum: _this.pageNum,		 //	当前页数
					pageSize: _this.pageSize		//	每页记录数
				}
				let url = this.Api.buyerQuotation
				this.myRequest(data,url,'get').then(res => {
				  console.log("报价单列表",res);
				  _this.quotationList = res.data.data.list
				  console.log(_this.quotationList)
				}).catch(err => {
				  wx.showToast({
				    title: err.data.errMsg,
				    icon: 'none'
				  });
				});
			},
			//不匹配弹窗
			tapClosing:function(){
				if(_this.inquiryInfo.inquiryStatusCode != 4&&_this.inquiryInfo.inquiryStatusCode !=9){
					this.$refs.closingRef.show()
				}
				
			},
			tapUnmatch:function(){
				this.$refs.unMatchRef.show()
			},
			getContent:function(label,content){
				        console.log(content)
						switch (label){
							case 'unMatchRef':
								 this.unMatch = content
								 this.unMatchFunc()
								 console.log(this.unMatch)
								 break
							case 'closingRef':
								 this.closing = content
								 this.closingInquiry()
								 console.log(this.closing)
								 break
							case 'toCopyInquiry':
							    let data = JSON.stringify(_this.inquiryInfo)
								 uni.navigateTo({
								 	url: '/pages/qing-f-c/inquiryManage/inquiry-created-copy?data='+data+'&inquiryType=1',
								 	success: res => {},
								 	fail: () => {},
								 	complete: () => {}
								 });
								
								 break
						}
						
			},
			closingInquiry:function(params){
				let closingReason = _this.closeItems[_this.closing].label
				let data={
					inquiryNumber:_inquiryNumber,  //		询价单号
					buyDeputyRemarks: closingReason
				}
				let url = this.Api.buyDeputyClose
				this.myRequest(data,url,'get').then(res => {
				  console.log(res);
				  if (res.data.status == 0){
					  _this.getInquiryInfo(_inquiryNumber)
					  _this.getDeputyQuotation()
					  
				  }
				}).catch(err => {
				  wx.showToast({
				    title: err.data.errMsg,
				    icon: 'none'
				  });
				});
		    },
			toCopyInquiry:function(){
				// uni.showToast({
				// 	title: '待开发',
				// 	icon: 'none'
				// });
				this.$refs.copyInquiry.show()
			},
			toDetail:function(e){
				console.log(e)
				uni.navigateTo({
					url: '/pages/qing-f-c/inquiryManage/quotedPrice/quotedPrice?quoteNumber='+ e, 
					
				});
			},
			
			backto:function(){
					  uni.navigateBack({
						delta: 1
					  });
			},
			swtichMatch:function(e){
				this.isMatch = !this.isMatch
				
				
			},
			pushSellerQuote:function(){
				let data={
					 inquiryNumber:_this.inquiry.inquiryNumber
				}
				let url = this.Api.push
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				this.myRequest(data,url,'get').then(res => {
				  uni.hideLoading()
				  console.log(res);
				  if (res.data.status == 0){
					  uni.showToast({
					  	title: '已推送',
						duration:1000
					  });
				     _this.getInquiryInfo(_inquiryNumber)
					 _this.getDeputyQuotation()
				  }else{
					  uni.showToast({
					  	title: res.data.message,
						icon:'none'
					  });
					  return
				  }
				}).catch(err => {
				  wx.showToast({
				    title: err.data.errMsg,
				    icon: 'none'
				  });
				});
			},
			//买办关闭报价单
			closingQuote:function(params){
				let data={
					quotationNumber:_this.quotationNumber,  //		报价单号
					sellDeputyRemarks:_this.closing
				}
				let url = this.Api.buyDeputySuited
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				this.myRequest(data,url,'get').then(res => {
					uni.hideLoading()
				  console.log(res);
				  if (res.data.status == 0){
					  _this.getInquiryInfo(_inquiryNumber)
					  _this.getDeputyQuotation()
				  }
				}).catch(err => {
				  wx.showToast({
				    title: err.data.errMsg,
				    icon: 'none'
				  });
				});
			},
			//买办设置不匹配
			unMatchFunc:function(params){
				let unMatchLabel= _this.items[_this.unMatch].label
				let data={
					quotationNumber:_this.quotationNumber,  //		报价单号
					buyDeputyRemarks:unMatchLabel
				}
				let url = this.Api.buyDeputyUnsuited
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				this.myRequest(data,url,'get').then(res => {
				  uni.hideLoading()
				  console.log(res);
				  if (res.data.status == 0){
					  
					  _this.getInquiryInfo(_inquiryNumber)
					  _this.getDeputyQuotation()
				  }
				}).catch(err => {
				  wx.showToast({
				    title: err.data.errMsg,
				    icon: 'none'
				  });
				});
			},
			handleEvent:function(params){
				console.log(params[0])
				console.log(params[1])
				_this.quotationNumber = params[1]
				switch(params[0]){
					case 'sure':
					    let data ={
							quotationNumber: _this.quotationNumber
						}
						let url = this.Api.buyDeputySuited
						uni.showLoading({
							title: '提交中',
							mask: true
						});
						this.myRequest(data,url,'get').then(res => {
							uni.hideLoading()
						  console.log(res);
						  if (res.data.status == 0){
							  _this.getInquiryInfo(_inquiryNumber)
							  _this.getDeputyQuotation()
						  }
						}).catch(err => {
						  wx.showToast({
						    title: err.data.errMsg,
						    icon: 'none'
						  });
						});
					    break
					case 'unMatch':
					
					    this.tapUnmatch()
						
					    break
					case 'trade':
					    uni.showToast({
					    	title: '开发中',
							icon: 'none',
							duration: 1000
					    });
						// let _data ={
						// 	inquiryNumber: _inquiryNumber,
						// 	quotationNumber: _this.quotationNumber
						// }
						// let _url = this.Api.buyDeputyAddOrder
						// this.myRequest(_data,_url,'get').then(res => {
						//   console.log(res);
						//   if (res.data.status == 0){
						// 	  _this.getInquiryInfo(_inquiryNumber)
						// 	  _this.getDeputyQuotation()
						//   }
						// }).catch(err => {
						//   wx.showToast({
						//     title: err.data.errMsg,
						//     icon: 'none'
						//   });
						// });
						break
					case 'closing':
					    this.closing()
					    break
					    
					case 'setQuote':
					    
						uni.navigateTo({
							url: '/pages/qing-f-c/inquiryManage/setQuotePrice/setQuotePrice?quotationNumber=' + params[1],
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					    break
				}
			},
			submit:function(){
				uni.navigateTo({
					url: '/pages/qing-f-c/inquiryManage/directorQuotePrice?inquiryNumber='+ _inquiryNumber,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			bindCancel:function(){
				uni.showToast({
					title: '待开发',
					icon: 'none'
				});
			}
	}
	}
</script>

<style lang="scss">
	page{
		background-color: #f4f4f4;
	}
	.login_top{
	          height: 338upx;
	          width: 750upx;
	          box-sizing: border-box;
	          background-image:url('~@/static/images/qingfc/customer-back.png');
	          background-repeat:no-repeat;
	          background-position:center top;
	          background-size:cover;
	          text-align: center;
	        }
	.hand_box{
	  margin: -200upx 30upx 0 30upx;
	  border-radius: 6upx;
	  line-height: 1;
	  background-color: #fff;
	}
	.navTitle{
		color:#fff;
	    position:fixed;
		top:60upx;
		left:280upx;
		font-size:16px;
		z-index:99;
	}
	.wrap-box{
		padding-left: 24upx;
		padding-right: 20upx;
		font-size: 13px;
		display: flex;
		flex-direction: column;
		
	}
	.wrap-box-1{
		//padding-left: 24upx;
		padding-right: 20upx;
		font-size: 13px;
		display: flex;
		flex-direction: column;
		
	}
	.box-row{
		display:flex;
		justify-content: space-between;
		align-items: center;
		height: 72upx;
		width: 100%;
		border-bottom: 1upx solid #F3F3F3;
		.buttonStyle{
			color: #FF6000;
		}
		.state-unMatch{
			color: #333333;
		}
		.tax_button{
			display: flex;
			justify-content: center;
			align-items: center;
			color:#FF6000;
			width:124upx;
			height:44upx;
			background:rgba(255,96,0,0.12);
			border-radius:4upx;
			font-size: 12px;
		}
		.title{
			font-size:14px;
			font-weight: bold;
			.num{
				color: #FF6000;
			}
		}
	}
	.orderSummary{
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		width:137upx;
		height:48upx;
		background:rgba(255,96,0,1);
		border-radius:6upx;
	}
	.box-content{
		display: flex;
		align-items: center;
		width: 100%;
		font-size: 13px;
		height: 50upx;
		.title{
			color: #8D8D8D;
		}
	}
	.box-content-buyer{
		display: flex;
		// align-items: center;
		width: 100%;
		font-size: 13px;
		
		.title{
			color: #8D8D8D;
		}
	}
	.baojia-content{
		display: flex;
		align-items: center;
		width: 100%;
		font-size: 13px;
		height: 69upx;
		.title{
			color: #8D8D8D;
		}
	}
	.baojia-content-spec{
		display: flex;
		align-items: center;
		width: 100%;
		font-size: 12px;
		height: 69upx;
	}
	.box-contentSmall{
		display: flex;
		align-items: center;
		width: 100%;
		font-size: 11px;
		height: 50upx;
		color: #8D8D8D;
	}
	.box-contentBottom{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-size: 12px;
		height: 50upx;
		color: #8D8D8D;
		.button{
			width:180upx;
			display: flex;
			justify-content: space-between;
			height: 50upx;
		}
		.created_time{
			font-size: 11px;
		}
		
	}
	
	

	.baojia-bottom-spec{
		display: flex;
		justify-content: space-between;
		line-height: 65upx;
		width: 100%;
		font-size: 12px;
		height: 69upx;
		color: #8D8D8D;
		border-bottom: 1upx solid #f3f3f3;
		.baojia_time{
			font-size: 10px;
		}
	}
	
	.baojia-close{
		color: #999999!important;
	}
    .color_999{
		color: #999999!important;
	}
	
	.Clipboard{
		text-align: center;
		width: 80upx;
		height: 40upx;
		background-color: #FF6000;
		color: white;
		line-height: 40upx;
		border-radius: 20upx;
		
	}
	.Clipboard_close{
		text-align: center;
		width: 80upx;
		height: 40upx;
		background-color: #999999;
		color: white;
		line-height: 40upx;
		border-radius: 20upx;
		
	}
	.details-box{
		margin: 20upx 30upx 0 30upx;
		border-radius: 6upx;
		line-height: 1;
		background-color: #fff;
	   }
	 .baojia-box{
		margin: 20upx 30upx 0 30upx;
		border-radius: 6upx;
		line-height: 1;
		background-color: #fff; 
	 }
	.details-title{
		padding-left: 24upx;
		display:flex;
		align-items: center;
		height: 72upx;
		width: 100%;
		font-size: 14px;
		font-weight: bold;	
	}
	.details-content{
		display: flex;
		align-items: center;
		width: 100%;
		font-size: 13px;
		height: 56upx;
		.title{
			color: #999999;
		}	
	}
	.bingpai{
		display: flex;
		justify-content: space-between;
	}
	.banner{
		background-color: #FF6000;
		width:100%;
	    height: 88upx;
		margin-top: 30upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 14px;
		color: white;
		.unSelect{
			display:flex;
			justify-content: center;
			align-items: center;
			width: 250upx;
			height:60upx;
			
		}
		.btn{
			display:flex;
			justify-content: center;
			align-items: center;
			width: 250upx;
			height:60upx;
			background:rgba(255,255,255,0.2);
			border-radius:30upx;	
		}	
	}
	.fixed_bottom{
	  width: 100%;
	  position: fixed;
	  bottom: 0;
	  display: flex;
	  z-index: 999;
	}
	.btn_left{
	  width: 50%;
	  background-color: #fff;
	  color: #FF6000;
	  border-radius: 0;
	  font-size: 16px;
	  line-height: 88upx;
	}
	.btn_right{
	  width: 50%;
	  background-color: #FF6000;
	  color: #fff;
	  border-radius: 0;
	  font-size: 16px;
	  line-height: 88upx;
	}
	.btn_all{
		width: 100%;
		background-color: #FF6000;
		color: #fff;
		border-radius: 0;
		font-size: 16px;
		line-height: 88upx;
	}
	.recentPrice{
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FF6000;
		font-size: 13px;
		height: 56upx;
	}
	.no_baojia{
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #CCCCCC;
		height: 56upx;
		margin-top: 100upx;
	}
	.close_button{
		display: flex;
		justify-content: center;
		align-items: center;
		color:#999999;
		width:124upx;
		height:44upx;
		background: #f4f4f4;
		border-radius:4upx;
		font-size: 12px;
	}
// 弹窗样式
	.publishWrapper{
	    display: flex;  
	    flex-direction: column;
	    justify-content: space-between; 
		
	    input{  
	        border: 1px solid $uni-border-color;  
	        border-radius: 40upx;  
	        padding-left: 20upx;  
	        width: 70%;  
	    }
	}
	.iconClose{
		position:absolute;
		top: 2upx;
		right: 2upx;
	}
	.popTitle{
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.newPart{
		display: flex;
		font-size: 14px;
		
		width: 170upx;
		height: 60upx;
		justify-content: center;
		align-items: center;
		
		border: 1upx solid #FF6000;
		box-sizing: border-box;
		border-radius: 30upx;
		color: #fff;
		background-color: #FF6000;
		margin-left: 10upx;
	}
	.newPartCancel{
		display: flex;
		font-size: 14px;
		
		width: 170upx;
		height: 60upx;
		justify-content: center;
		align-items: center;
		
		border: 1upx solid #DCDCDC;
		box-sizing: border-box;
		border-radius: 30upx;
		color: black;
		background-color: #FFFFFF;
		margin-left: 10upx;
	}
	.textarea_border{
		border: 2upx solid #DCDCDC;
		height: 160upx;
		width: 450upx;
		border-radius: 6upx;
		padding-right: 20upx;
		background-color:#F7F7F7;
		font-size: 14px;
	}
	.textarea_holder{
		color: #b3b3b3b;
		font-size: 13px;
	}
	
</style>
