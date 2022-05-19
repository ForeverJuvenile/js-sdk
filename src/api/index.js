import axios from 'axios';
import weChatConfig  from '@common/wxConfig';
import { getCookie } from '@common/common';


const $axios = axios.create({
    // 设置超时时间
    timeout: 30 * 1000,
});
$axios.defaults.headers['Content-Type'] = 'application/json'

const request = {
    post (params) {
        if(params.type === 'Basic') {
            $axios.defaults.headers['Authorization'] = 'Basic ' + window.btoa('wechat'+ ':' + 'h3raXYoPTgg2VfNgKK')
        } else {
            $axios.defaults.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') 
        }
        return  new Promise((resolve, reject) => {
            $axios.post(params.url, params.params)
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            });
        })
    },
    get (params) {
        if(params.type === 'Basic') {
            $axios.defaults.headers['Authorization'] = 'Basic ' + window.btoa('wechat'+ ':' + 'h3raXYoPTgg2VfNgKK')
        } else {
            $axios.defaults.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') 
        }
        return  new Promise((resolve, reject) => {
            $axios.get(params.url, { params: params.params })
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            });
        })
    }
}

/**获取网页授权token */
export const getToken = (code) => request.post({
    url: `/api-uaa/oauth/token?grant_type=openId&code=${code}&appId=${weChatConfig.appId}&systemId=2`,
    type: 'Basic',
});

/**获取wx签名*/
export const wxSignature = () => request.post({
    url: '/api-pbm-production/pbm-production/v1/wx/getJsApiWxCertificate',
    params: {
        appId:weChatConfig.appId,
		url: location.href
    },
    type: 'Bearer',
});

/**翻译*/
export const postTranslatecontent = ({lfrom, lto, params }) => request.post({
    url: `/cgi-bin/media/voice/translatecontent?access_token=${getCookie('access_token')}&lfrom=${lfrom}&lto=${lto}`,
    params
});

/**获取普通access_token*/
export const getTokens = () => request.get({
    url: `/node/getToken`,
});

/** OCR智能识别*/
export const ocrIdentification = ({type, url}) => request.post({
    url: `/cv/ocr/${type}?access_token=${getCookie('access_token')}&img_url=${url}`,
});
