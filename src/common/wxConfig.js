/**微信公众号信息*/
const WEI_XING_CONFIG_APPID = 'wx1dde4a7ae37770a7';
import { isArray } from  './common';
/**
 * @name JS-SDK 配置
 * @param jsApiList 必填，需要使用的JS接口列表
 * @desc jsApiList.option
 */
 const wx = window.wx;
class weChatConfig {
	constructor() {
		this.appId = WEI_XING_CONFIG_APPID; /**公众号addpid */
		this.AllMenuList = [
			"menuItem:share:appMessage", //发送给朋友
			"menuItem:share:timeline", // 分享到朋友圈
			"menuItem:share:qq", // 分享到QQ
			"menuItem:share:weiboApp", // 分享到Weibo
			"menuItem:favorite", // 收藏
			"menuItem:share:facebook", // 分享到FB
			"menuItem:share:QZone", // 分享到 QQ 空间
			"menuItem:editTag", // 编辑标签
			"menuItem:delete", // 删除
			"menuItem:copyUrl", // 复制链接
			"menuItem:originPage", // 原网页
			"menuItem:readMode", // 阅读模式
			"menuItem:openWithQQBrowser", // 在QQ浏览器中打开
			"menuItem:openWithSafari", // 在Safari中打开
			"menuItem:share:email", // 邮件
			"menuItem:share:brand", // 一些特殊公众号
		]
	}

	/** 注册 */
	config(params, success) {
		/**config接口权限验证配置 */
		const configInfo = {
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: params.appId, // 必填，公众号的唯一标识
			timestamp: params.timestamp, // 必填，生成签名的时间戳
			nonceStr: params.nonceStr, // 必填，生成签名的随机串
			signature: params.signature,// 必填，签名
			jsApiList: [ // 必填，需要使用的JS接口列表
				'chooseImage', 
				'getNetworkType', 
				'openLocation',
				'getLocation',
				'closeWindow',
				'uploadImage',
				'hideMenuItems',
				'scanQRCode',
				'previewImage',
				'getLocalImgData',
				'chooseWXPay',
				'ready',
				'updateAppMessageShareData',
				'updateTimelineShareData',
				'onMenuShareWeibo',
				'onMenuShareQZone',
				'startRecord',
				'stopRecord',
				'onVoiceRecordEnd',
				'playVoice',
				'pauseVoice',
				'stopVoice',
				'onVoicePlayEnd',
				'uploadVoice',
				'downloadVoice',
				'downloadImage',
				'translateVoice',
				'hideOptionMenu',
				'showOptionMenu',
				'showMenuItems',
				'hideAllNonBaseMenuItem',
				'showAllNonBaseMenuItem',
				'openProductSpecificView',
				'addCard',
				'chooseCard',
				'openCard',
				'openAddress',
			],
			openTagList: ['wx-open-launch-weapp', 'wx-open-launch-app','wx-open-subscribe', 'wx-open-audio'] /**开放标签 */
		}
		this.configInfo = configInfo;
		/** 附录3-所有菜单项列表 */
		
		/**通过config接口注入权限验证配置 */
		wx.config(configInfo);

		/**通过ready接口处理成功验证 */
		wx.ready(function(){
			// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			wx.checkJsApi({
				jsApiList: [	
					'updateAppMessageShareData', 
					'updateTimelineShareData',
					'onMenuShareWeibo',
					'onMenuShareQZone',
					'startRecord',
					'stopRecord',
					'onVoiceRecordEnd',
					'playVoice',
					'pauseVoice',
					'stopVoice',
					'onVoicePlayEnd',
					'uploadVoice',
					'downloadVoice',
					'chooseImage',
					'previewImage',
					'uploadImage',
					'downloadImage',
					'translateVoice',
					'getNetworkType',
					'openLocation',
					'getLocation',
					'hideOptionMenu',
					'showOptionMenu',
					'hideMenuItems',
					'showMenuItems',  
					'hideAllNonBaseMenuItem',
					'showAllNonBaseMenuItem',
					'closeWindow',
					'scanQRCode',
					'chooseWXPay',
					'openProductSpecificView',
					'addCard',
					'chooseCard',
					'openCard',
					'openAddress',

				], // 需要检测的JS接口列表，所有JS接口列表见附录2,
				success: function (res) {
					console.log('可用',res)
				},
				fail: (err) => {
					console.log(err, '不可用')
				}
			});
			if(success) success();
		});

		/**通过error接口处理失败验证 */
		wx.error(function(res){
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			console.error('验证失败', res);
		});
	}

	/**校验菜单是否存在 */
	static everyMenuList(target = []) {
		const AllMenuList = new weChatConfig().AllMenuList;
		try {
			if(isArray(target)) {
				let result =  target.every(item => AllMenuList.includes(item));
				if(!result) {
					console.error('菜单按钮不在范围内');
					console.log('菜单范围：', AllMenuList)
				} 
				return result;
			} else {
				console.error('参数为Array数据类型');
			}
		} catch(error) {
			console.error(error);
			return false;
		}
	}

	/**
	 * @网页授权 
	 * @description 由于授权操作安全等级较高，所以在发起授权请求时，微信会对授权链接做正则强匹配校验，如果链接的参数顺序不对，授权页面将无法正常访问
	 * @param {String} appid  公众号的唯一标识
	 * @param {String} redirect_uri   授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
	 * @param {String|'snsapi_base'|'snsapi_userinfo'} scope   应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
	 * @param {String} state 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
	 * */
	authorize(params = {appId: 'wx1dde4a7ae37770a7', redirect_uri: location.href, scope: 'snsapi_userinfo', state:''}) {
		const url = encodeURIComponent(params.redirect_uri);
		window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${params.appId}&redirect_uri=${url}&response_type=code&scope=${params.scope}&state=${params.state}#wechat_redirect`)
	}
	/**基础接口 */
	/**
	 * @name 判断当前客户端版本是否支持指定JS接口
	 * @description 微信授权之后调用 以键值对的形式返回，可用的api值true，不可用为false
	 * @param {Array} jsApiList JS接口列表
	 * */
	checkJsApi({jsApiList = this.configInfo.jsApiList, success}) {
		wx.checkJsApi({
			jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
			success: function(res) {
				if(success) success(res);
			}
		});
	}

	/**分享接口 */
	/**
	 * @name 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
	 * @description 需在用户可能点击分享按钮前就先调用
	 * @param {String} title  分享标题
	 * @param {String} desc   分享描述
	 * @param {String} link   分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	 * @param {String} imgUrl 分享图标
	 * @param {Function} success 设置成功回调
	 * */
	updateAppMessageShareData({ title, desc, url, imgUrl, success}) {        
		wx.ready(function () {
			/** 1.4.0*/
			wx.updateAppMessageShareData({ 
				title,
				desc, 
				link: url, 
				imgUrl, 
				success: function () {
					try {
						if(success) success();
					} catch(err) {
						console.log('success数据类型错误，请检查');
						console.error(err);
					}
				}
			})
		}); 
	}

	/**
	 * @name 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0)
	 * @description 需在用户可能点击分享按钮前就先调用
	 * @param {String} title  分享标题
	 * @param {String} link   分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	 * @param {String} imgUrl 分享图标
	 * @param {Function} success 设置成功回调
	 * */
	updateTimelineShareData({ title, url, imgUrl, success}) {
		wx.ready(function () {
			wx.updateTimelineShareData({ 
				title,
				link: url, 
				imgUrl, 
				success: function () {
					try {
						if(success) success();
					} catch(err) {
						console.log('success数据类型错误，请检查');
						console.error(err);
					}
				}
			})
		}); 
	}

	/**
	 * @name 获取“分享到微博”按钮点击状态及自定义分享内容接口
	 * @description 需在用户可能点击分享按钮前就先调用
	 * @param {String} title  分享标题
	 * @param {String} link   分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	 * @param {String} imgUrl 分享图标
	 * @param {Function} success 用户确认分享后执行的回调函数
	 * @param {Function} cancel 用户确认分享后执行的回调函数
	 * */
	onMenuShareWeibo({ title, url, desc, imgUrl, success, cancel}) {
		wx.onMenuShareWeibo({
			title,
			link:url, 
			imgUrl, 
			desc,
			success: function () { /**用户确认分享后执行的回调函数 */
				try {
					if(success) success();
				} catch(err) {
					console.log('success数据类型错误，请检查');
					console.error(err);
				}
			},
			cancel: function () { /**用户取消分享后执行的回调函数 */
				try {
					if(cancel) cancel();
				} catch(err) {
					console.log('cancel数据类型错误，请检查');
					console.error(err);
				}
			}
		}); 
	}

	/**图像接口 */

	/**
	 * @name 拍照或从手机相册中选图接口
	 * @param {Number|9} count  可选张数 默认9
	 * @param {Array|['original', 'compressed']} sizeType   可以指定是原图还是压缩图，默认二者都有
	 * @param {Array|['album', 'camera']} sourceType 可以指定来源是相册还是相机，默认二者都有
	 * @param {Function} success 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
 * */
	chooseImage({count = 9, sizeType=['original', 'compressed'], sourceType=['album', 'camera'], success}) {
		let result;
		wx.chooseImage({
			count, 
			sizeType, 
			sourceType, 
			success: function (res) {
				try {
					if(success) success(res.localIds);
					result = res.localIds;
				} catch(err) {
					console.error(err);
					result = res.localIds;
				}
			}
		});
		return  result;
	}

	/**
	 * @name 预览图片接口
	 * @param {String} current  当前显示图片的http链接
	 * @param {Array}  urls    需要预览的图片http链接列表
 	* */
	previewImage({current, urls}) {
		wx.previewImage({
			current, 
			urls, 
		}); 
	}

	/**
	 * @name 上传图片接口
	 * @description 需要上传的图片的本地ID，由chooseImage接口获得
	 * @param {String} localId  需要上传的图片的本地ID，由chooseImage接口获得
	 * @param {Numbr|1}  isShowProgressTips     默认为1，显示进度提示
	 * @param {Function} success 返回图片的服务器端ID
 	* */
	uploadImage({localId, isShowProgressTips, success}) {
		console.log({localId, isShowProgressTips, success});
		let result;
		wx.uploadImage({
			localId,
			isShowProgressTips,
			success: function (res) {
				try{
					if(success) success(res.serverId);
					result = res.serverId;
				} catch(err) {
					console.error(err);
					result = res.serverId;
				}
			}
		});
		return  result;
	}

	/**
	 * @name 下载图片接口
	 * @description 需要下载的图片的服务器端ID，由uploadImage接口获得
	 * @param {String} serverId  需要上传的图片的本地ID，由chooseImage接口获得
	 * @param {Numbr|1}  isShowProgressTips     默认为1，显示进度提示
	 * @param {Function} success 返回图片下载后的本地ID
 	* */
	downloadImage({serverId, isShowProgressTips = 1, success}) {
		let result;
		wx.downloadImage({
			serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
			isShowProgressTips, // 默认为1，显示进度提示
			success: function (res) {
				try{
					if(success) success(res.localId);
					result = res.localId;
				} catch(err) {
					console.error(err);
					result = res.localId;
				}
			}
		}); 
		return  result;
	}

	/**
	 * @name 获取本地图片接口
	 * @description 此接口仅在 iOS WKWebview 下提供，用于兼容 iOS WKWebview 不支持 localId 直接显示图片的问题。具体可参考link
	 * @link https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/iOS_WKWebview.html
	 * @param {String} localId  图片的localID
	 * @param {Function} success  返回：localData是图片的base64数据，可以用img标签显示
 	* */
	getLocalImgData({localId, success}) {
		let result;
		wx.getLocalImgData({
			localId, // 图片的localID
			success: function (res) {
				try{
					if(success) success(res.localData);
					result = res.localData;
				} catch(err) {
					console.error(err);
					result = res.localData;
				}
			}
		});
		return  result;
	}

	/**地理位置 */

	/**
	 * @name 使用微信内置地图查看位置接口
	 * @param {Number} localId  纬度，浮点数，范围为90 ~ -90
	 * @param {Number} longitude  经度，浮点数，范围为180 ~ -180。
	 * @param {String} name  位置名
	 * @param {String} address  地址详情说明
	 * @param {Number|20} scale  地图缩放级别,整型值,范围从1~28。默认为最大
	 * @param {String} infoUrl  在查看位置界面底部显示的超链接,可点击跳转
 	* */
	openLocation({latitude,longitude,name,address,scale = 20,infoUrl}) {
		wx.openLocation({
			latitude, 
			longitude, 
			name, 
			address,
			scale, 
			infoUrl
		});
	}

	/**
	 * @name 获取地理位置接口
	 * @description  默认为wgs84坐标
	 * @param {String} type   默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
	 * @param {Function} success  返回：位置详情
	 * @return {Object}}  位置详情： latitude 纬度，浮点数，范围为90 ~ -90 | longitude 经度，浮点数，范围为180 ~ -180。 | speed 速度，以米/每秒计 | accuracy 位置精度
 	* */
	getLocation({type = 'wgs84', success}) {
		let result;
		wx.getLocation({
			type, 
			success: function (res) {
				try{
					if(success) success(res);
					result = res;
				} catch(err) {
					console.error(err);
					result = res;
				}
			}
		});
		return  result;
	}

	/**界面操作 */

	/**
	 * @name 关闭当前网页窗口接口
	 * */
	closeWindow() {
		wx.closeWindow();
	}

	/**
	 * @name 批量隐藏功能按钮接口
	 * @param {Array} menuList 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
 	* */
	hideMenuItems(menuList) {
		if(weChatConfig.everyMenuList(menuList)) {
			wx.hideMenuItems({
				menuList
			});
		}
	}

	/**
	 * @name 批量显示功能按钮接口
	 * @param {Array} menuList 要显示的菜单项，只能显示“传播类”和“保护类”按钮，所有menu项见附录3
 	* */
	showMenuItems(menuList) {
		if(weChatConfig.everyMenuList(menuList)) {
			wx.showMenuItems({
				menuList
			});
		}
	}

	/**
	 * @name 隐藏所有非基础按钮接口
 	* */
	hideAllNonBaseMenuItem() {
		wx.hideAllNonBaseMenuItem();
	}

	/**
	 * @name 显示所有功能按钮接口
 	* */
	showAllNonBaseMenuItem() {
		wx.showAllNonBaseMenuItem();
	}

	/**设备信息 */

	/**
	 * @name 获取网络状态接口
	 * @return {String} 返回网络类型2g，3g，4g，wifi
	 * */
	getNetworkType({success}) {
		let result;
		wx.getNetworkType({
			success: function (res) {
				try{
					if(success) success(res.networkType);
					result = res.networkType;
				} catch(err) {
					result = res.networkType;
					console.error(err);
				}
			}
		});
		return result;
	}

	/**
	 * @name 调起微信扫一扫接口
	 * @param {Number|0} needResult 默认为0，扫描结果由微信处理，1则直接返回扫描结果
	 * @param {Array|["qrCode","barCode"]} scanType 可以指定扫二维码还是一维码，默认二者都有
	 * @param {Function} success 当needResult 为 1 时，扫码返回的结果
 	* */
	scanQRCode({needResult= 0, scanType=["qrCode","barCode"] , success}) {
		wx.scanQRCode({
			needResult: needResult,
			scanType: scanType,
			success: function (res) {
				try{
					if(success) success(res.resultStr);
				} catch(err) {
					console.error(err);
				}
			}
		});
	}

	/**微信支付 */

	/**
	 * @name 发起一个微信支付请求
	 * @param {Number|0} timestamp 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
	 * @param {String} nonceStr 支付签名随机串，不长于 32 位
	 * @param {String} package 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
	 * @param {String} signType 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致
	 * @param {String} paySign 支付签名
	 * @param {Function} success 支付成功后的回调函数
	 * @param {Function} cancel 取消支付回调函数
	 * @param {Function} fail 支付失败回调函数
 	* */
	chooseWXPay({appId, timeStamp, nonceStr, packages,  signType, paySign, success, cancel, fail}) {
		wx.chooseWXPay({
			appId,
            timeStamp, 
            nonceStr,
            package: packages,
            signType,
            paySign: paySign,
			success: function (res) {
				if(res.err_msg == "get_brand_wcpay_request:ok" ){ /**使用以上方式判断前端返回,微信团队郑重提示： res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠*/
					if(success) success(res);
				} else  {
					if(success) fail(res);
				}
			},
			cancel: function (res) {
				if(cancel) cancel(res);
			},
			fail: function (res) {
				if(success) fail(res);
			},

		});
		if (typeof WeixinJSBridge == "undefined"){
			if( document.addEventListener ){
				document.addEventListener('WeixinJSBridgeReady', weChatConfig.chooseWXPay, false);
			}else if (document.attachEvent){
				document.attachEvent('WeixinJSBridgeReady', weChatConfig.chooseWXPay); 
				document.attachEvent('onWeixinJSBridgeReady', weChatConfig.chooseWXPay);
			}
		}else{
			weChatConfig.chooseWXPay();
		}
	}

	/**
	 * @name 共享收货地址接口
	 * @param {Function} success 返回微信收货地址信息
 	* */
	openAddress({success}) {
		wx.openAddress({
			success: function (res) {
				try{
					if(success) success({
						userName: res.userName, // 收货人姓名
						postalCode:res.postalCode, // 邮编
						provinceName:res.provinceName, // 国标收货地址第一级地址（省）
						cityName:res.cityName, // 国标收货地址第二级地址（市）
						countryName:res.countryName, // 国标收货地址第三级地址（国家）
						detailInfo:res.detailInfo, // 详细收货地址信息
						nationalCode:res.nationalCode, // 收货地址国家码
						telNumber:res.telNumber, // 收货人手机号码
					});
				} catch(err) {
					console.error(err);
				}
			}
		});
	}

	/** 音频接口 */

	/**
	 * @name 开始录音接口
 	* */
	startRecord() {
		wx.startRecord();
	}

	/**
	 * @name 停止录音接口
	 * @param {Function} success 返回结果接口
 	* */
	stopRecord({success}) {
		wx.stopRecord({
			success: function (res) {
				if(success) success(res.localId)
			}
		});
	}

	/**
	 * @name 监听录音自动停止接口
	 * @param {Function} complete  录音时间超过一分钟没有停止的时候会执行 complete 回调
 	* */
	onVoiceRecordEnd({complete}) {
		wx.onVoiceRecordEnd({
			complete: function (res) {
				if(complete) complete(res.localId)
			}
		});
	}
	/**
	 * @name 播放语音接口
	 * @param {String} localId 需要播放的音频的本地ID，由stopRecord接口获得
 	* */
	playVoice({localId}) {
		wx.playVoice({localId});
	}
	/**
	 * @name 暂停播放接口
	 * @param {String} localId 需要暂停播放的音频的本地ID，由stopRecord接口获得
 	* */
	pauseVoice({localId}) {
		wx.pauseVoice({localId});
	}

	/**
	 * @name 停止播放接口
	 * @param {String} localId 需要停止播放的音频的本地ID，由stopRecord接口获得
 	* */
	stopVoice({localId}) {
		wx.stopRecord({localId});
	}

	/**
	 * @name 监听语音播放完毕接口
	 * @param {Function} success 返回音频的本地ID
 	* */
	onVoicePlayEnd({success}) {
		wx.onVoicePlayEnd({
			success: function (res) {
				if(success) success(res.localId);
			}
		});
	}

	/**
	 * @name 上传语音接口
	 * @param {String} localId 需要上传的音频的本地ID，由stopRecord接口获得
	 * @param {String} isShowProgressTips  默认为1，显示进度提示
	 * @param {Function} success 返回音频的服务器端ID
 	* */
	uploadVoice({localId, isShowProgressTips = 1, success}) {
		wx.uploadVoice({
			localId, // 
			isShowProgressTips: isShowProgressTips,
			success: function (res) {
				if(success) success(res.serverId);
			}
		});
	}

	/**
	 * @name 下载语音接口
	 * @param {String} serverId 需要上传的音频的本地ID，由stopRecord接口获得
	 * @param {String} isShowProgressTips  默认为1，显示进度提示
	 * @param {Function} success 返回返回音频的本地ID
 	* */
	downloadVoice({serverId, isShowProgressTips = 1, success}) {
		wx.downloadVoice({
			serverId,
			isShowProgressTips,
			success: function (res) {
				if(success) success(res.localId);
			}
		});
	}

	/**
	 * @name 识别音频并返回识别结果接口
	 * @param {String} localId 需要识别的音频的本地Id，由录音相关接口获得
	 * @param {String} isShowProgressTips  默认为1，显示进度提示
	 * @param {Function} success 语音识别的结果
 	* */
	translateVoice({localId, isShowProgressTips = 1, success}) {
		wx.translateVoice({
			localId,
			isShowProgressTips,
			success: function (res) {
				if(success) success(res.translateResult);
			}
		})
	}
	
}
export default new weChatConfig();