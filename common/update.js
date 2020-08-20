// import { domain, version } from '@/config.js'
import { cn, hk, en, ko, ru, ja} from './language/update/index.js'
let lang = cn

var UpdateVersion = function (){
	// this.version = version
	// this.updateApi = `${domain}/api/config`
	// const langText = uni.getStorageSync('lang')
	const langArr = {'zh-hk': hk, 'zh-cn': cn, 'en-us': en, 'ko-kr': ko, 'ru-ru': ru, 'ja-jp': ja}
	lang = langArr[langText]
	lang = lang || hk
	
}

UpdateVersion.prototype = {
	//版本号对比, curV 大于 reqV返回true
	compare: function(curV, reqV){
		if(curV && reqV){
	      //将两个版本号拆成数字
	      var arr1 = curV.split('.'),
	          arr2 = reqV.split('.');
	      var minLength = Math.min(arr1.length, arr2.length),
	          position = 0,
	          diff = 0;
	      //依次比较版本号每一位大小，当对比得出结果后跳出循环
	      while(position < minLength && ((diff=parseInt(arr1[position]) - parseInt(arr2[position])) == 0)){
	          position++;
	      }
	      diff = (diff!=0) ? diff : (arr1.length-arr2.length);
	      return diff > 0;
		}else{
	      console.log('版本号不能为空');
	      return false;
	   }
	},
	//热更新检测
	getNewData: function(type){
		var _this = this
		if(plus && plus.runtime.appid != 'HBuilder' || true){
			uni.request({
				url: _this.updateApi,
				method: 'GET',
				success: (res)=>{
					var res = res.data.data
					if(_this.compare(res.version, _this.version)){
						//弹出更新提示
						 //version 最新版的版本号
						 //download_url 最新版的热更新地址
						 //force_update 是否强制更新
						if(!/\.wgt$/.test(res.download_url)){
							var downUrl = res.download_url
							_this.alertUpdateTips(res.download_url, res.force_update, 1)
						}else{
							_this.alertUpdateTips(res.download_url, res.force_update)
						}
					}else{
						if(type){
							plus.nativeUI.toast(lang.currentVersionTip)
						}
					} 
				}
			})
		}else{
			console.log('当前环境不检测版本')
			if(type){
				uni.showToast({
					title: lang.currentVersionTip,
					icon: 'none'
				})
			}
		}
	},
	//弹出更新提示
	alertUpdateTips: function(url, forced_update, isDownloadPack){
		var _this = this
		if(forced_update == '1'){
			plus.nativeUI.alert(lang.updateAlert, function(){
				isDownloadPack ? (_this.updatePackage(url)) : (_this.downloadPack(url))
			}, lang.tipBtn, lang.tipBtn2);
		}else{
			plus.nativeUI.confirm(lang.updateInquiry, function(e){
				if(e.index == 0){
					//下载安装包
					isDownloadPack ? (_this.updatePackage(url)) : (_this.downloadPack(url))
				}
			}, lang.tipbtn3, [lang.confirm, lang.cancel])
		}
	},
	//下载安装包
	downloadPack: function(url){
		var _this = this
		var w = plus.nativeUI.showWaiting(lang.downloading);
		var totalSize = 0
		console.log('hefhef')
		var dtask = plus.downloader.createDownload(url, { method: 'GET', filename: '_downloads/'},function(d,status){
			
			plus.nativeUI.closeWaiting();
			if(status == 200){
				_this.installPack(d.filename);
			}else{//下载失败
				plus.nativeUI.closeWaiting();
				plus.nativeUI.toast(lang.downloadFail);
			}
		});
		dtask.addEventListener("statechanged", function(download, status){
			if(download.state == 2){
				totalSize = download.totalSize
				totalSize = Math.round(parseInt(totalSize) / (1024 * 1024 / 100)) / 100
			}
	    	if(download.state == 3 && download.totalSize){
				//已下载 download.downloadedSize
				//任务大小 download.totalSize
				totalSize = download.totalSize
				totalSize = Math.round(parseInt(totalSize) / (1024 * 1024 / 100)) / 100
	    		var ds = Math.round(parseInt(download.downloadedSize) / (1024 * 1024 / 100)) / 100
				if(ds && totalSize){
					w.setTitle(`${lang.updateProgress}:${ds}M/${totalSize}M`);
				}
	    	}
	    }, false);
		dtask.start();
	},
	//安装
	installPack: function(path){
		var _this = this
		plus.nativeUI.showWaiting(lang.installing);
		plus.runtime.install(path,{},function(){
			plus.nativeUI.closeWaiting();
			_this.tipReload()
		},function(e){
			plus.nativeUI.closeWaiting();
			plus.nativeUI.toast(lang.installFail)
		});
	},
	//提示重启
	tipReload: function(){
		if(plus.os.name == 'Android'){
			plus.nativeUI.alert(lang.updateSuccess1, function(e){
				if(e.index == 0){
					plus.runtime.restart();
		        }
			}, lang.reloadTip, lang.nowReload)
		}else{
			plus.nativeUI.alert(lang.updateSuccess2);	
		}
	},
	//整包更新
	updatePackage (url){
		if(/\.apk$/.test(url)){
			this.downloadPack(url)
		}else{
			plus.runtime.openURL(url)
		}
	}
}

export default UpdateVersion