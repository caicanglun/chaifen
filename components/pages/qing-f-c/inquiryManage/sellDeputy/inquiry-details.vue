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
						询价单号: {{inquiryInfo.inquiryNumber ||''}}
					</view>
					
					<view class="buttonStyle">
						{{inquiryInfo.inquiryStatus ||''}}
					</view>
				</view>
				<view class="box-content">
				  <text class='title'>买帮办：</text><text>{{inquiryInfo.buyDeputyRealName ||''}}</text>
				</view>
				<view class="box-content">
				  <text class='title'>买家：</text><text>{{inquiryInfo.companyName||''}}</text>
				</view>
				<view class="box-contentSmall">
				  <text>询价类型：</text><text>{{inquiryInfo.inquiryTypeCode==1?'常规询价':'找样询价'}}</text>
				</view>
				<view class="box-contentBottom">
					<view>
						<text>建立时间：</text><text>{{inquiryInfo.inquiryCreateTime ||''}}</text>
					</view>
				</view>
			</view>
		</view>
		<popupMe ref="unMatchRef" @input="getContent('unMatchRef',$event)" title="不匹配原因"></popupMe>
		<popupMe ref="closingRef" @input="getContent('closingRef',$event)" title="关闭原因"></popupMe>
		<popupMe ref="systemUnMatchRef" @input="getContent('systemUnMatchRef',$event)" title="系统不匹配原因"></popupMe>
		
		<view class="details-box">
			<view class='wrap-box-1'>
				<view class="details-title">
					品名（别名）：{{inquiryInfo.tradeName||''}}
				</view>
				<chanpinyaosu :inquiryInfo = "inquiryInfo"></chanpinyaosu>
				
			</view>
			
		</view>  <!-- 详情 -->
		
		<!-- <view class="banner" v-if="quotationList.length>0">
			 报价记录 <text class="pl_20">({{quotationList.length}})</text>
		</view> -->
		<view class='banner'>
			<view :class="(!isMatch?'btn':'unSelect')" @tap="swtichMatch(1)">
				系统匹配<view><text class="fs_12">（{{quotationInfo.length}}）</text></view>
			</view>
		    <view :class="(isMatch?'btn':'unSelect')" @tap="swtichMatch(2)">
		    	卖帮办报价<view><text class="fs_12">（{{quotationList.length}}）</text></view>
		    </view>
		</view>
		<view v-if="!isMatch">
			<view class='no_baojia' v-if="quotationInfo.length == 0">
				暂无相关报价信息
			</view>
			<view v-if="quotationInfo.length >0" style="font-size:13px;height:65upx;" class="flex_c_c">
				匹配{{quotationInfo.length}}家，待报价<text style="color: #FF0000">{{waitQuotation}}</text>家
			</view>
			<block v-for="(item,index) in quotationInfo" :key="index">
				<view class="baojia-box" @tap="toMatchDetail(item.matchCode)">
					<sellerMatch :quotationInfo="item" @handleEvent="handleEvent"></sellerMatch>
				</view>
			</block>
			<view class='placeholder-view'></view>
			
			
		</view>
		<view v-if="isMatch">
			<view class='no_baojia' v-if="quotationList.length == 0">
				暂无相关报价信息
			</view>
			
			<block v-for="(item,index) in quotationList" :key="index">
				<view class="baojia-box" @tap="toDetail(item.quotationNumber)">
					<baojiaList :item="item" @handleEvent="handleEvent"></baojiaList>
				</view>
			</block>
			<view class='placeholder-view'></view>
			<view class="fixed_bottom box_shadow_btn" v-if="inquiryInfo.inquiryStatusCode != 4&&inquiryInfo.inquiryStatusCode != 9">
			  <button class="btn_all" @tap="submit" hover-class="none">发起报价</button>
			</view>
			
		</view>
		

       
		
	</view>
</template>

<script>
	import baojiaList from "@/components/inquiry/baojia-list.vue";
	import chanpinyaosu from "@/components/inquiry/chanpinyaosu.vue";
	import popupMe from "@/components/popupMe.vue";
	import sellerMatch from "@/components/sellerMatch.vue"
	let _this,_inquiryNumber
	export default {
		components:{
			baojiaList,
			chanpinyaosu,
			popupMe,
			sellerMatch
		},
		data(){
			return {
				matchCode:'',
				quotationInfo:'',
				isMatch: true,
				unMatch:'',
				closing: '',
				systemUnMatch:'',
				inquiryInfo:'',
				pageNum: 1,
				pageSize: 10,
				quotationList:[],
				isDoRefresh:false,
				quotationNumber:'',
				totalPage:'',
			    waitQuotation:0
				
			};
		},
		onLoad:function(options){
			_this = this
			_inquiryNumber = options.inquiryNumber
			this.getInquiryInfo(_inquiryNumber)
			this.getDeputyQuotation()
			this.matchList1()
		},
		onShow: function () {
		  let pages = getCurrentPages();
		  let currPage = pages[pages.length-1];
		  if (currPage.data.isDoRefresh == true){
		  	       currPage.data.isDoRefresh = false;
				   this.getInquiryInfo(_inquiryNumber)
		  		   this.getDeputyQuotation()
		  	 }
		  this.getInquiryInfo(_inquiryNumber)
		  this.getDeputyQuotation()
		  this.matchList1()
		},
		methods:{
			//系统匹配
			matchList1:function(){
				let data={
					inquiryNumber: _inquiryNumber
				}
				let url = this.Api.matchList1
				this.myRequest(data,url,'get').then(res => {
				  console.log(res);
				  _this.quotationInfo = res.data.data.list
				  console.log(_this.quotationInfo)
				  _this.waitQuotation = 0
				  _this.quotationInfo.forEach((item)=>{
					  if (item.matchStatusCode==1){
						  _this.waitQuotation +=1
					  }
				  })
				}).catch(err => {
				  wx.showToast({
				    title: err.data.errMsg,
				    icon: 'none'
				  });
				});
			},
			toMatchDetail:function(matchCode){
				
				uni.navigateTo({
					url: '/pages/qing-f-c/inquiryManage/systemMatch/systemMatchDetail?matchCode='+ matchCode+'&inquiryNumber='+_inquiryNumber,
					success: res => {},
					fail: (err) => { console.log()},
					complete: () => {}
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
			//询价单详情
			getInquiryInfo:function(inquiryNumber){
				let data={
					inquiryNumber: inquiryNumber
				}
				let url = this.Api.deputyDetails
				this.myRequest(data,url,'get').then(res => {
				  console.log(res);
				  _this.inquiryInfo = res.data.data
				  console.log(_this.inquiryInfo)
				  _this.totalPage = res.data.totalPage
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
				let url = this.Api.deputyQuotation
				this.myRequest(data,url,'get').then(res => {
				  console.log(res);
				  _this.quotationList = res.data.data.list
				  console.log(_this.quotationList)
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
					url: '/pages/qing-f-c/inquiryManage/sellDeputy/quotation-detail?quoteNumber='+ e, 
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			//关闭报价单
			closingQuote:function(params){
				let data={
					quotationNumber:_this.quotationNumber,  //		报价单号
					sellDeputyRemarks:_this.closing
				}
				let url = this.Api.sellDeputyClose
				this.myRequest(data,url,'get').then(res => {
				  console.log(res);
				  if (res.data.status == 0){
					  _this.getInquiryInfo()
					  _this.getDeputyQuotation()
				  }
				}).catch(err => {
				  wx.showToast({
				    title: err.data.errMsg,
				    icon: 'none'
				  });
				});
			},
			//系统不匹配报价单
			systemUnMatchQuote:function(){
				let data={
					matchCode:_this.matchCode,  //		报价单号
					remarks:_this.systemUnMatch
				}
				let url = this.Api.systemNoMatch
				this.myRequest(data,url,'get').then(res => {
				  console.log(res);
				  if (res.data.status == 0){
					  _this.getInquiryInfo()
					  _this.getDeputyQuotation()
					  _this.matchList1()
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
				switch(params[0]){
					case 'closing':
					    _this.quotationNumber = params[1]
					    this.tapClosing()
					    break
					case 'unMatch':
					   _this.quotationNumber = params[1]
					   this.tapUnmatch()
					    break
					case 'systemUnMatch':
					   _this.matchCode = params[1]
					   this.tapSystemUnmatch()
					   break
				}
			},
			
			tapUnmatch:function(){
				this.$refs.unMatchRef.show()
			},
			tapClosing:function(){
				this.$refs.closingRef.show()
			},
			tapSystemUnmatch:function(){
				this.$refs.systemUnMatchRef.show()
			},
			getContent:function(label,content){
				switch (label){
					case 'unMatchRef':
						 this.unMatch = content
						 this.unMatchQuote()
						 console.log(this.unMatch)
						 break
					case 'closingRef':
						 this.closing = content
						 this.closingQuote()
						 console.log(this.closing)
						 break
					case 'systemUnMatchRef':
						 this.systemUnMatch = content
						 this.systemUnMatchQuote()
						 console.log(this.systemUnMatchQuote)
						 break
				}
						
			},
			submit:function(){
				// uni.navigateTo({
				// 	url: './startQuote?inquiryNumber='+ _inquiryNumber,
				// 	success: res => {},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
				this.$store.dispatch('copeFun',_inquiryNumber)
				uni.navigateTo({
					url: '/pages/qing-f-c/inquiryManage/comQuotation/selectCustomer?inquiryNumber='+ _inquiryNumber,
					success: res => {},
					fail: (err) => {console.log(err)},
					complete: () => {}
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
		font-size: 12px;
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
		font-size: 15px;
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
	.btn_all{
		width: 100%;
		background-color: #FF6000;
		color: #fff;
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
	.banner{
			   margin-top: 20upx;
			   width:100%;
			   height:88upx;
			   background:rgba(255,96,0,1);
			   box-shadow:0px 4px 8px 0px rgba(0, 0, 0, 0.05);
			   display: flex;
			   justify-content: center;
			   align-items: center;
			   font-size: 14px;
			   color: white;
	  }
	
	
</style>
