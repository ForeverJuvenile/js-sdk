import { createApp } from 'vue';
import weChatConfig  from '@common/wxConfig';
import { wxSignature } from '@api/index';
import App from './App.js';
import router from './router';

/**解决300ms click点击 ios click时间延迟过大 ios版本不同 */
(function () {
    let str = navigator.userAgent.toLowerCase();
    let ver = str.match(/cpu iphone os (.*?) like mac os/);
    window.FastClick.prototype.focus = function (targetElement) {
        targetElement.focus();
    };
    if (ver && parseInt(ver[1], 0) >= 11) {
        return; // 不必引入fastclick文件
    }
    window.FastClick.attach(document.body);
})();

/**页面刷新后有着重要的作用 全局注入wx.config*/
if (sessionStorage.getItem('token')) {
    wxSignature().then((res => {
        if(res.resp_code === 0)  weChatConfig.config(res.datas);
    }))
}
const app = createApp(App);
/**系统主题 白天、夜晚 */
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
function darkModeHandler() {
    if (mediaQuery.matches) {
      console.log('现在是深色模式');
      return;
    }
    console.log('现在是浅色模式'); 
}
// 判断当前模式
darkModeHandler()
// 监听模式变化
mediaQuery.addListener(darkModeHandler);

/**微信开放标签 */
try {
    app.config.compilerOptions.isCustomElement = tag => tag.startsWith('wx-');
} catch {
    app.config.isCustomElement = tag => tag.startsWith('wx-');
}
app.use(router).mount('#app');
