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
			<!-- <view>
				<topTabbar @change="tabSwitch()" :items="items" ></topTabbar>
			</view> -->
            <view style="background: #FFFFFF;">
            	<ms-dropdown-menu>
            		<ms-dropdown-item v-model="scope" :list="items" @input="filterInput"></ms-dropdown-item>
            	    <ms-dropdown-item v-model="companyLevel" :list="companyLevelList" @input="filterInput" v-if="companyLevelList.length>0"></ms-dropdown-item>
            	</ms-dropdown-menu>
            </view>
		</view>
		<view style="height: 220upx;width:100%;"></view>
		<block v-for="(item,index) in followList" :key="index" >
			<view class="record-wrap flex_sb" @tap="toDetail(item.companyCode)">
				<view class="flex_column">
					
					<view class="followTitle">{{item.companyName||''}}</view>

					<view class="followContent"><text style="color: #000000">{{item.realName||''}}</text></view>

				    <view style="color:#999;font-size:12px;line-height: 30px;">跟进时间：{{item.createTime||''}}</view>
					
				</view>
				<!-- <view style="font-size: 13px;" class="flex_column">
					<view style="font-size: 12px;line-height: 30px;color:#FF6000">{{item.recordStatusName||''}}</view>
					<view class="flex_c_c" style="margin-top:20upx;" v-if="item.recordStatusCode!=98&&item.recordStatusCode!=99">
						<image :src="baseUrl+ item.warningLevelCode + '.png'" mode="aspectFit" class="alertPng" @tap="addFollow"></image>
					</view>
					
				</view> -->
			</view>
		</block>
		
		<uniLoadMore :status="loadingType"></uniLoadMore>
		<!-- <view v-if="isShowButton">
			<image src="/static/images/qingfc/addFollow.png" mode="aspectFit" class="er_img" @tap="addFollow"></image>
		</view> -->
		
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import uniIcon from "@/components/uni-icons/uni-icons.vue";
	import topTabbar from "@/components/topTabbar-follow.vue";
	import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
	import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
	let _this,timer;
	export default {
		components:{
			uniLoadMore,
			uniIcon,
			topTabbar,
			msDropdownMenu,
			msDropdownItem
		},
		data() {
			return {
				pupDefault:'',
				baseUrl:'/static/images/jinsy/alert/',
				items: [{text:'最新跟进',value: 0},{text:'待跟进',value: 1}],
				loadingType: 'more',
			    companyLevelList:[],
			    companyLevel: 0,
				followList:[],
				keyword:"",
				scope: 0,
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
			this.getCompanyLevel()
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
		methods:{
			async getCompanyLevel(){
				const res = await this.$http.get('/choose/company_level',{})
				console.log('companyLevel',res)
				let tmp = res.data.data.list
				tmp.forEach((item)=>{
					this.companyLevelList.push({text:item.label,value:item.id})
				})
				this.companyLevelList.unshift({text:'客户等级',value: 0})
				
			},
			filterInput:function(){
				this.loadingType = 'more'
				this.fetchList()
			},
			async fetchList(){
				this.pageNum =1
				let data={
					// postCode: this.pupDefault,  //身份编码
					companyLevel: this.companyLevel, //客户等级
					keyword:this.keyword,  //	搜索关键字
					scope:this.scope,			//我的跟进:1，订单跟进:2
					pageNum:  this.pageNum,
					pageSize: this.pageSize,
				}
				const res = await this.$http.get('/portrayal/deputy_list',{data:data})
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
					// postCode: this.pupDefault,  //身份编码
					companyLevel: this.companyLevel, //客户等级
					keyword:this.keyword,  //	搜索关键字
					scope:this.scope,
					pageNum:  this.pageNum,
					pageSize: this.pageSize,
				}
				const res = await this.$http.get('/portrayal/deputy_list',{data:data})
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
						url: `./sd_followRecordDetail?companyCode=${e}`,
						success: res => {},
						fail: (err) => { console.log(err)},
						complete: () => {}
					});
			},
			tabSwitch:function(index){
				this.activeIndex = index
				console.log('activeIndex',this.activeIndex)
				if (this.activeIndex ==0){
					 this.scope = 0
					}
				if (this.activeIndex ==1){
					this.scope = 1
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
	line-height: 25px;
	border-radius: 8upx;
}
.follow_point{
	width: 24upx;
	height: 24upx;
	border-radius: 50%;
	margin-top: 10upx;
}
.followTitle{
	font-size: 15px;
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

</style>
