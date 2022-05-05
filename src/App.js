import { defineComponent, watch, provide } from 'vue';
import { useRouter } from 'vue-router';
import weChatConfig  from '@common/wxConfig';
import './app.less';

/**分享模板设置 */
export function shareTemplate(params) {
    /**默认分享 */
        /**隐藏不必要菜单 */
        weChatConfig.hideMenuItems([
            "menuItem:editTag", // 编辑标签
            "menuItem:delete", // 删除
            "menuItem:copyUrl", // 复制链接
            "menuItem:originPage", // 原网页
            "menuItem:readMode", // 阅读模式
            "menuItem:share:email", // 邮件
            "menuItem:share:brand", // 一些特殊公众号
        ]);
        /**分享朋友及QQ */
        weChatConfig.updateAppMessageShareData({
            title: params.title,
            desc: params.desc,
            url: location.href,
            imgUrl: 'https://yhjstatic.oss-cn-shanghai.aliyuncs.com/avatar/1621590154996-f92acfb2-8997-8e56-d091-e20363cf4864.jpg',
        });
        /**分享朋友圈及QQ空间 */
        weChatConfig.updateTimelineShareData({
            title: params.title,
            url: location.href,
            imgUrl: 'http://wx.qlogo.cn/mmopen/hBRwCicx1QG08a2VBU884osjuNQpicVGPk7Wb8j242NLTL8HnslpmH3NBNBV750hPosZc0TEDB3ZyBzicb1NcXq2HsdzrACBgwA/64'
        });
        /**分享微博 */
        weChatConfig.onMenuShareWeibo({
            title: params.title,
            desc: params.desc,
            url: location.href,
            imgUrl: 'http://wx.qlogo.cn/mmopen/hBRwCicx1QG08a2VBU884osjuNQpicVGPk7Wb8j242NLTL8HnslpmH3NBNBV750hPosZc0TEDB3ZyBzicb1NcXq2HsdzrACBgwA/64'
        });
    return true;
}

export default defineComponent({
    name: 'App',
    setup() {
        const Router = useRouter();
        const { push } = useRouter();

        /**路由跳转 */
        const haddleToRouter = async ({path, params = {}}) => {
            push({ path, query: params });
        }
        provide('haddleToRouter', haddleToRouter);
        watch(() => Router.currentRoute.value,
            (value) => {
                shareTemplate(value.meta);
            },
        );
        return {
            haddleToRouter
        };
    },

    render() {
        return (
            <router-view/>
        );
    }
});

