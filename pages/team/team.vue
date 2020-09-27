<template>
	<view>
		<view class="flex">
			<view class="flex_c inputWarp">
				<input :placeholder="i18n.registerBackup.userId" v-model="searchCode" width="7" type="number" @confirm="inputConfirm" placeholder-style="font-size:13px;padding-left: 10upx;" class="searchTeam">
				<image src="/static/icon_search@2x.png" style="width: 20upx;height:20upx;padding-right: 20upx;" @tap="inputConfirm" mode="aspectFit"></image>
			</view>
			
			<view class="flex_c_c backtoTop" @tap="backtoTop">
				{{i18n.user.backTop}}
			</view>
		</view>
		<view  style="margin-top: 50upx;margin-left: 350upx;">
			<view class="tipsbox" v-if="active">
				<view>
					{{ i18n.user.nodeCode}}：{{tips.userCode}}
				</view>
				<view>
					{{ i18n.user.leftNum}}：{{tips.leftPerformance}}
				</view>
				<view>
					{{ i18n.user.rightNum}}：{{tips.rightPerformance}}
				</view>
				
				<view>{{i18n.user.todayNum}}：{{tips.dayPerformance}}</view>
			</view>
		</view>
		
		<view class="flex_c_c" style="margin-top: 30upx;" >
			
			<view class="tree">
			        <ul>
			            <li>
			                <text :class="active==tree.userCode?'activeClass':''"  @tap="tapText(tree.userCode,$event)">{{tree.userCode}}</text>
			                <ul v-if="tree.left || tree.right">
			                    <li v-if="tree.left">
			                        <text  :class="active==tree.left.userCode?'activeClass':''" @tap="tapText(tree.left.userCode,$event)" @longpress="longPressText(tree.left.userCode)">{{ tree.left.userCode}}</text>
			                        <ul v-if="tree.left.left || tree.left.right">
			                            <li v-if="tree.left.left">
			                                <text  :class="active==tree.left.left.userCode?'activeClass':''" @tap="tapText(tree.left.left.userCode,$event)" @longpress="longPressText(tree.left.left.userCode)">{{ tree.left.left.userCode}}</text>
			                            </li>
										<li v-if="tree.left.right">
										    <text  :class="active==tree.left.right.userCode?'activeClass':''" @tap="tapText(tree.left.right.userCode,$event)" @longpress="longPressText(tree.left.right.userCode)">{{ tree.left.right.userCode}}</text>
										</li>
			                        </ul>
			                    </li>
			                    <li v-if="tree.right">
			                        <text  :class="active==tree.right.userCode?'activeClass':''" @tap="tapText(tree.right.userCode,$event)" @longpress="longPressText(tree.right.userCode)">{{ tree.right.userCode}}</text>
			                        <ul v-if="tree.right.left || tree.right.right">
			                            <li v-if="tree.right.left">
											<text  :class="active==tree.right.left.userCode?'activeClass':''" @tap="tapText(tree.right.left.userCode,$event)" @longpress="longPressText(tree.right.left.userCode)">{{ tree.right.left.userCode}}</text>
										</li>
										<li v-if="tree.right.right">
											<text  :class="active==tree.right.right.userCode?'activeClass':''" @tap="tapText(tree.right.right.userCode,$event)" @longpress="longPressText(tree.right.right.userCode)">{{ tree.right.right.userCode}}</text>
										</li>
			                        </ul>
			                    </li>
			                </ul>
			            </li>
			        </ul>    
			    </view>
		</view>
			
		<view>
			<view class="flex_c_c backtoTop" style="margin-top: 100upx;width: 200upx;" @tap="backtoLast">
				🔙 上层
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		computed:{
		   i18n() {  
		     return this.$i18nMsg()  
		   }
		},
		data() {
			return {
				isShow:false,
				tips:{
					"userCode": '',
					"leftPerformance": 0,
					"rightPerformance": 0,
					"dayPerformance": 0
				},
				isShowTip: false,
				userCode: '',
				tree:'',
				active:'',
				last:[],
				orgion:'',
				searchCode:''
			};
		},
		onLoad:function(){
			uni.setNavigationBarTitle({
			    title:this.$i18nMsg().user.relationship
			});
			this.userCode = this.$store.state.userCode
			this.orgion = this.$store.state.userCode
			this.last.push(this.orgion)
			this.fetch()
		},
		methods:{
			backtoLast:function(){
				
				let tmp = this.last.pop()
				if (tmp == this.orgion){
					this.userCode = tmp
					console.log('wfwefwef')
					this.last = []
					this.last.push(this.orgion)
					this.fetch()
					return
				}
				
				this.userCode = tmp
				this.fetch()
			},
			longPressText:function(e){
				this.userCode = e
				this.last.push(e)
				console.log(this.last)
				this.fetch()
			},
			async fetch(){
				let data ={
					userCode: this.userCode
				}
				const res = await this.$http.get('/user/tree',{data: data})
				this.tree = res.data.data
				console.log(res)
			},
			async inputConfirm(){
				this.userCode = this.searchCode
				this.fetch()
			},
			backtoTop:function(){
				this.userCode = this.orgion
				this.fetch()
			},
				
			tapShow:function(e){
				console.log(e)
			},
			async tapText(id,e){
				
				if (this.active ==id){
					this.active =''
					return
				}else {
					this.active = id
				}
				
				let data ={ 
					userCode: id 
				}
				const res = await this.$http.get('/user/performance',{data: data})
			    console.log(res)
				this.tips = res.data.data
			},
			
		}
	}
</script>

<style lang="scss">
    page{
		background: #091224;
		color: white;
	}
	.activeClass{
		background: #ff0000;
	}
	* {margin: 0 auto; padding: 0;}
	.tree{margin:0 auto}
	.tree ul {margin:0 auto;
		padding-top: 20px; position: relative;
		
		transition: all 0.5s;
		-webkit-transition: all 0.5s;
		-moz-transition: all 0.5s;
	}
	
	.tree li {
		float: left; text-align: center;
		list-style-type: none;
		position: relative;
		padding: 20px 5px 0 5px;
		display: list-item;
		transition: all 0.5s;
		-webkit-transition: all 0.5s;
		-moz-transition: all 0.5s;
	}
	
	/*We will use ::before and ::after to draw the connectors*/
	
	.tree li::before, .tree li::after{
		content: '';
		position: absolute; top: 0; right: 50%;
		border-top: 1px solid #fff;
		width: 50%; height: 20px;
	}
	.tree li::after{
		right: auto; left: 50%;
		border-left: 1px solid #fff;
	}
	
	/*We need to remove left-right connectors from elements without 
	any siblings*/
	.tree li:only-child::after, .tree li:only-child::before {
		display: none;
	}
	
	/*Remove space from the top of single children*/
	.tree li:only-child{ padding-top: 0;}
	
	/*Remove left connector from first child and 
	right connector from last child*/
	.tree li:first-child::before, .tree li:last-child::after{
		border: 0 none;
	}
	/*Adding back the vertical connector to the last nodes*/
	.tree li:last-child::before{
		border-right: 1px solid #fff;
		border-radius: 0 5px 0 0;
		-webkit-border-radius: 0 5px 0 0;
		-moz-border-radius: 0 5px 0 0;
	}
	.tree li:first-child::after{
		border-radius: 5px 0 0 0;
		-webkit-border-radius: 5px 0 0 0;
		-moz-border-radius: 5px 0 0 0;
	}
	
	/*Time to add downward connectors from parents*/
	.tree ul ul::before{
		content: '';
		position: absolute; top: 0; left: 50%;
		border-left: 1px solid #fff;
		width: 0; height: 20px;
	}
	
	.tree li text{
		border: 1px solid #fff;
		padding: 5upx 10upx;
		text-decoration: none;
		color: #fff;
		font-family: arial, verdana, tahoma;
		font-size: 13px;
		display: inline-block;
		
		border-radius: 5px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		
		transition: all 0.5s;
		-webkit-transition: all 0.5s;
		-moz-transition: all 0.5s;
	}
	
	/*Time for some hover effects*/
	/*We will apply the hover effect the the lineage of the element also*/
	// .tree li a:hover, .tree li a:hover+ul li a {
	// 	background: #c8e4f8; color: #000; border: 1px solid #94a0b4;
	// }
	/*Connector styles on hover*/
	// .tree li a:hover+ul li::after, 
	// .tree li a:hover+ul li::before, 
	// .tree li a:hover+ul::before, 
	// .tree li a:hover+ul ul::before{
	// 	border-color:  #94a0b4;
	// }
   .backtoTop{
	   width: 120upx;
	   height: 50upx;
	   color: #7d889a;
	   font-size:14px;
	   background: bgra(255,255,255,0.1);
	   border: 1upx solid #FFFFFF;
	   border-radius: 4upx;
   }
   .searchTeam{
	   
	   padding-left: 10upx;
	   height: 50upx;
	   width: 450upx;
   }
   .inputWarp{
	   border: 1upx solid  #7d889a;
   } 
   .tipsbox{
	  
	   border: 1upx solid #ff0000;
	   padding:20upx;
	   font-size: 13px;
	   background: #FFFFFF;
	   z-index:999;
	   // height: 140upx;
	   width: 300upx;
	   color: #000;
	   // position: absolute;
   }
   
</style>
