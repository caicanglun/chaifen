(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/tixian"],{"40e6":function(t,e,n){"use strict";var r=n("ea63"),u=n.n(r);u.a},4432:function(t,e,n){"use strict";n.r(e);var r=n("536d"),u=n("9690");for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);n("40e6");var o,i=n("f0c5"),s=Object(i["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=s.exports},"536d":function(t,e,n){"use strict";var r,u=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}))},8219:function(t,e,n){"use strict";(function(t){n("d106");r(n("66fd"));var e=r(n("4432"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},9690:function(t,e,n){"use strict";n.r(e);var r=n("cc44"),u=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=u.a},cc44:function(t,e,n){"use strict";(function(t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=a(n("4795"));function a(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n,r,u,a,o){try{var i=t[a](o),s=i.value}catch(c){return void n(c)}i.done?e(s):Promise.resolve(s).then(r,u)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(r,u){var a=t.apply(e,n);function i(t){o(a,r,u,i,s,"next",t)}function s(t){o(a,r,u,i,s,"throw",t)}i(void 0)}))}}var s={data:function(){return{form:{userCode:"",usde:"",payPassword:""},ratio:""}},onLoad:function(){this.fetchRatio(),t("log",this.$store.userCode," at pages/index/tixian.vue:70")},methods:{quzheng:function(){this.form.usde=10*parseInt(this.form.usde/10)},allin:function(){this.form.usde=this.userDetail.signinUsde},fetchRatio:function(){var t=this;return i(u.default.mark((function e(){var n;return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("/deal/signin_shift_ratio");case 2:n=e.sent,t.ratio=n.data.data.msg;case 4:case"end":return e.stop()}}),e)})))()},submit:function(){var t=this;return i(u.default.mark((function e(){return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.form.usde<50)){e.next=3;break}return r.showToast({title:"數量最少50",icon:"none",duration:1e3}),e.abrupt("return");case 3:if(t.form.userCode!=t.$store.userCode){e.next=6;break}return r.showToast({title:"不能轉賬給自己",icon:"none",duration:1e3}),e.abrupt("return");case 6:return t.form.usde=10*parseInt(t.form.usde/10),r.showLoading({title:"提交中",mask:!0}),e.next=10,t.$http.get("/deal/signin_shift",{data:t.form});case 10:e.sent,r.hideLoading(),r.showToast({title:"轉賬成功",icon:"none",duration:1e3}),setTimeout((function(){r.navigateBack({delta:1})}),2e3);case 14:case"end":return e.stop()}}),e)})))()},scanCodeToken:function(){r.scanCode({success:function(e){t("log","条码类型："+e.scanType," at pages/index/tixian.vue:123"),t("log","条码内容："+e.result," at pages/index/tixian.vue:124")}})},scanCodeNode:function(){r.scanCode({success:function(t){this.form.userCode=t.result}})}}};e.default=s}).call(this,n("0de9")["default"],n("6e42")["default"])},ea63:function(t,e,n){}},[["8219","common/runtime","common/vendor"]]]);