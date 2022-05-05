import axios from 'axios';
import weChatConfig  from '@common/wxConfig';

const $axios = axios.create({
    // 设置超时时间
    timeout: 30 * 1000,
    baseURL:  'http://dtest.rongxiangjiankang.com:9900',
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
    }
}

/**获取token */
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
