<template>
	<view>
		<view :class="'box_shadow search_btn ' + (bindSelect?'bind_searach':'')" @tap="bindSelectFunc">
			<view class="flex selection ">
			  <view>
				<block v-for="(item, index) in selectContent" :key="index">
				  <view :class="(index>0?'selectClass':'color_FF')" @tap="bindSelectContent" 
				  :data-index="index">{{item.label}}</view>
				</block>
			  </view>
			  <!-- <image src="/static/images/qingfc/application/select_bind.png" mode="aspectFit"></image> -->
			  <uniIcon type='arrowdown' size='20' color='#FFFFFF' v-if='!bindSelect'></uniIcon>
			  <uniIcon type='arrowup' size='20' color='#FFFFFF' v-if='bindSelect'></uniIcon>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icons/uni-icons.vue";
	export default {
		components:{
			uniIcon
		},
		beforeMount:function(){
			this.getRegionCode()
		},
		data() {
			return {
				selectContent:[],
				regionCode:'',
				bindSelect: false,
			};
		},
		methods:{
			async getRegionCode(){
				const res = await this.$http.get('/announcement/list')
				console.log(res)
				res.data.data.list.forEach((item)=>{
					this.selectContent.push({id: item.announcementCode,label: item.title})
				})
				
				this.selectContent.unshift({id: 0 ,label:'全部历史公告'})
				console.log(this.selectContent)	  
					  
					  
			},
			bindSelectFunc: function () {
			  // this.setData({
			  //    bindSelect: !this.bindSelect
			  // });
			  this.bindSelect = !this.bindSelect
			},
			// 点击选项
			bindSelectContent: function (e) {
			  let index = e.currentTarget.dataset.index;
			  let selectContent = this.selectContent;
			  let obj = selectContent[0];
			  selectContent[0] = selectContent[index];
			  selectContent[index] = obj;
			  if (this.selectContent[0].id == 0){
				  this.regionCode = '' 
			  }else{
				  this.regionCode = this.selectContent[0].id
			  }
              this.$emit('selected',this.regionCode)
			},
		}
	}
</script>

<style lang="scss">
	.flex{
		display: flex;
	}
    .search_btn{
      width: 600upx;
      /* background-color: #F2F2F2; */
      background-color: #091224;
      border-radius: 28upx;
      display: flex;
      // justify-content: center;
     /* color:#9B9B9B; */
      color:#FFFFFF;
      height: 56upx;
      flex-wrap: wrap;
      position: relative;
      z-index: 99;
      overflow: hidden;
      transition: 0.2s
    }
	.bind_searach{
	  /* height: 192upx; */
	  height: 300upx;
	}
	.selection{
	  line-height: 56upx;
	  
	}
	.lh{
	  line-height: 62upx;
	}
	.fs{
		fonts-size: 14px;
	}
	.selectClass{
		font-size: 14px;
		line-height: 62upx;
	}
	.color_FF{
		font-size: 14px;
		color: #FFFFFF;
	}
</style>
