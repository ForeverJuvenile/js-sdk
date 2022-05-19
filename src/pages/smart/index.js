import { defineComponent, onMounted, reactive } from 'vue';
import { 
    postTranslatecontent, 
    getTokens,
    ocrIdentification,
    qrcode,
} from '@api/index';
import { Button } from '../home';
import { getCookie } from '@common/common';
import './style.less';

/**服务端接口实现才可， 前端存在暴露风险 */
export default defineComponent({
    setup() {
        const state = reactive({
            access_token: localStorage.getItem('access_token'),
            qrCode: 'https://tailelive.oss-cn-shanghai.aliyuncs.com/apps/h5/qrcode.png',
            Platenum: 'https://tailelive.oss-cn-shanghai.aliyuncs.com/apps/h5/platenum.png',
            Bankcard: 'https://tailelive.oss-cn-shanghai.aliyuncs.com/apps/h5/Bankcard.png',
            Driving: 'https://tailelive.oss-cn-shanghai.aliyuncs.com/apps/h5/Driving.png',
            Drivinglicense: 'https://tailelive.oss-cn-shanghai.aliyuncs.com/apps/h5/drivinglicense.png',
            Bizlicense: 'http://tlc-aliy-l.oss-cn-zhangjiakou.aliyuncs.com/bigHealth/cms/file/2021/04/19/777a2604dfc143bd8c673df74808242c.jpg',
            IdList: ['https://tailelive.oss-cn-shanghai.aliyuncs.com/apps/h5/Front.png', 'https://tailelive.oss-cn-shanghai.aliyuncs.com/apps/h5/Back.png']
        });

        onMounted(() => {
            !getCookie('access_token') && (
                getTokens().then((res) => {
                    let timestamp = new Date().getTime(); /**当前的时间戳*/
                    document.cookie = "access_token=" + JSON.parse(res).access_token + ";expries="+ timestamp + 3600 + 3600;
                })
            )
        });

        /**微信翻译 */
        const haddleTranslatecontent = ({lfrom, lto}) => {
            const text = prompt( lfrom === 'zh_CN'     ? '请输入中文' : '请输入英文');
            if (text != null && text != "") {
                postTranslatecontent({
                    lfrom,
                    lto,
                    params: text
                }).then((res) => {
                    if(res.errcode == 0) {
                        alert(`原文 :${res.from_content},\n译文 :${res.to_content}`)
                    }
                })
            }
        }

        /** 身份证OCR识别*/
        const haddleIdcard = (index) =>{
            ocrIdentification({
                url: state.IdList[index],
                type: 'idcard'
            }).then((res) => {
                if(res.errcode == 0) {
                    if(res.type === 'Front') {
                        alert(
                            `
                            * 姓名: ${res.name}
                            * 性别: ${res.gender}
                            * 民族: ${res.nationality}
                            * 出生日期: ${res.birth}
                            * 住址: ${res.addr}
                            * 身份证号码：${res.id}
                        `)
                    } else {
                        alert(
                            `
                            * 签发机关: ${res.authority}
                            * 有效期限: ${res.valid_date}
                        `)
                    }
                }
            })
        }
        /** 银行卡OCR识别*/
        const haddleBankcard = () =>{
            ocrIdentification({
                url: state.Bankcard,
                type: 'bankcard'
            }).then((res) => {
                if(res.errcode == 0) {
                    alert( ` * 银行卡号为: ${res.number}`)
                } else {
                    alert( `出现异常，请稍后重试！`)
                }
            })
        }

        /** 行驶证OCR识别*/
        const haddleDriving = () =>{
            ocrIdentification({
                url: state.Driving,
                type: 'driving'
            }).then((res) => {
                if(res.errcode == 0) {
                    alert( ` 
                        * 车牌号码: ${res.plate_num}
                        * 车辆类型: ${res.vehicle_type}
                        * 所有人: ${res.owner}
                        * 使用性质: ${res.use_character}
                        * 品牌型号: ${res.model}
                        * 车辆识别代号: ${res.vin}
                        * 注册日期: ${res.egister_date}
                        * 发证日期: ${res.issue_date}
                        * 车牌号码: ${res.plate_num_b}
                        * 号牌: ${res.record}
                        * 核定载人数: ${res.passengers_num}
                        * 总质量: ${res.total_quality}
                        * 整备质量: ${res.prepare_quality}
                        * 外廓尺寸,: ${res.overall_size}
                        * 发证日期: ${res.issue_date}
                        * 图片大小：  ${res.img_size.h} *  ${res.img_size.w}
                    `)
                } else {
                    alert( `出现异常，请稍后重试！`)
                }
            })
        }

        /** 驾驶证OCR识别*/
        const haddleDrivinglicense = () =>{
            ocrIdentification({
                url: state.Drivinglicense,
                type: 'drivinglicense'
            }).then((res) => {
                if(res.errcode == 0) {
                    alert( ` 
                        * 证号: ${res.id_num}
                        * 姓名: ${res.name}
                        * 性别: ${res.sex}
                        * 国籍: ${res.nationality}
                        * 住址: ${res.address}
                        * 出生日期: ${res.birth_date}
                        * 初次领证日期: ${res.issue_date}
                        * 准驾车型: ${res.car_class}
                        * 有效期限起始日: ${res.valid_from}
                        * 有效期限终止日: ${res.valid_to}
                        * 印章文字: ${res.official_seal}
                        * 图片大小：  ${res.img_size.h} *  ${res.img_size.w}
                    `)
                } else {
                    alert( `出现异常，请稍后重试！`)
                }
            })
        }

        /** 营业执照OCR识别*/
        const haddleBizlicense = () =>{
            ocrIdentification({
                url: state.Bankcard,
                type: 'bizlicense'
            }).then((res) => {
                if(res.errcode == 0) {
                    alert( ` 
                        * 注册号: ${res.reg_num}
                        * 编号: ${res.serial}
                        * 法定代表人姓名: ${res.legal_representative}
                        * 企业名称: ${res.enterprise_name}
                        * 组成形式: ${res.type_of_organization}
                        * 经营场所/企业住所: ${res.address}
                        * 公司类型: ${res.type_of_enterprise}
                        * 经营范围: ${res.business_scope}
                        * 注册资本: ${res.registered_capital}
                        * 实收资本: ${res.paid_in_capital}
                        * 营业期限: ${res.valid_period}
                        * 注册日期/成立日期: ${res.registered_date}
                        * 图片大小：  ${res.img_size.h} *  ${res.img_size.w}
                    `)
                } else {
                    alert( `出现异常，请稍后重试！`)
                }
            })
        }

        /** 车牌OCR识别*/
        const haddlePlatenum = () =>{
            ocrIdentification({
                url: state.Platenum,
                type: 'platenum'
            }).then((res) => {
                if(res.errcode == 0) {
                    alert( ` * 车牌号为: ${res.number}`)
                } else {
                    alert( `出现异常，请稍后重试！`)
                }
            })
        }

        /** 二维码/条码识别*/
        const haddleQrcode = () =>{
            qrcode({
                url: state.qrCode,
            }).then((res) => {
                if(res.errcode == 0) {
                    alert(
                        `
                        * 网址解析: ${res.code_results[0].data}
                        * 类型: ${res.code_results[0].type_name}
                        * 尺寸: ${res.img_size.h} * ${res.img_size.w} 
                    `)
                }
            })
        }

        return {
            state,
            haddleIdcard,
            haddleQrcode,
            haddlePlatenum,
            haddleBankcard,
            haddleDriving,
            haddleDrivinglicense,
            haddleBizlicense,
            haddleTranslatecontent
        }
    },

    render({
        state,
        haddleIdcard,
        haddleQrcode,
        haddlePlatenum,
        haddleBankcard,
        haddleDriving,
        haddleDrivinglicense,
        haddleBizlicense,
        haddleTranslatecontent
    }) {
        return (
            <section className="smart">
                <header>智能接口</header>
                <nav>
                   <ul>
                        <li>
                            <a href="#Translatecontent">微信翻译</a>
                        </li>
                        <li>
                            <a href="#OCR">OCR</a>
                        </li>
                        <li>
                            <a href="#Img">图像处理接口文档</a>
                        </li>
                   </ul>
                </nav>
                <main>
                    <a name="Translatecontent">
                        <div className="card">
                            <div className="header" >
                                <p className="title">微信翻译</p>
                                <p className="tip">zh_CN 译 en_US / en_US 译 zh_CN</p>
                            </div>
                            <div className="content">
                                <Button value="点击我进行zh_CN 译 en_US " onClick={haddleTranslatecontent.bind(this,{ lfrom: 'zh_CN', lto: 'en_US' })}/>
                                <Button value="点击我进行en_US 译 zh_CN " onClick={haddleTranslatecontent.bind(this,{ lfrom: 'en_US', lto: 'zh_CN' })}/>
                            </div>
                        </div>
                    </a>
                    <a name="OCR">
                        <div className="card">
                            <div className="header" >
                                <p className="title">身份证OCR识别接口</p>
                                <p className="tip">微信OCR能力已全面接入服务平台计费系统。除服务平台接入方式外，原内测API，插件接入方式也均已接入计费系统。</p>
                                <p className="tip">已接入内测的开发者，免费额度会统一调整为100次/天，更多额度需付费购买资源包，账号内资源包额度为所有调用方式可共用</p>
                                <p className="tip">文件大小限制：小于2M；</p>
                                <p className="tip">以下身份证均通过生成器进行生成；生成的身份证信息都是虚拟的，不会涉及任何隐私泄密问题；</p>
                            </div>
                            <div className="content">
                               <div>
                                   <img src={state.IdList[0]}/>
                                   <Button value="点击解读身份证"  onClick={haddleIdcard.bind(this, 0)}/>
                               </div>
                               <div>
                                   <img src={state.IdList[1]} />
                                   <Button value="点击解读身份证" onClick={haddleIdcard.bind(this, 1)}/>
                               </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="header" >
                                <p className="title">银行卡OCR识别接口</p>
                                <p className="tip">文件大小限制：小于2M；</p>
                                <p className="tip">以下银行卡均通过生成器进行生成;</p>
                                <p className="tip">生成的银行卡信息都是虚拟的，不会涉及任何隐私泄密问题；</p>
                            </div>
                            <div className="content">
                               <div>
                                   <img src={state.Bankcard}/>
                                   <Button value="点击解读银行卡"  onClick={haddleBankcard.bind(this)}/>
                               </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="header" >
                                <p className="title">行驶证OCR识别接口</p>
                                <p className="tip">文件大小限制：小于2M；</p>
                            </div>
                            <div className="content">
                               <div>
                                   <img src={state.Driving} />
                                   <Button value="点击解读行驶证" onClick={haddleDriving}/>
                               </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="header" >
                                <p className="title">驾驶证OCR识别接口</p>
                                <p className="tip">文件大小限制：小于2M；</p>
                            </div>
                            <div className="content">
                               <div>
                                   <img src={state.Drivinglicense} />
                                   <Button value="点击解读驾驶证" onClick={haddleDrivinglicense}/>
                               </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="header" >
                                <p className="title">营业执照OCR识别接口</p>
                                <p className="tip">文件大小限制：小于2M；</p>
                            </div>
                            <div className="content">
                               <div>
                                   <img src={state.Bizlicense} />
                                   <Button value="点击解读营业执照" onClick={haddleBizlicense}/>
                               </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="header" >
                                <p className="title">车牌识别接口</p>
                                <p className="tip">文件大小限制：小于2M；</p>
                                <p className="tip">支持蓝标、黄标和绿标新能源车牌，暂不支持特殊车牌；</p>
                            </div>
                            <div className="content">
                               <div>
                                   <img src={state.Platenum}/>
                                   <Button value="点击解读车牌号"  onClick={haddlePlatenum}/>
                               </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="header" >
                                <p className="title">菜单识别接口</p>
                                <p className="tip">文件大小限制：小于2M；</p>
                            </div>
                            <div className="content">
                               <div>
                                   <img src={state.IdList[0]}/>
                                   <Button value="点击解读菜单"  onClick={haddleIdcard.bind(this, 0)}/>
                               </div>
                            </div>
                        </div>
                    </a>
                    <a name="Img">
                        <div className="card">
                            <div className="header" >
                                <p className="title">二维码/条码识别接口</p>
                                <p className="tip">1 内测期间，对于已认证的订阅号、服务号、企业号、小程序，我们提供了 100 次/天 的免费额度供开发者使用</p>
                                <p className="tip">2 文件大小限制：小于2M</p>
                                <p className="tip">3 支持条码、二维码、DataMatrix和PDF417的识别</p>
                                <p className="tip">4 二维码、DataMatrix会返回位置坐标，条码和PDF417暂不返回位置坐标</p>
                            </div>
                            <div className="content">
                                <img src={state.qrCode} />
                                <Button value="点击我进行解析" onClick={haddleQrcode}/>
                            </div>
                        </div>
                        <div className="card">
                            <div className="header" >
                                <p className="title">图片高清化接口</p>
                                <p className="tip">1 图片支持使用img参数实时上传，也支持使用img_url参数传送图片地址，由微信后台下载图片进行识别</p>
                                <p className="tip">2 文件大小限制：小于2M</p>
                                <p className="tip">3 目前支持将图片超分辨率高清化2倍，即生成图片分辨率为原图2倍大小</p>
                            </div>
                            <div className="content">
                                <img src={state.qrCode} />
                                <Button value="点击我服务号订阅通知" onClick={haddleQrcode}/>
                            </div>
                        </div>
                    </a>
                </main>
            </section>
        );
    }
});