<template>
	
	<view>
		<view class="top-nav-fixed">
			<view class="search_top_box_gray">
			  <view class="flex height_56">
				
				<view class="flex_c search_left_gray">
				  <icon type="search" size="14" style="height:14px;margin-left:40upx;"></icon>
				  <input class="search_left_input" v-model="keyword" placeholder="搜索" 
				   confirm-type="search" @confirm="tapSearch"></input>
				</view>
			
			  </view>
			</view>
			<view>
				<topTabbar @change="tabSwitch()" :items="items" ></topTabbar>
			</view>

		</view>
		<view style="height: 180upx;width:100%;"></view>
		<block v-for="(item,index) in followList" :key="index" >
			<view class="record-wrap " @tap="toDetail(item.recordCode)">
				<view class="flex_sb">
					<view class="flex_column" style="line-height: 25px;">
						
						<view class="followTitle">{{item.tradeName||''}}</view>
					
						<view class="followContent">客户：<text style="color: #000000">{{item.realName||''}}</text></view>
					
					    <view style="color:#999;font-size:12px;line-height: 30px;">跟进时间：{{item.createTime||''}}</view>
						
					</view>
					<view style="font-size: 13px;" class="flex_column">
						<!-- <view style="font-size: 12px;line-height: 30px;color:#FF6000">{{item.recordStatusName||''}}</view>
						<view class="flex_c_c" style="margin-top:20upx;" v-if="item.recordStatusCode!=98&&item.recordStatusCode!=99">
							<image :src="baseUrl+ item.warningLevelCode + '.png'" mode="aspectFit" class="alertPng" @tap="addFollow"></image>
						</view> -->
						<view class="messageCount flex_c_c" v-show="item.messageCount>0">{{item.messageCount||''}}</view>
					</view>
				</view>
				
				<view style="height:0;width: 100%;border-bottom: 1upx dashed #DADADA;"></view>
				<view style="display: flex;justify-content: space-between;font-size:13px;margin-top: 15upx;">
					<view :style="{color: item.warningLevelCode==1000 ||item.warningLevelCode==3000?'#00B71E':item.warningLevelCode==5000 ||item.warningLevelCode==7000?'#FFB420':'#ff0000'}">
					{{item.warningLevelName}}预警</view>
					<view class="statusStyle flex_c_c" :style="[{color: item.recordStatusCode==1 ?'#007EFF':'',background: item.recordStatusCode==1?'#F2F6FF':'#F5F5F5'}]">
					{{item.recordStatusName}}</view>
					<view>负责人</view>
				</view>
			</view>
			
		</block>
		
		<uniLoadMore :status="loadingType"></uniLoadMore>
		<view v-if="isShowButton">
			<image src="/static/images/qingfc/addFollow.png" mode="aspectFit" class="er_img" @tap="addFollow"></image>
		</view>
		
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import uniIcon from "@/components/uni-icons/uni-icons.vue";
	import topTabbar from "@/components/topTabbar-follow.vue";
	let _this,timer;
	export default {
		components:{
			uniLoadMore,
			uniIcon,
			topTabbar
		},
		data() {
			return {
				pupDefault:'',
				baseUrl:'/static/images/jinsy/alert/',
				items: ['我的跟进','订单跟进'],
				loadingType: 'more',
			
				followList:[],
				keyword:"",
				scope: 1,
				pageNum: 1,
				pageSize: 20,
				isDoRefresh:false,
				isShowButton:false
			};
		},
		onReachBottom:function(){
			 if (timer != null) {
			            clearTimeout(timer);
			        }
			   timer = setTimeout(function() {
			        _this.fetchMoreList();
			        }, 1000);
		},
		onPullDownRefresh:function(){
			
			this.fetchList();
		},
		onLoad:function(){
			_this = this
		    this.pupDefault = uni.getStorageSync('pupDefault')
		    if (this.pupDefault == "BUY_DEPUTY"){
		    	this.isShowButton = true
		    }
			this.fetchList()
			
		},
		onShow:function(){
			   let pages = getCurrentPages();
			   let currPage = pages[pages.length-1];
			   if (currPage.data.isDoRefresh == true){
			   	       currPage.data.isDoRefresh = false;
			   		   this.fetchList()
			   	}
				

		},
		filters:{
			warningColor(value){
				
				if (value == '1000'|| value== '3000'){
					return "#00B71E"		
				}else if (value == '5000' || value== '7000'){
					return "#FFB420"
				}else if (value == '9000'){
					return "#FF0000"
				}
			}
		},
		methods:{
			async fetchList(){
				this.pageNum =1
				let data={
					postCode: this.pupDefault,  //身份编码
					keyword:this.keyword,  //	搜索关键字
					scope:this.scope,			//我的跟进:1，订单跟进:2
					pageNum:  this.pageNum,
					pageSize: this.pageSize,
				}
				const res = await this.$http.get('/latent/list',{data:data})
				console.log(res)
				this.pageNum += 1
				
				this.followList = res.data.data.list
				uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
			},
			async fetchMoreList(){
				if (_this.loadingType !== 'more') {//loadingType!=0;直接返回
					return false;
				}
				_this.loadingType = 'loading';
				uni.showNavigationBarLoading();//显示加载动画
				let data={
					postCode: this.pupDefault,  //身份编码
					keyword:this.keyword,  //	搜索关键字
					scope:this.scope,
					pageNum:  this.pageNum,
					pageSize: this.pageSize,
				}
				const res = await this.$http.get('/latent/list',{data:data})
				if (res.data.data.list.length==0){
					_this.loadingType = '';
					uni.hideNavigationBarLoading();//关闭加载动画
					return;
				}
				this.pageNum += 1
				this.followList = this.followList.concat(res.data.data.list)
				_this.loadingType = 'more';//将loadingType归0重置
				uni.hideNavigationBarLoading();//关闭加载动画
				
			},
			toDetail:function(e){
				uni.navigateTo({
					url: `./detailFollowRecord?recordCode=${e}`,
					success: res => {},
					fail: (err) => {console.log(err)},
					complete: () => {}
				});
				
			},
			tabSwitch:function(index){
				this.activeIndex = index
				console.log('activeIndex',this.activeIndex)
				if (this.activeIndex ==0){
					 this.scope = 1
					}
				if (this.activeIndex ==1){
					this.scope = 2
				}
				this.fetchList()
			},
			tapSearch:function() {
				console.log(this.keyword)
				this.fetchList()
			
			},
			addFollow:function(){
				uni.navigateTo({
					url: './addFollowRecord',
					success: res => {},
					fail: (err) => { console.log(err)},
					complete: () => {}
				});
			}
			
		}
	}
</script>

<style lang="scss">
page{
	background: #F4F4F4;
}
.top-nav-fixed{
		position:fixed;
		top: 0;
        z-index: 99;
		background:#F4F4F4 ;
		width: 100%;
	}
.search_top_box_gray{
  background-color: #FFFFFF;
  padding:30upx;
	/* height: 92upx; */
  box-sizing: border-box;
}	
.search_left_gray{
  
  background-color:#EFEFEF;
  height: 54upx;
  box-sizing: border-box;
  border-radius: 26upx; 
  width: 100%;
}
.record-wrap{
	padding: 20upx;
	margin: 20upx;
	background: #FFFFFF;
	
	border-radius: 8upx;
}
.follow_point{
	width: 24upx;
	height: 24upx;
	border-radius: 50%;
	margin-top: 10upx;
}
.followTitle{
	font-size: 16px;
	color: #000000;
	font-weight: bold;
	line-height: 30px;
}
.followContent{
	font-size: 14px;
	color: #333333;
	line-height: 30px;
}

.er_img{
  position: fixed;
  bottom: 200upx;
  right: 24upx;
  width: 84upx;
  height: 84upx;
}
.alertPng{
	width: 34upx;
	height: 28upx;
}
.triangle_border_up{
    width:0;
    height:0;
    border-width:0 20upx 30upx;
    border-style:solid;
    border-color:transparent transparent #333;/*透明 透明  灰*/
    margin:10px auto;
    position:relative;

}
.messageCount{
	height: 36upx;
	width: 60upx;
	border-radius: 18upx;
	padding: 0 10upx;
	background: #ff0000;
	color: #FFFFFF;
}
.statusStyle{
	height: 40upx;
	border-radius: 20upx;
	padding: 0 20upx;

}
</style>
