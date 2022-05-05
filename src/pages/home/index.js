import { defineComponent, reactive } from 'vue';
import weChatConfig  from '@common/wxConfig';
import './style.less';

/**已处理 */
const haddleIng = () => {
    alert(`设置分享成功，请使用右上角菜单进行分享！`);
}

/**默认分享文案 */
const defaultShare = {
    title: '微信公众号',
    desc: '微信JS-SDK是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包。通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验',
    url: location.href,
    imgUrl: 'https://yhjstatic.oss-cn-shanghai.aliyuncs.com/avatar/1621590154996-f92acfb2-8997-8e56-d091-e20363cf4864.jpg',
    success: haddleIng
}

export default defineComponent({
    name: 'JSSDK',
    inject: ['haddleToRouter'],
    setup() {
        const state = reactive({
            serverId: [],
            imgList: [],
            audioList: undefined,
            audioServerId: undefined,
        });

        /**判断当前客户端版本是否支持指定JS接口 */
        const checkJsApi = () => {
            weChatConfig.checkJsApi({
                success: (res) => alert(res)
            })
        }

        /**分享功能此处只做演示，实操在app.js文件，请前往查看 */

        /**自定义“分享给朋友”及“分享到QQ”按钮的分享内容 */
        const updateAppMessageShareData = () => {
            weChatConfig.updateAppMessageShareData(defaultShare);
        }

        /**自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容 */
        const updateTimelineShareData = () => {
            weChatConfig.updateTimelineShareData(defaultShare);
        }

        /**获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口 */
        const onMenuShareWeibo = () => {
            weChatConfig.onMenuShareWeibo(defaultShare);
        }

        /**拍照或从手机相册中选图接口 */
        const chooseImage = (sourceType) => {
            weChatConfig.chooseImage({
                count: 9, 
                sizeType: ['original', 'compressed'], 
                sourceType,
                success:  (localIds) => {
                    localIds.forEach(e => getLocalImgData(e));
                }
            });
        }

        /**上传图片接口 */
        const uploadImage = (localId) => {
            if(!state.imgList.length) {
                alert('请先进行选择图片！');
                return;
            }
            console.log('默认只取：imgList第一条数据做演示');
            weChatConfig.uploadImage({
                localId, 
                isShowProgressTips: 1, 
                success:  (serverId) => {
                    state.serverId.push(serverId)
                    alert(serverId);
                }
            });
        }

        /**下载图片接口 */
        const downloadImage = (serverId) => {
            if(!state.serverId.length) {
                alert('请先上传图片！');
                return;
            }
            console.log('默认只取：imgList第一条数据做演示');
            weChatConfig.downloadImage({
                serverId, 
                isShowProgressTips: 1, 
                success: (localId) => {
                    alert(localId);
                }
            })  
        }

        /**获取本地图片接口 */
        const getLocalImgData = (localId) => {
            if(!localId) {
                alert('请先进行选择图片！');
                return;
            }
            /**本地 */
            weChatConfig.getLocalImgData({
                localId, 
                success: (localData) => {
                    state.imgList.push(localData);
                }
            })  
        }

        /**预览图片接口 */
        const previewImage = (current) => {
            if(!state.imgList.length) {
                alert('请先进行选择图片！');
                return;
            }
            weChatConfig.previewImage({
                current, /**当前显示图片的http链接*/ 
                urls: state.imgList  /**需要预览的图片http链接列表*/ 
            });
        }

        /**开始语音接口 */
        const startRecord = () => {
            weChatConfig.startRecord();
        }

        /**停止录音接口 */
        const stopRecord = () => {
            weChatConfig.stopRecord({
                success: (localId) => {
                    state.audioList =  localId;
                }
            });
        }

        /**监听录音自动停止接口 */
        const onVoiceRecordEnd = () => {
            weChatConfig.onVoiceRecordEnd({
                complete: (localId) => {
                    state.audioList =  localId;
                }
            });
        }

        /**播放语音接口 */
        const playVoice = () => {
            if(!state.audioList) {
                alert('请先进行录音！');
                return;
            }
            weChatConfig.playVoice({localId: state.audioList});
        }

        /**暂停播放接口 */
        const pauseVoice = () => {
            if(!state.audioList) {
                alert('请先进行录音！');
                return;
            }
            weChatConfig.pauseVoice({localId: state.audioList});
        }

        /**停止播放接口 */
        const stopVoice = () => {
            if(!state.audioList) {
                alert('请先进行录音！');
                return;
            }
            weChatConfig.stopVoice({localId: state.audioList});
        }

        /**监听语音播放完毕接口 */
        const onVoicePlayEnd = () => {
            weChatConfig.onVoicePlayEnd({
                success: () => {
                    alert(`录音播放完成！`);
                }
            });
        }

        /**上传语音接口 */
        const uploadVoice = () => {
            if(!state.audioList) {
                alert('请先进行录音！');
                return;
            }
            weChatConfig.uploadVoice({
                localId: state.audioList,
                success: (serverId) => {
                    state.audioServerId = serverId;
                    alert(`上传成功${serverId}`);
                }
            });
        }
        /**下载语音接口 */
        const downloadVoice = () => {
            if(!state.audioServerId) {
                alert('请先上传录音！');
                return;
            }
            weChatConfig.downloadVoice({
                serverId: state.audioServerId,
                success: (localId) => {
                    alert(`下载成功${localId}`);
                }
            });
        }

        /** 识别音频并返回识别结果接口*/
        const translateVoice = () => {
            if(!state.audioList) {
                alert('请先进行录音！');
                return;
            }
            weChatConfig.translateVoice({
                localId: state.audioList,
                success: function (translateResult) {
                    alert(translateResult);
                }
            });
        }

        /**使用微信内置地图查看位置接口 */ 
        const openLocation = () => {
            weChatConfig.openLocation({
                latitude: 32.656733,
                longitude: 116.428021,
                name: '安徽省阜阳市颍上县江店孜镇颍凤路关路陈村',
                address: '码农老家', 
                scale: 10, 
                infoUrl: 'https://baike.baidu.com/item/%E6%B1%9F%E5%BA%97%E5%AD%9C%E9%95%87/8100449'
            });
        }

        /**获取地理位置接口 */ 
        const getLocation = () => {
            weChatConfig.getLocation({
                success: ({latitude, longitude}) => {
                  alert(`latitude: ${latitude}, longitude: ${longitude} `)
                }
            });
        }

        /**关闭当前网页窗口接口 */ 
        const closeWindow = () => {
            weChatConfig.closeWindow();
        }

        /**批量隐藏功能按钮接口 */ 
        const hideMenuItems = () => {
            weChatConfig.hideMenuItems([
                "menuItem:editTag", // 编辑标签
                "menuItem:delete", // 删除
                "menuItem:copyUrl", // 复制链接
                "menuItem:originPage", // 原网页
                "menuItem:readMode", // 阅读模式
                "menuItem:share:email", // 邮件
                "menuItem:share:brand", // 一些特殊公众号
            ]);
            /**没有任何回调只作为演示提示 */
            setTimeout(() => alert('操作成功！'),300)
        }

        /**批量显示功能按钮接口 */ 
        const showMenuItems = () => {
            weChatConfig.showMenuItems([
                "menuItem:editTag", // 编辑标签
                "menuItem:delete", // 删除
                "menuItem:copyUrl", // 复制链接
                "menuItem:originPage", // 原网页
                "menuItem:readMode", // 阅读模式
                "menuItem:share:email", // 邮件
                "menuItem:share:brand", // 一些特殊公众号
            ]);
            /**没有任何回调只作为演示提示 */
            setTimeout(() => alert('操作成功！'),300)
        }

        /**隐藏所有非基础按钮接口 */ 
        const hideAllNonBaseMenuItem = () => {
            weChatConfig.hideAllNonBaseMenuItem();
            /**没有任何回调只作为演示提示 */
            setTimeout(() => alert('操作成功！'),300)
        }

        /**显示所有功能按钮接口 */ 
        const showAllNonBaseMenuItem = () => {
            weChatConfig.showAllNonBaseMenuItem();
            /**没有任何回调只作为演示提示 */
            setTimeout(() => alert('操作成功！'),300)
        }

        /**获取网络状态接口 */
        const getNetworkType = () => {
            weChatConfig.getNetworkType({
                success: function (networkType) {
                  alert(`当前网络状态为：${networkType}`)
                }
            });
        }

        /**调起微信扫一扫接口 */
        const scanQRCode = ({needResult, scanType}) => {
            weChatConfig.scanQRCode({
                needResult,
                scanType,
                success: (resultStr) => {
                   alert(resultStr)
                }
            });
        }

        /**共享收货地址接口 */
        const openAddress = () => {
            weChatConfig.openAddress({
                success: (address) => {
                   alert(address)
                }
            });
        }
        
        /**发起一个微信支付请求 */
        const chooseWXPay = () => {
          
            weChatConfig.chooseWXPay({
                success: () => {
                    alert('支付成功！')
                },
                cancel: () => {
                    alert('支付取消！')
                },
                fail: () => {
                    alert('支付失败！')
                },

            });
        }

        /**切换主题模式 */
        const haddleDarkMode = (type) => {
            document.documentElement.removeAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', type);
            alert('切换主题成功！');
        }

        return {
            state,
            checkJsApi,
            
            chooseImage,
            uploadImage,
            downloadImage,
            previewImage,

            updateAppMessageShareData,
            updateTimelineShareData,
            onMenuShareWeibo,

            startRecord,
            stopRecord,
            onVoiceRecordEnd,
            playVoice,
            pauseVoice,
            stopVoice,
            onVoicePlayEnd,
            uploadVoice,
            downloadVoice,

            translateVoice,

            closeWindow,
            hideMenuItems,
            showMenuItems,
            hideAllNonBaseMenuItem,
            showAllNonBaseMenuItem,

            openLocation,
            getLocation,

            getNetworkType,

            scanQRCode,

            openAddress,

            haddleDarkMode,

            chooseWXPay,
        };
    },

    render({
        state: {
            imgList = [],
            serverId =[]
        },

        checkJsApi,

        chooseImage,
        uploadImage,
        downloadImage,
        previewImage,

        updateAppMessageShareData,
        updateTimelineShareData,
        onMenuShareWeibo,

        
        startRecord,
        stopRecord,
        onVoiceRecordEnd,
        playVoice,
        pauseVoice,
        stopVoice,
        onVoicePlayEnd,
        uploadVoice,
        downloadVoice,

        translateVoice,

        openLocation,
        getLocation,

        closeWindow,
        hideMenuItems,
        showMenuItems,
        hideAllNonBaseMenuItem,
        showAllNonBaseMenuItem,

        getNetworkType,

        scanQRCode,

        openAddress,

        chooseWXPay,

        haddleDarkMode,

        haddleToRouter
    }) {
        return (
            <section className="js-sdk">
                <header>微信公众号 网页JS-SDK</header>
                <nav>
                    <ul>
                        <li>
                            <a href="#Base">基础接口</a>
                        </li>
                        <li>
                            <a href="#Share">分享接口</a>
                        </li>
                        <li>
                            <a href="#Image">图像接口</a>
                        </li>
                        <li>
                            <a href="#Audio">音频接口</a>
                        </li>
                        <li>
                            <a href="#Voice">智能接口</a>
                        </li>
                        <li>
                            <a href="#NetworkType">设备信息</a>
                        </li>
                        <li>
                            <a href="#Location">地理位置</a>
                        </li>
                        <li>
                            <a href="#MenuItems">界面操作</a>
                        </li>
                        <li>
                            <a href="#QRCode">微信扫一扫</a>
                        </li>
                        <li>
                            <a href="#Pay">微信支付</a>
                        </li>
                        <li>
                            <a href="#Adds">快速输入</a>
                        </li>
                        <li>
                            <a href="#DarkMod">系统主题（DarkMode ）</a>
                        </li>
                        <li onClick={haddleToRouter.bind(this,{ path: '/open-launch' })}>
                            <a href="javascript:;">开放标签（小程序，app，公众号，音频播放）</a>
                        </li>
                        <li onClick={haddleToRouter.bind(this,{ path: '/appendix' })}>
                            <a href="javascript:;">menu项见附录</a>
                        </li>
                        <li onClick={haddleToRouter.bind(this,{ path: '/record' })}>
                            <a href="javascript:;">录音Demo</a>
                        </li>
                    </ul>
                </nav>
                <main>
                    <a name="Base">
                        <div className="card base">
                            <div className="header" >
                                <p className="title">基础接口</p>
                                <p className="tip">demo内部已经进行操作，直接操作即可</p>
                            </div>
                            <div className="content">
                                <Button value="判断当前客户端版本是否支持指定JS接口" onClick={checkJsApi}/>
                            </div>
                        </div>
                    </a>
                    <a name="Share">
                        <div className="card share">
                            <div className="header">
                                <p className="title">分享接口</p>
                                <p className="tip">demo内部已经进行操作，直接分享即可</p>
                            </div>
                            <div className="content">
                                <Button 
                                    value="自定义“分享给朋友”及“分享到QQ”按钮的分享内容" 
                                    onClick={updateAppMessageShareData.bind(this, '直接进行分享即可')}
                                />
                                <Button 
                                    value="自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容"
                                    onClick={updateTimelineShareData.bind(this, '直接进行分享即可')}
                                />
                                <Button
                                    value="获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口"
                                    onClick={onMenuShareWeibo.bind(this, '直接进行分享即可')}
                                />
                            </div>
                        </div>
                    </a>
                    <a name="Image">
                        <div className="card image">
                            <div className="header">
                                <p className="title">图像接口</p>
                                <p className="tip">1、获取本地/获取相机 => 获取本地图片 => 展示列表</p>
                                <p className="tip">2、点击图片也可进行预览</p>
                                <p className="tip">3、上传/下载图片，默认只取图片列表中第一条进行上传/下载</p>
                            </div>
                            <div className="content">
                                <Button 
                                    value="拍照或从手机相册中选图接口"
                                    onClick={chooseImage.bind(this, ['album', 'camera'])}
                                />
                                <Button 
                                    value="拍照接口" 
                                    onClick={chooseImage.bind(this, ['camera'])}
                                />
                                <Button 
                                    value="从手机相册中选图接口" 
                                    onClick={chooseImage.bind(this ,['album'])}
                                />
                                <Button 
                                    value="预览图片接口" 
                                    onClick={previewImage.bind(this, imgList[0])}
                                />
                                <Button 
                                    value="上传图片接口" 
                                    onClick={uploadImage.bind(this, imgList[0])}
                                />
                                <Button 
                                    value="下载图片接口" 
                                    onClick={downloadImage.bind(this, serverId[0])}
                                />
                                <div className="img-list">
                                    {
                                        imgList.map(item =>(
                                            <picture>
                                                {/* <!-- 深色模式下的图片 --> */}
                                                <source srcset={item} onClick={previewImage.bind(this,item)}  media="(prefers-color-scheme: dark)" />
                                                {/* <!-- 默认模式下的图片 --> */}
                                                <img src={item} onClick={previewImage.bind(this,item)}/>
                                            </picture>
                                        )) 
                                    }
                                </div>
                            </div>
                        </div>
                    </a>
                    <a name="Audio">
                        <div className="card image">
                            <div className="header">
                                <p className="title">音频接口</p>
                                <p className="tip">录音会存在噪音</p>
                                <p className="tip">监听录音自动停止接口 录音超过一分钟没有停止时候，会执行complete 回调</p>
                            </div>
                            <div className="content">
                                <Button value="开始录音接口" onClick={startRecord}/>
                                <Button value="停止录音接口" onClick={stopRecord}/>
                                <Button value="监听录音自动停止接口" onClick={onVoiceRecordEnd}/>
                                <Button value="播放语音接口" onClick={playVoice}/>
                                <Button value="暂停播放接口" onClick={pauseVoice}/>
                                <Button value="停止播放接口" onClick={stopVoice}/>
                                <Button value="监听语音播放完毕接口" onClick={onVoicePlayEnd}/>
                                <Button value="上传语音接口" onClick={uploadVoice}/>
                                <Button value="下载语音接口" onClick={downloadVoice}/>
                            </div>
                        </div>
                    </a>
                    <a name="Voice">
                        <div className="card image">
                            <div className="header">
                                <p className="title">智能接口</p>
                                <p className="tip">识别音频并返回识别结果接口</p>
                            </div>
                            <div className="content">
                                <Button value="识别音频并返回识别结果接口" onClick={translateVoice}/>
                            </div>
                        </div>
                    </a>
                    <a name="NetworkType">
                        <div className="card network-type">
                            <div className="header">
                                <p className="title">设备信息</p>
                            </div>
                            <div className="content">
                                <Button value="获取网络状态接口" onClick={getNetworkType}/>
                            </div>
                        </div>               
                    </a>
                    <a name="Location">
                        <div className="card location">
                            <div className="header">
                                <p className="title">地理位置</p>
                            </div>
                            <div className="content">
                                <Button 
                                    value="使用微信内置地图查看位置接口" 
                                    onClick={openLocation}
                                />
                                <Button 
                                    value="获取地理位置接口"
                                    onClick={getLocation}
                                />
                            </div>
                        </div>
                    </a>
                    <a name="MenuItems">
                        <div className="card menu-items">
                            <div className="header">
                                <p className="title">界面操作</p>
                                <p className="tip">要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录</p>
                            </div>
                            <div className="content">
                                <Button 
                                    value="关闭当前网页窗口接口" 
                                    onClick={closeWindow}
                                />
                                <Button 
                                    value="批量隐藏功能按钮接口"
                                    onClick={hideMenuItems}
                                />
                                <Button 
                                    value="批量显示功能按钮接口"
                                    onClick={showMenuItems}
                                />
                                <Button 
                                    value="隐藏所有非基础按钮接口"
                                    onClick={hideAllNonBaseMenuItem}
                                />
                                <Button 
                                    value="显示所有功能按钮接口"
                                    onClick={showAllNonBaseMenuItem}
                                />
                            </div>
                        </div>
                    </a>
                    <a name="QRCode">
                        <div className="card qr-code">
                            <div className="header">
                                <p className="title">微信扫一扫</p>
                            </div>
                            <div className="content">
                                <Button 
                                    value="调起微信扫一扫接口二维码 扫描结果微信处理" 
                                    onClick={scanQRCode.bind(this, { scanType:["qrCode"], needResult: 0 })}
                                />
                                <Button 
                                    value="调起微信扫一扫接口一维码 扫描结果微信处理"
                                    onClick={scanQRCode.bind(this, { scanType:["barCode"], needResult: 0 })}
                                />
                                <Button 
                                    value="调起微信扫一扫接口扫描结果微信处理" 
                                    onClick={scanQRCode.bind(this, { scanType:["qrCode","barCode"], needResult: 0 })}
                                />
                                <Button 
                                    value="调起微信扫一扫接口扫描结果自己处理" 
                                    onClick={scanQRCode.bind(this, { scanType:["qrCode","barCode"], needResult: 1 })}
                                />
                            </div>
                        </div>
                    </a>
                    <a name="Pay">
                        <div className="card pay">
                            <div className="header">
                                <p className="title">微信支付</p>
                            </div>
                            <div className="content">
                                <Button 
                                    value="发起一个微信支付请求" 
                                    onClick={chooseWXPay}
                                />
                            </div>
                        </div>
                    </a>
                    <a name="Adds">
                        <div className="card adds">
                            <div className="header">
                                <p className="title">快速输入</p>
                            </div>
                            <div className="content">
                                <Button 
                                    value="共享收货地址接口" 
                                    onClick={openAddress}
                                />
                            </div>
                        </div>
                    </a>
                    <a name="DarkMod">
                        <div className="card dark-mod">
                            <div className="header">
                                <p className="title">DarkMode 适配</p>
                                <p className="tip">默认：跟随系统配置</p>
                                <p className="tip">iOS：“设置”--“显示与亮度”--“外观”，选择“深色”</p>
                                <p className="tip">Androi：“系统设置”--“显示”--“深色模式”</p>
                            </div>
                            <div className="content">
                                <Button 
                                    value="浅色模式" 
                                    onClick={haddleDarkMode.bind(this, 'light')}
                                />
                                 <Button 
                                    value="深色模式" 
                                    onClick={haddleDarkMode.bind(this, 'dark')}
                                />
                            </div>
                        </div>
                    </a>
                </main>
            </section>
        );
    }
});

/**Button */
export function Button(params) {
    return <button {...params}>{params.value}</button>
}
