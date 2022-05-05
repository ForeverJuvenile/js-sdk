import weChatConfig  from '@common/wxConfig';
import { getToken, wxSignature} from '@api/index';

import { createRouter, createWebHistory } from 'vue-router';
import routes from './router';
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    /**测试环境不需要授权登录 手动设置Token */
    if(process.env.NODE_ENV === 'development') sessionStorage.setItem('token', '37000875-6ee0-4894-a28f-10617e2856a1'); 
    
    const totken = sessionStorage.getItem('token') || false;
    /**微信授权 */
    if(!totken && !to.query.code) weChatConfig.authorize();

    if(to.query.code) {
        /**获取token*/
        getToken(to.query.code).then((res => {
            if(res.resp_code === 0) {
                const params = res.datas ? res.datas : {};
                sessionStorage.setItem('token', params.access_token);
                
                if(params) {
                    wxSignature().then((res => {
                        if(res.resp_code === 0)  weChatConfig.config(res.datas,next);
                    }))
                }
            }
        }))
    } else {
        next();
    }
});

router.afterEach((to) => {
    document.title = to.meta.title;
    /**去除code */
    const search = window.location.search;
    if (search.indexOf('&code') !== -1 ) {
        history.pushState(null,null,window.location.href.split('&code')[0]);
    } else if (search.indexOf('?code') !== -1 ) {
        history.pushState(null,null,window.location.href.split('?code')[0]);
    }
});

export default router;
