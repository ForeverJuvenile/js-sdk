import { defineComponent } from 'vue';
import { Button } from '../home';

import './style.less';

export default defineComponent({
    setup() {

        /**跳转小程序 */
        const openLaunchWeapp = () => {
            location.href = 'weixin://dl/business/?t=DijeohSgEvr'
        }

        /**跳转公众号/订阅号 */
        const openLaunchSubscription  = () => {
            location.href =   'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU3NzgzODU4Mg==#wechat_redirect'
        }

        return {
             openLaunchWeapp,
             openLaunchSubscription
        }
    },

    render({
        openLaunchWeapp,
        openLaunchSubscription,
    }) {
        return (
            <section className="open-launch">
                <header>微信开放标签</header>
                <nav>
                   <ul>
                        <li>
                            <a href="#LaunchWeapp">跳转小程序</a>
                        </li>
                        <li>
                            <a href="#APP">跳转小程序</a>
                        </li>
                        <li>
                            <a href="#LaunchSubscription">服务号订阅通知</a>
                        </li>
                        <li>
                            <a href="#Audio">音频播放</a>
                        </li>
                        <li>
                            <a href="#WeixinHome">跳转公众号首页</a>
                        </li>
                   </ul>
                </nav>
                <main>
                    <a name="LaunchWeapp">
                        <div className="card">
                            <div className="header" >
                                <p className="title">跳转小程序</p>
                                <p className="tip">以下均为实操案例: 美团为例</p>
                                <p className="tip">通过标签：wx-open-launch-weapp 微信小程序原始ID path实现</p>
                            </div>
                            <div className="content">
                                    <wx-open-launch-weapp 
                                        class="weapp"
                                        username="gh_72a4eb2d4324"
                                        path="pages/index/index"
                                        className="weapp"
                                    >
                                        <script type="text/wxtag-template">
                                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }} />
                                        </script>
                                    </wx-open-launch-weapp>
                                    <Button value="点击我跳转小程序"/>
                            </div>
                        </div>
                    </a>
                    <a name="LaunchWeapp">
                        <div className="card">
                            <div className="header" >
                                <p className="title">跳转小程序</p>
                                <p className="tip">以下均为实操案例: 泰享健康护理版（省人民）小程序</p>
                                <p className="tip">通过：小程序URL Scheme 实现 (微信长期有效被🈲)</p>
                            </div>
                            <div className="content">
                                <Button value="点击我跳转小程序" onClick={openLaunchWeapp}/>
                            </div>
                        </div>
                    </a>
                    <a name="App">
                        <div className="card">
                            <div className="header" >
                                <p className="title">跳转APP</p>
                                <p className="tip">以下均为实操案例</p>
                            </div>
                            <div className="content">
                                <wx-open-launch-app
                                    appid="1576469677"
                                    className="weapp"
                                >
                                    <script type="text/wxtag-template">
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }} />
                                    </script>
                                </wx-open-launch-app>
                                <Button value="点击我跳转APP"/>
                            </div>
                        </div>
                    </a>
                    <a name="LaunchSubscription">
                        <div className="card">
                            <div className="header" >
                                <p className="title">服务号订阅通知</p>
                                <p className="tip">以下均为实操案例</p>
                            </div>
                            <div className="content">
                                <wx-open-subscribe
                                    className="weapp"
                                    template="MHZyC98tsc1DncN2UVcyvQYmbZeIzPS0QZ22eyJ6tms" 
                                >
                                     <script type="text/wxtag-template">
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }} />
                                    </script>
                                </wx-open-subscribe>
                                <Button value="点击我服务号订阅通知"/>
                            </div>
                        </div>
                    </a>
                    <a name="Audio">
                        <div className="card">
                            <div className="header" >
                                <p className="title">音频播放</p>
                                <p className="tip">以下均为实操案例</p>
                                <p className="tip">wx-open-audio 标签实现</p>
                            </div>
                            <div className="content">
                            <wx-open-audio
                                title="我已经爱上你"
                                singer="电音"
                                episode="DJ跟我一起嗨"
                                src="https://tailelive.oss-cn-shanghai.aliyuncs.com/webchat/forreverchen.mp3"
                                cover="https://tailelive.oss-cn-shanghai.aliyuncs.com/webchat/fuyou-weinxin/tab-appointment-select.png"
                            ></wx-open-audio>
                            </div>
                        </div>
                    </a>
                    <a name="WeixinHome">
                        <div className="card">
                            <div className="header" >
                                <p className="title">跳转公众号/订阅号</p>
                                <p className="tip">以下均为实操案例</p>
                            </div>
                            <div className="content">
                                <Button value="点击我跳转公众号首页" onClick={openLaunchSubscription}/>
                            </div>
                        </div>
                    </a>
                </main>
            </section>
        );
    }
});