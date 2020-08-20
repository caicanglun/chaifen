
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/usdfDeal/hall","pages/usdfDeal/buySellUsdf","pages/userCenter/share","pages/capital/zhuliyuan","pages/register/login","pages/index/wallet","pages/index/buyStore","pages/team/team","pages/index/activeAccounter","pages/register/register","pages/register/wordsConfirm","pages/userCenter/myTeam","pages/userCenter/userCenter","pages/register/startLogin","pages/register/zhujiciBack","pages/userCenter/setting","pages/userCenter/subAccounter","pages/userCenter/addSub","pages/capital/shangzhijilu","pages/index/tixian","pages/index/fazhuan","pages/capital/initStore","pages/capital/money","pages/storeMarket/storeMarket","pages/capital/energyPool","pages/capital/dongliyuan","pages/capital/dongliA","pages/capital/dongliB","pages/capital/dongliC","pages/ecological/ecological","pages/userCenter/identityManage","pages/userCenter/shoukuanma","pages/userCenter/addressBook","pages/userCenter/createAddress","pages/storeMarket/myOrder","pages/storeMarket/dealDetail","pages/userCenter/secureCenter/secureCenter","pages/userCenter/secureCenter/bindEmail","pages/userCenter/secureCenter/modifyLoginPass","pages/userCenter/secureCenter/modiPayPass","pages/userCenter/about","pages/userCenter/outKey","pages/userCenter/outPublic","pages/userCenter/outWords","pages/index/detailBulletin","pages/userCenter/setIcon","pages/userCenter/payMode","pages/userCenter/secureCenter/bindPhone","pages/usdfDeal/orderList","pages/usdfDeal/orderRecord","pages/userCenter/editPayAddress","pages/ecological/createMessage","pages/ecological/messageList","pages/register/leadingWords","pages/index/activeSubAccounter","pages/chongzhi/createCharge","pages/chongzhi/chargeList","pages/ecological/thirdPlat","pages/ecological/thirdWallet"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"","navigationBarBackgroundColor":"#091224","backgroundColor":"white"},"tabBar":{"color":"#454e61","selectedColor":"#2f7294","borderStyle":"white","backgroundColor":"#010715","list":[{"pagePath":"pages/index/index","iconPath":"static/tab/home.png","selectedIconPath":"static/tab/homes.png","text":"首页"},{"pagePath":"pages/ecological/ecological","iconPath":"static/tab/eco.png","selectedIconPath":"static/tab/ecos.png","text":"生态建设"},{"pagePath":"pages/storeMarket/storeMarket","iconPath":"static/tab/trade.png","selectedIconPath":"static/tab/trades.png","text":"熵值交易"},{"pagePath":"pages/userCenter/userCenter","iconPath":"static/tab/mine.png","selectedIconPath":"static/tab/mines.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"ECFPro","compilerVersion":"2.8.6","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/usdfDeal/hall","meta":{},"window":{"navigationBarTitleText":"USDF交易"}},{"path":"/pages/usdfDeal/buySellUsdf","meta":{},"window":{"navigationBarTitleText":"發佈掛單"}},{"path":"/pages/userCenter/share","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/capital/zhuliyuan","meta":{},"window":{"navigationBarTitleText":"助力源"}},{"path":"/pages/register/login","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/index/wallet","meta":{},"window":{"navigationBarTitleText":"資產錢包"}},{"path":"/pages/index/buyStore","meta":{},"window":{"navigationBarTitleText":"初始源認購","titleNView":{"buttons":[{"float":"right","fontSize":"14px","text":"規則"}]}}},{"path":"/pages/team/team","meta":{},"window":{"navigationBarTitleText":"節點關係"}},{"path":"/pages/index/activeAccounter","meta":{},"window":{"navigationBarTitleText":"激活賬戶"}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"創建錢包"}},{"path":"/pages/register/wordsConfirm","meta":{},"window":{"navigationBarTitleText":"確認助記詞"}},{"path":"/pages/userCenter/myTeam","meta":{},"window":{"navigationBarTitleText":"我的團隊","titleNView":{"buttons":[{"float":"right","fontSize":"14px","text":"收益"}]}}},{"path":"/pages/userCenter/userCenter","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/register/startLogin","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/register/zhujiciBack","meta":{},"window":{"navigationBarTitleText":"備份助記詞"}},{"path":"/pages/userCenter/setting","meta":{},"window":{"navigationBarTitleText":"設置"}},{"path":"/pages/userCenter/subAccounter","meta":{},"window":{"navigationBarTitleText":"子賬戶"}},{"path":"/pages/userCenter/addSub","meta":{},"window":{"navigationBarTitleText":"創建子賬戶"}},{"path":"/pages/capital/shangzhijilu","meta":{},"window":{"navigationBarTitleText":"熵值"}},{"path":"/pages/index/tixian","meta":{},"window":{"navigationBarTitleText":"提幣"}},{"path":"/pages/index/fazhuan","meta":{},"window":{"navigationBarTitleText":"劃轉"}},{"path":"/pages/capital/initStore","meta":{},"window":{"navigationBarTitleText":"初始源"}},{"path":"/pages/capital/money","meta":{},"window":{"navigationBarTitleText":"USDF"}},{"path":"/pages/storeMarket/storeMarket","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"熵值交易"}},{"path":"/pages/capital/energyPool","meta":{},"window":{"navigationBarTitleText":"儲能池"}},{"path":"/pages/capital/dongliyuan","meta":{},"window":{"navigationBarTitleText":"動力源"}},{"path":"/pages/capital/dongliA","meta":{},"window":{"navigationBarTitleText":"動力A"}},{"path":"/pages/capital/dongliB","meta":{},"window":{"navigationBarTitleText":"動力B"}},{"path":"/pages/capital/dongliC","meta":{},"window":{"navigationBarTitleText":"動力C"}},{"path":"/pages/ecological/ecological","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/userCenter/identityManage","meta":{},"window":{}},{"path":"/pages/userCenter/shoukuanma","meta":{},"window":{"navigationBarTitleText":"收款碼"}},{"path":"/pages/userCenter/addressBook","meta":{},"window":{"navigationBarTitleText":"地址本","titleNView":{"buttons":[{"float":"right","fontSize":"14px","text":"新建"}]}}},{"path":"/pages/userCenter/createAddress","meta":{},"window":{}},{"path":"/pages/storeMarket/myOrder","meta":{},"window":{"navigationBarTitleText":"我的訂單"}},{"path":"/pages/storeMarket/dealDetail","meta":{},"window":{"navigationBarTitleText":"成交明細"}},{"path":"/pages/userCenter/secureCenter/secureCenter","meta":{},"window":{"navigationBarTitleText":"安全中心"}},{"path":"/pages/userCenter/secureCenter/bindEmail","meta":{},"window":{"navigationBarTitleText":"郵箱綁定"}},{"path":"/pages/userCenter/secureCenter/modifyLoginPass","meta":{},"window":{"navigationBarTitleText":"密碼設置"}},{"path":"/pages/userCenter/secureCenter/modiPayPass","meta":{},"window":{"navigationBarTitleText":"支付密碼設置"}},{"path":"/pages/userCenter/about","meta":{},"window":{"navigationBarTitleText":"關於我們"}},{"path":"/pages/userCenter/outKey","meta":{},"window":{"navigationBarTitleText":"導出私鑰"}},{"path":"/pages/userCenter/outPublic","meta":{},"window":{"navigationBarTitleText":"導出KeyStore"}},{"path":"/pages/userCenter/outWords","meta":{},"window":{"navigationBarTitleText":"導出助記詞"}},{"path":"/pages/index/detailBulletin","meta":{},"window":{"navigationBarTitleText":"公告"}},{"path":"/pages/userCenter/setIcon","meta":{},"window":{"navigationBarTitleText":"修改"}},{"path":"/pages/userCenter/payMode","meta":{},"window":{"navigationBarTitleText":"收款方式"}},{"path":"/pages/userCenter/secureCenter/bindPhone","meta":{},"window":{"navigationBarTitleText":"手機綁定"}},{"path":"/pages/usdfDeal/orderList","meta":{},"window":{"navigationBarTitleText":"我的掛單"}},{"path":"/pages/usdfDeal/orderRecord","meta":{},"window":{"navigationBarTitleText":"訂單記錄"}},{"path":"/pages/userCenter/editPayAddress","meta":{},"window":{"navigationBarTitleText":"修改"}},{"path":"/pages/ecological/createMessage","meta":{},"window":{"navigationBarTitleText":"聯繫客服","titleNView":{"buttons":[{"float":"right","fontSize":"14px","text":"消息"}]}}},{"path":"/pages/ecological/messageList","meta":{},"window":{"navigationBarTitleText":"消息中心"}},{"path":"/pages/register/leadingWords","meta":{},"window":{"navigationBarTitleText":"導入身份"}},{"path":"/pages/index/activeSubAccounter","meta":{},"window":{"navigationBarTitleText":"激活賬戶"}},{"path":"/pages/chongzhi/createCharge","meta":{},"window":{"navigationBarTitleText":"USDF兌換","titleNView":{"buttons":[{"float":"right","fontSize":"14px","text":"記錄"}]}}},{"path":"/pages/chongzhi/chargeList","meta":{},"window":{"navigationBarTitleText":"兌換記錄"}},{"path":"/pages/ecological/thirdPlat","meta":{},"window":{"navigationBarTitleText":"第三方平臺"}},{"path":"/pages/ecological/thirdWallet","meta":{},"window":{"navigationBarTitleText":"第三方錢包"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
