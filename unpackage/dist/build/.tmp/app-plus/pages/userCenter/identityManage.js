(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userCenter/identityManage"],{"0286":function(t,e,n){"use strict";n.r(e);var a=n("df7d"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},6916:function(t,e,n){},"83ad":function(t,e,n){"use strict";n.r(e);var a=n("ab72"),o=n("0286");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("d4e9");var u,r=n("f0c5"),s=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);e["default"]=s.exports},ab72:function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}))},d107:function(t,e,n){"use strict";(function(t){n("d106");a(n("66fd"));var e=a(n("83ad"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},d4e9:function(t,e,n){"use strict";var a=n("6916"),o=n.n(a);o.a},df7d:function(t,e,n){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("4795"));function i(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,a,o,i,u){try{var r=t[i](u),s=r.value}catch(c){return void n(c)}r.done?e(s):Promise.resolve(s).then(a,o)}function r(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var i=t.apply(e,n);function r(t){u(i,a,o,r,s,"next",t)}function s(t){u(i,a,o,r,s,"throw",t)}r(void 0)}))}}var s=function(){n.e("components/popupMe").then(function(){return resolve(n("dd78"))}.bind(null,n)).catch(n.oe)},c={components:{popMe:s},data:function(){return{index:"",isActive:!1,level:[{id:1,name:"100USDF"},{id:2,name:"500USDF"},{id:3,name:"1000USDF"}],selectIndex:-1,record:[{time:"01-12 06:05",type:"排隊中",counter:"50.0000"}],sliceIndex:1,sliceArr:[{id:1,name:"靜態認購"},{id:2,name:"動態認購"}],userDetail:"",secondPassword:""}},onShow:function(){this.fetchUserDetail()},onLoad:function(){this.fetchUserDetail()},methods:{showDialog:function(t){this.index=t,this.$refs.dialog.show()},confirmInput:function(e){this.secondPassword=e,this.$refs.dialog.content="",t("log",this.secondPassword," at pages/userCenter/identityManage.vue:87"),this.checkPayPassword()},checkPayPassword:function(){var e=this;return r(o.default.mark((function n(){var i,u;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i={payPassword:e.secondPassword},n.next=3,e.$http.get("/user/check_pay_pass",{data:i});case 3:u=n.sent,t("log",u," at pages/userCenter/identityManage.vue:97"),e.secondPassword="","true"==u.data.data.msg?1==e.index?e.toOutKey():2==e.index?e.toOutPublic():3==e.index&&e.toOutWords():a.showToast({title:"支付密码不正确",icon:"none",duration:1e3});case 7:case"end":return n.stop()}}),n)})))()},toOutWords:function(){a.navigateTo({url:"./outWords?userCode=".concat(this.userDetail.userCode)})},toOutPublic:function(){a.navigateTo({url:"./outPublic?key=".concat(this.userDetail.publicKey)})},copyAddress:function(){a.setClipboardData({data:this.userDetail.walletAddress})},toOutKey:function(){a.navigateTo({url:"./outKey?key=".concat(this.userDetail.privateKey)})},fetchUserDetail:function(){var e=this;return r(o.default.mark((function n(){var a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.get("/user/details");case 2:a=n.sent,t("log",a," at pages/userCenter/identityManage.vue:141"),e.userDetail=a.data.data;case 5:case"end":return n.stop()}}),n)})))()},toDongliyuan:function(){a.navigateTo({url:"/pages/capital/dongliyuan"})},toShoukuanma:function(){var t=JSON.stringify(this.userDetail);a.navigateTo({url:"./shoukuanma?userDetail=".concat(t,"&type=2")})},toMoney:function(){a.navigateTo({url:"/pages/capital/money"})},toInitStore:function(){a.navigateTo({url:"/pages/capital/initStore"})},toFaZhuan:function(){a.navigateTo({url:"./fazhuan"})},toTixian:function(){a.navigateTo({url:"./tixian"})},selectItem:function(t){this.selectIndex=t},tapSlice:function(t){this.sliceIndex=t},toZhuliyuan:function(){a.navigateTo({url:"/pages/capital/zhuliyuan?account=".concat(this.userDetail.shuntPool)})},toShangZhi:function(){a.navigateTo({url:"/pages/capital/shangzhijilu"})},toEnergyPool:function(){a.navigateTo({url:"/pages/capital/energyPool?account=".concat(this.userDetail.energyPool)})}}};e.default=c}).call(this,n("0de9")["default"],n("6e42")["default"])}},[["d107","common/runtime","common/vendor"]]]);