### JS_SDK说明文档

- #### **jsApiList[^1]**
| **`api`**                       |       **Description**      |
| :---:                           |       :---:           |
| `checkJsApi`                    |       判断当前客户端版本是否支持指定JS接口                |
| `updateAppMessageShareData`     |       自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）                  |
| `updateTimelineShareData`       |       自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）                |
| `onMenuShareWeibo`              |       获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口                       |
| `chooseImage`                   |       拍照或从手机相册中选图接口                   |
| `previewImage`                  |       预览图片接口                  |
| `uploadImage`                   |       上传图片接口                  |
| `downloadImage`                 |       下载图片接口                  |
| `getLocalImgData`               |       获取本地图片接口                    |
| `startRecord`                   |       开始录音接口                |
| `stopRecord`                    |       停止录音接口                    |
| `onVoiceRecordEnd`              |       监听录音自动停止接口                     |
| `playVoice`                     |       播放语音接口               |
| `pauseVoice`                    |       暂停播放接口               |
| `stopVoice`                     |       停止播放接口            |
| `onVoicePlayEnd`                |       监听语音播放完毕接口                   |
| `uploadVoice`                   |       上传语音接口           |
| `downloadVoice`                 |       下载语音接口             |
| `translateVoice`                |       识别音频并返回识别结果接口              |
| `getNetworkType`                |       获取网络状态接口               |
| `openLocation`                  |       使用微信内置地图查看位置接口              |
| `getLocation`                   |       获取地理位置接口               |
| `closeWindow`                   |       关闭当前网页窗口接口            |
| `hideMenuItems`                 |       批量隐藏功能按钮接口            |
| `showMenuItems`                 |       批量显示功能按钮接口           |
| `hideAllNonBaseMenuItem`        |       隐藏所有非基础按钮接口                 |
| `showAllNonBaseMenuItem`        |       显示所有功能按钮接口               |
| `scanQRCode`                    |       调起微信扫一扫接口               |
| `chooseWXPay`                   |       发起一个微信支付请求            |
| `openAddress`                   |       共享收货地址接口                  |

<br/>

#### 接口调用说明:capital_abcd:



##### 1.  基础接口
  - :判断当前客户端版本是否支持指定JS接口
    ````JavaScript
        weChatConfig.checkJsApi({
            jsApiList: ['chooseImage'], /**需要检测的JS接口列表，所有JS接口列表见上表*/ ,
            success: function(res) {
               console.log('可用',res);
            }
        });
    ````

##### 2.  分享接口
  - 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
     ````JavaScript
        /**需在用户可能点击分享按钮前就先调用*/
        weChatConfig.updateAppMessageShareData({ 
            title: '', /**分享标题*/ 
            desc: '', /**分享描述*/ 
            link: '', /**分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致*/ 
            imgUrl: '', /**分享图标*/ 
            success: function () {
                /**设置成功*/
            }
        });
    ````

  - 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
     ````JavaScript
        /**需在用户可能点击分享按钮前就先调用*/
        weChatConfig.updateTimelineShareData({ 
            title: '', /**分享标题*/ 
            link: '', /**分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致*/ 
            imgUrl: '', /**分享图标*/ 
            success: function () {
                /**设置成功*/
            }
        });
    ````

  - 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
     ````JavaScript
        /**需在用户可能点击分享按钮前就先调用*/
        weChatConfig.onMenuShareWeibo({ 
            title: '', /**分享标题*/ 
            desc: '', /**分享描述*/ 
            link: '', /**分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致*/ 
            imgUrl: '', /**分享图标*/ 
            success: function () {
                /**用户确认分享后执行的回调函数*/
            },
            cancel: function () {
                /**用户取消分享后执行的回调函数*/ 
            }
        });
    ````

##### 3.  图像接口
  - 拍照或从手机相册中选图接口
    ````JavaScript
        weChatConfig.chooseImage({ 
            count: 1, /**默认9*/ 
            sizeType: ['original', 'compressed'], /**可以指定是原图还是压缩图，默认二者都有*/ 
            sourceType: ['album', 'camera'], /**可以指定来源是相册还是相机，默认二者都有*/ 
            success: function (res) {
                /**返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片*/ 
            }
        });
    ````

  - 预览图片接口
    ````JavaScript
        weChatConfig.previewImage({ 
            current: '', /**当前显示图片的http链接*/ 
            urls: [] /**需要预览的图片http链接列表*/ 
        });
    ````

  - 上传图片接口
    ````JavaScript
        weChatConfig.uploadImage({ 
            localId: '', /**需要上传的图片的本地ID，由chooseImage接口获得*/ 
            isShowProgressTips: 1, /**默认为1，显示进度提示*/ 
            success: function (res) {
                /**返回图片的服务器端ID*/ 
            }
        });
    ````
    
  - 下载图片接口
    ````JavaScript
        weChatConfig.downloadImage({ 
            serverId: '', /**需要下载的图片的服务器端ID，由uploadImage接口获得*/ 
            isShowProgressTips: 1, /**默认为1，显示进度提示*/ 
            success: function (res) {
                /**返回图片下载后的本地ID*/ 
            };
    ````

  - 获取本地图片接口
    ````JavaScript
        weChatConfig.getLocalImgData({ 
            localId: '', /**图片的localID*/ 
            success: function (res) {
                /**localData是图片的base64数据，可以用img标签显示*/ 
            }
        });
    ````

##### 4. 音频接口
  - 开始录音接口
    ````JavaScript
        weChatConfig.startRecord();
    ````

  - 停止录音接口
    ````JavaScript
        weChatConfig.stopRecord({
            success: function (res) {
                /**返回音频的本地ID*/ 
            }
        });
    ````

  - 监听录音自动停止接口
    ````JavaScript
        weChatConfig.onVoiceRecordEnd({
            /** 录音时间超过一分钟没有停止的时候会执行 complete 回调*/
            complete: function (res) {
               /**返回音频的本地ID*/ 
            }
        });
    ````
  - 播放语音接口
    ````JavaScript
        weChatConfig.playVoice({
            localId: '' /**需要播放的音频的本地ID，由stopRecord接口获得*/ 
        });
    ````

  - 暂停播放接口
    ````JavaScript
        weChatConfig.pauseVoice({
            localId: '' /**需要播放的音频的本地ID，由stopRecord接口获得*/ 
        })
    ````

  - 停止播放接口
    ````JavaScript
        weChatConfig.stopVoice({
            localId: '' /**需要播放的音频的本地ID，由stopRecord接口获得*/ 
        });
    ````

  - 监听语音播放完毕接口
    ````JavaScript
        weChatConfig.onVoicePlayEnd({
            success: function (res) {
                /**返回音频的本地ID*/ 
            }
        });
    ````
  - 上传语音接口(上传语音有效期3天，可用微信多媒体接口下载语音到自己的服务器，此处获得的 serverId 即 media_id，参考文档 .目前多媒体文件下载接口的频率限制为10000次/天，如需要调高频率，请登录微信公众平台，在开发 - 接口权限的列表中，申请提高临时上限。)
     ````JavaScript
            weChatConfig.uploadVoice({
                localId: '', /**需要上传的音频的本地ID，由stopRecord接口获得*/ 
                isShowProgressTips: 1, /**默认为1，显示进度提示*/ 
                success: function (res) {
                    /**返回音频的服务器端ID*/ 
                }
            });
    ````

   - 下载语音接口
        ````JavaScript
            weChatConfig.downloadVoice({
                serverId: '', /**serverId*/ 
                isShowProgressTips: 1, /**默认为1，显示进度提示*/ 
                success: function (res) {
                    /**返回音频的本地ID*/ 
                }
            });
        ````

##### 5. 智能接口(语音转文字)
  - 识别音频并返回识别结果接口
    ````JavaScript
        weChatConfig.translateVoice({
            localId: '', /**需要识别的音频的本地Id，由录音相关接口获得*/ 
            isShowProgressTips: 1, /**默认为1，显示进度提示*/ 
            success: function (res) {
                /**返回语音识别的结果*/ 
            }
        });
    ````

##### 6. 设备信息
  - 获取网络状态接口
    ````JavaScript
        weChatConfig.getNetworkType({
            success: function (res) {
                /**返回网络类型2g，3g，4g，wifi*/ 
            }
        });
    ````

##### 7.  地理位置
  - 使用微信内置地图查看位置接口
    ````JavaScript
        weChatConfig.openLocation({
            latitude: 0, /**纬度，浮点数，范围为90 ~ -90*/ 
            longitude: 0, /**经度，浮点数，范围为180 ~ -180。*/ 
            name: '', /**位置名*/ 
            address: '', /**地址详情说明*/ 
            scale: 1, /**地图缩放级别,整型值,范围从1~28。默认为最大*/ 
            infoUrl: '' /**在查看位置界面底部显示的超链接,可点击跳转*/ 
        });
    ````
  - 获取地理位置接口
    ````JavaScript
        weChatConfig.getLocation({
                type: 'wgs84', /**默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'*/ 
                success: function (res) {
                    /**返回未位置信息*/
                    var latitude = res.latitude; /**纬度，浮点数，范围为90 ~ -90*/ 
                    var longitude = res.longitude; /**经度，浮点数，范围为180 ~ -180*/ 
                    var speed = res.speed; /**速度，以米/每秒计*/ 
                    var accuracy = res.accuracy; /*位置精度**/ 
                }
        });
    ````
##### 8. 界面操作(附录[^2])
  - 关闭当前网页窗口接口
    ````JavaScript
        weChatConfig.closeWindow();
    ````

  - 批量隐藏功能按钮接口
    ````JavaScript
        weChatConfig.hideMenuItems({
            menuList: [] /**要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录*/ 
        });
    ````

  - 批量显示功能按钮接口
    ````JavaScript
        weChatConfig.showMenuItems({
            menuList: [] /**要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录*/ 
        });
    ````

  - 隐藏所有非基础按钮接口
    ````JavaScript
        weChatConfig.hideAllNonBaseMenuItem();
    ````

  - 显示所有功能按钮接口
    ````JavaScript
        weChatConfig.showAllNonBaseMenuItem();
    ````

##### 9. 微信扫一扫
   - 调起微信扫一扫接口
    ````JavaScript
        weChatConfig.scanQRCode({
            needResult: 0, /**默认为0，扫描结果由微信处理，1则直接返回扫描结果，*/ 
            scanType: ["qrCode","barCode"], /**可以指定扫二维码还是一维码，默认二者都有*/ 
            success: function (res) {
                /**当needResult 为 1 时，扫码返回的结果*/ 
            }
        });
    ````

##### 10. 微信支付
  - 发起一个微信支付请求
     ````JavaScript
        weChatConfig.chooseWXPay({
            timestamp: 0, /**支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符*/ 
            nonceStr: '', /**支付签名随机串，不长于 32 位*/ 
            package: '', /**统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）*/ 
            signType: '', /**微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致*/ 
            paySign: '', /**支付签名*/ 
            success: function (res) {
                /**支付成功后的回调函数*/ 
            },
            cancel: function (res) {
                /**支付取消后的回调函数*/ 
            },
            fail: function (res) {
                /**支付失败后的回调函数*/ 
            },
        });
    ````

##### 11. 快速输入
  - 共享微信收货地址
    ````JavaScript
        weChatConfig.openAddress({ 
            success: function (res) {
                /**返回地址详细信息*/
                var userName = res.userName; /**收货人姓名*/ 
                var postalCode = res.postalCode; /**邮编*/ 
                var provinceName = res.provinceName; /**国标收货地址第一级地址（省）*/ 
                var cityName = res.cityName; /**国标收货地址第二级地址（市）*/ 
                var countryName = res.countryName; /**国标收货地址第三级地址（国家）*/ 
                var detailInfo = res.detailInfo; /**详细收货地址信息*/ 
                var nationalCode = res.nationalCode; /**收货地址国家码*/ 
                var telNumber = res.telNumber; /**收货人手机号码*/ 
            }
        });
    ````
[^1]: https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html;

<br/>

[^2]: 附录:  [所有menu项](./MENU.md)