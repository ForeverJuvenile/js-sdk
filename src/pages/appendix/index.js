import { defineComponent } from 'vue';
import './style.less';

export default defineComponent({
    setup() {
       
    },

    render() {
        return (
            <section className="appendix">
                <header>附录3-所有菜单项列表</header>
                <nav>
                    <div className="card">
                        <p className="title">基本类</p>
                        <ul>
                            <li>举报: "menuItem:exposeArticle"</li>
                            <li>调整字体: "menuItem:setFont"</li>
                            <li>日间模式: "menuItem:dayMo</li>
                            <li>夜间模式: "menuItem:nightMode"</li>
                            <li>刷新: "menuItem:refresh"</li>
                            <li>查看公众号（已添加）: "menuItem:profile"</li>
                            <li>查看公众号（未添加）: "menuItem:addContact"</li>
                        </ul>
                    </div>
                    <div className="card">
                        <p className="title">传播类</p>
                        <ul>
                            <li>发送给朋友: "menuItem:share:appMessage"</li>
                            <li>分享到朋友圈: "menuItem:share:timeline"</li>
                            <li>分享到QQ: "menuItem:share:qq"</li>
                            <li>分享到Weibo: "menuItem:share:weiboApp"</li>
                            <li>收藏: "menuItem:favorite"</li>
                            <li>分享到FB: "menuItem:share:facebook"</li>
                            <li>分享到 QQ 空间 "menuItem:share:QZone"</li>
                        </ul>
                    </div>
                    <div className="card">
                        <p className="title">保护类</p>
                        <ul>
                            <li>编辑标签: "menuItem:editTag"</li>
                            <li>删除: "menuItem:delete"</li>
                            <li>复制链接: "menuItem:copyUrl"</li>
                            <li>原网页: "menuItem:originPage"</li>
                            <li>阅读模式: "menuItem:readMode"</li>
                            <li>在QQ浏览器中打开: "menuItem:openWithQQBrowser</li>
                            <li>在Safari中打开: "menuItem:openWithSafar"</li>
                            <li>邮件: "menuItem:share:email</li>
                            <li>一些特殊公众号: "menuItem:share:brand</li>
                        </ul>
                    </div>
                </nav>
            </section>
        );
    }
});