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
						询价单号: {{topList.inquiry.inquiryNumber ||''}}
					</view>
					<view class="buttonStyle">
						 复制
					</view>
					<view class="buttonStyle">
						{{topList.inquiry.inquiryStatusName ||''}}
					</view>
				</view>
				<view class="box-content">
				  <text class='title'>买帮办：</text><text>{{topList.inquiry.buyDeputyRealName ||''}}</text>
				</view>
				<view class="box-content flex_sb">
				  <veiw>
					  <text class='title'>买家：</text><text>{{topList.inquiry.companyName||''}}</text>
				  </veiw>
				  <image src="/static/images/printer.png" class="i-print" mode="aspectFit" ></image>
				</view>
				<view class="box-contentSmall">
						<text>询价类型：</text><text>找样询价</text>
				</view>
				<view class="box-contentBottom">
					<view class="created_time">
						<text>建立时间：</text><text>{{topList.inquiry.createTime ||''}}</text>
					</view>
				 <!--  <view :class="(isHasPush?'button':'')">
					   <view class='Clipboard' v-if="isHasPush">复制</view>
					   
					   
					   <view class="Clipboard" @tap="tapClosing">关闭</view> 
				   </view>
		 -->
				</view>
		
			</view>
		</view>
		<!-- ------弹窗---- -->
		<popupMe ref="unMatchRef" @input="getContent('unMatchRef',$event)" title="不匹配原因"></popupMe>
		<popupMe ref="closingRef" @input="getContent('closingRef',$event)" title="关闭原因"></popupMe>
		<!-- ------弹窗---- -->
		
		<view class="details-box" v-if="topList.hasSnalyseContrast">
		   <sampleResult :resultList="topList.snalyseContrast" ></sampleResult>
		</view>
		<view class="details-box" v-if="topList.hasComeInitialSample">
			<view class='wrap-box'>
				<view class="details-title mt_20" >
					<view>品名（别名）：{{topList.goInitialSample.tradeName}}</view>
					<view class="pt_10">回样分析数据</view>
				</view>
				<chanpinyaosu :inquiryInfo="topList.comeAnalysisSample"></chanpinyaosu>         <!-- 产品要素 -->
				<view class="flex_c_c" v-if="isDisplayOrginalCome">
					<view class='recentPrice'  @tap="swtichDisplayCome">
						查看回样初始数据<uniIcon type="arrowdown" size="16" color="#FFFFFF"></uniIcon>
					</view>
				</view>
			</view>   <!-- wrap -->
			
		</view>  <!-- 详情 -->
		<!-- ---------原样分析结果--------- -->
		<view  class="productPart" v-if="!isDisplayOrginalCome"> 
		        <view class='wrap-box'>
						<view class="details-title-orginal">
							<view>回样初始数据</view>
						</view>
						<chanpinyaosu :inquiryInfo="topList.comeInitialSample"></chanpinyaosu>
						<view class="flex_c_c" v-if="!isDisplayOrginalCome">
							<view class='recentPrice shouqi' @tap="swtichDisplayCome">
								收起原样初始数据<uniIcon type="arrowup" size="16" color="#FF6000"></uniIcon>
							</view>
						</view>
				</view>		
		 </view>  <!-- 原样分析结果 -->
		<view class="details-box">
			<view class='wrap-box'>
				<view class="details-title mt_20" >
					<view>品名（别名）：{{topList.goInitialSample.tradeName}}</view>
					<view class="pt_10">原样分析数据</view>
				</view>
				<chanpinyaosu :inquiryInfo="topList.goAnalysisSample"></chanpinyaosu>         <!-- 产品要素 -->
				<view class="flex_c_c" v-if="isDisplayOrginal">
					<view class='recentPrice'  @tap="swtichDisplay">
						查看原样初始数据<uniIcon type="arrowdown" size="16" color="#FFFFFF"></uniIcon>
					</view>
				</view>
			</view>   <!-- wrap -->
			
		</view>  <!-- 详情 -->
		<!-- ---------原样分析结果--------- -->
		<view  class="productPart" v-if="!isDisplayOrginal"> 
		        <view class='wrap-box'>
						<view class="details-title-orginal">
							<view>原样初始数据</view>
						</view>
						<chanpinyaosu :inquiryInfo="topList.goInitialSample"></chanpinyaosu>
						<view class="flex_c_c" v-if="!isDisplayOrginal">
							<view class='recentPrice shouqi' @tap="swtichDisplay">
								收起原样初始数据<uniIcon type="arrowup" size="16" color="#FF6000"></uniIcon>
							</view>
						</view>
				</view>		
		 </view>  <!-- 原样分析结果 -->
		<view class="photo-box">
			<view class="photo-wrap">
				<view>布样照片</view>
				<view class="photo-flex-wrap">
					<block v-for="(item,index) in topList.goAnalysisPictures" :key="index">
					   <image :src="item" mode="aspectFit" class="image_sample"></image>
					</block>
				</view>
				
			</view>
			
		</view>
		
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
					<baojiaListDirect :item="item" @handleEvent="handleEvent" :isDisplayButton="!(topList.inquiry.inquiryStatusCode == 4 ||topList.inquiry.inquiryStatusCode == 9)"></baojiaListDirect>
				</view>
			</block>
			<view class='placeholder-view'></view>
			
			<view class="fixed_bottom box_shadow_btn" v-if="topList.inquiry.inquiryStatusCode != 4&&topList.inquiry.inquiryStatusCode !=9">
			    
			    <button class="btn_all" @tap="submit" hover-class="none" >直接报价</button>
			  
			</view>
		</view>
		<view v-if="isMatch">
			<view class='no_baojia' v-if="quotationList.length == 0">
				暂无相关报价信息
			</view>
			<block v-for="(item,index) in quotationList" :key="index">
				<view class="baojia-box" @tap="toDetail(item.quotationNumber)">
					<baojiaList :item="item" @handleEvent="handleEvent" :isDisplayButton="!(topList.inquiry.inquiryStatusCode == 4 ||inquiryInfo.inquiryStatusCode == 9)"></baojiaList>
				</view>
			</block>
			<view class='placeholder-view'></view>
			
			<view class="fixed_bottom box_shadow_btn" v-if="topList.inquiry.inquiryStatusCode ==2 ">
			  <button class="btn_all" hover-class="none" @tap="pushSellerQuote" v-if="quotationList.length ==0">推送卖帮办报价</button>

			</view>
			
			
			<view class="fixed_bottom box_shadow_btn" v-if="topList.inquiry.inquiryStatusCode ==3 ">
			    <button class="btn_all" hover-class="none" @tap="bindCancel" >催单报价</button>

			</view>
		</view>
		
	

   
		
	
		
	</view>
</template>

<script>
	import popupMe from "@/components/popupMe.vue";
	import uniIcon from "@/components/uni-icons/uni-icons.vue";
	import baojiaList from "@/components/inquiry/baojia-list-buy.vue";
	import baojiaListDirect from "@/components/inquiry/baojia-list-direct.vue";
	import chanpinyaosu from "@/components/sample-inquiry/chanpinyaosu-quote.vue";
	import sampleResult from "@/components/sampleResult.vue";
	let _this,_inquiryNumber
	export default {
		components:{
			popupMe,
			uniIcon,
			baojiaList,
			baojiaListDirect,
			chanpinyaosu,
			sampleResult
		},
		data(){
			return {
				isMatch: true,
				unMatch: '',
				closing: '',
				inquiryInfo:'',
				quotationList:[],
				directQuotion:[],
				isDoRefresh:false,
				quotationNumber:'',
				pageNum:1,
				pageSize:10,
				topList:'',
				inquiryNumber:'',
				isHasPush: true,
				isDisplayOrginal: true,
				isDisplayOrginalCome:true,
				isAnaly: false,
				
			};
		},
		
		onShow: function () {
		  let pages = getCurrentPages();
		  let currPage = pages[pages.length-1];
		  if (currPage.data.isDoRefresh == true){
		  	       currPage.data.isDoRefresh = false;
				   _this.getInquiryInfo()
		  		   _this.getDeputyQuotation()
				   _this.getDirectQuotation()
		  	 }
		  
		},
		onLoad:function(options){
			console.log(options)
			_this = this
			this.inquiryNumber = options.inquiryNumber
			this.getInquiryInfo()
			this.getDeputyQuotation()
			_this.getDirectQuotation()
		},
		methods:{
			getDirectQuotation:function(){
					let data={
						inquiryNumber:_this.inquiryNumber,  //		询价单号
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
			getInquiryInfo:function(){
				let url = this.Api.zyDetails
				let data ={
					inquiryNumber: _this.inquiryNumber
				}
				this.myRequest(data,url,'get').then(res => {
				  
				  if (res.data.status == 0){
					  console.log(res)
					 _this.topList = res.data.data
					 _this.topList.goAnalysisSample.tradeName= _this.topList.goInitialSample.tradeName
					
				  }
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
					inquiryNumber: _this.inquiryNumber,  //	询价单号
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
						}
						
			},
			closingInquiry:function(params){
				let data={
					inquiryNumber:_this.inquiryInfo.inquiryNumber,  //		询价单号
					buyDeputyRemarks:_this.closing
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
					 inquiryNumber:_this.topList.inquiry.inquiryNumber
				}
				let url = this.Api.push
				this.myRequest(data,url,'get').then(res => {
				  console.log(res);
				  if (res.data.status == 0){
					  uni.showToast({
					  	title: '已推送',
						duration:1000
					  });
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
			//买办关闭报价单
			closingQuote:function(params){
				let data={
					quotationNumber:_this.quotationNumber,  //		报价单号
					sellDeputyRemarks:_this.closing
				}
				let url = this.Api.buyDeputySuited
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
			//买办设置不匹配
			unMatchFunc:function(params){
				let data={
					quotationNumber:_this.quotationNumber,  //		报价单号
					buyDeputyRemarks:_this.unMatch
				}
				let url = this.Api.buyDeputyUnsuited
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
			swtichDisplay:function(){
				this.isDisplayOrginal = !this.isDisplayOrginal
			},
			swtichDisplayCome:function(){
				this.isDisplayOrginalCome = !this.isDisplayOrginalCome
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
					    break
					case 'unMatch':
					
					    this.tapUnmatch()
						
					    break
					case 'trade':
						let _data ={
							inquiryNumber: _inquiryNumber,
							quotationNumber: _this.quotationNumber
						}
						let _url = this.Api.buyDeputyAddOrder
						this.myRequest(_data,_url,'get').then(res => {
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
	
	
.baojia-contentBottom{
		display: flex;
		justify-content: space-between;
		line-height: 65upx;
		width: 100%;
		font-size: 12px;
		height: 69upx;
		color: #8D8D8D;
		.baojia_button{
			display: flex;
			flex-direction: row-reverse;
			justify-content: space-between;
			width:300upx;
			.baojia_Clipboard{
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #FF6000;
				color: white;
				line-height: 52upx;
				width:136upx;
				height:52upx;
				background:rgba(255,96,0,1);
				border-radius:4upx;
			}
		}
		.baojia_time{
			font-size: 10px;
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
		
		padding-bottom: 10upx;
		display:flex;
		flex-direction: column;
		// align-items: center;
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
		background: #FF6000;
		color: #FFFFFF;
		height: 38upx;
		width: 228upx;
		border-radius: 18upx;
		font-size: 10px;
	    margin-bottom: 20upx;
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
	.i-print{
		width: 50upx;
		height: 50upx;
	}
	.productPart{
		background: #FFFFFF;
		margin: 0 30upx 0 30upx;
	}
	
	.shouqi{
		background: #FFFFFF;
		color: #FF6000;
		border: 1upx solid #FF6000;
	}
	.photo-box{
		margin: 20upx 30upx 0 30upx;
		border-radius: 6upx;
		line-height: 1;
		background-color: #fff; 
		height: 320upx;
	}
	.photo-wrap{
		padding-top: 30upx;
		padding-left: 20upx;
		font-size: 14px;
		
	}
	.productPart{
		background: #FFFFFF;
		margin: 0 30upx 0 30upx;
	}
	.photo-flex-wrap{
		display: flex;
		flex-wrap: wrap;
		
	}
	.btn_all{
		width: 100%;
		background-color: #FF6000;
		color: #fff;
		border-radius: 0;
		font-size: 16px;
		line-height: 88upx;
	}
	.details-title-orginal{
		
		display:flex;
		//flex-direction: column;
		align-items: center;
		height: 72upx;
		width: 100%;
		font-size: 14px;
		font-weight: bold;	
	}
	.image_sample{
		width: 200upx;
		height: 200upx;
		margin-top: 20upx;
	}
	
	
</style>
