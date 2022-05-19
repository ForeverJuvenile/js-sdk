import { defineComponent, Transition, reactive, Fragment } from 'vue';
import weChatConfig  from '@common/wxConfig';
import { twoNumber } from '@common/common';
import voice from '@assets/images/voice.png';
import { Button } from '../home';
import './style.less';

/**24小时内时间格式 */
const FormData = (length) => {
    if(length < 60) {
        return `00: ${twoNumber(length)}`
    } else if(length === 60) {
        return `01: 00`
    } else  if(length > 60 && length < 60 * 60) {
        const tryIt = length % 60;
        const int = parseInt(length / 60)
        return `${twoNumber(int)}: ${twoNumber(tryIt)}`
    }
}

export default defineComponent({
    setup() {
        const state = reactive({
            localIds: [],
            show: false,
            status: false,
        });
        const times = reactive({
            timeOut: 0,
            startTime: undefined,
            endTime: undefined,
            timeLength: 0,
            interval: undefined,
            showTimeLength: undefined
        });

        /**循环记录时间 */
        const recordingTimeLength = () => {
            state.interval = setInterval(() => {
                times.timeLength = times.timeLength + 1;
            }, 1000);
        }

        /**开始录音 */
        const haddleStart = (e) => {
            e.preventDefault();
            times.timeOut = setTimeout(() => {
                state.status = true;
                times.startTime = new Date().getTime();
                weChatConfig.startRecord();
                recordingTimeLength();
                haddlelayEnd();
            }, 500);
        }

        /**结束录音 */
        const haddleStop = (e) => {
            state.status = false;
            times.endTime = new Date().getTime();
            e.preventDefault();
            /**录制时间最少1s */
            if(times.endTime -  times.startTime > 1000) {
                weChatConfig.stopRecord({
                    success: (localId) => {
                        state.localIds.push({
                            localId,
                            length: times.timeLength
                        });
                        /**清空 */
                        times.timeLength = 0;
                        times.showTimeLength = undefined;
                        clearTimeout(times.timeOut);
                        clearTimeout(state.interval);
                    }
                });
            } else {
                alert('按键时间太短')
            }

           
        }

        /**播放录音 */
        const haddkePlay = (localId) => {
            state.currentPlay = localId;
            weChatConfig.playVoice({localId});
        }

        /**转文字*/
        const haddleText = (localId, key) => {
            if(state.localIds[key].textStatus) return;  
            weChatConfig.translateVoice({
                localId: localId,
                success: function (translateResult) {
                    state.localIds[key]['text'] = translateResult;
                    state.localIds[key]['textStatus'] = true;
                }
            });
        }

        /**录音播放完毕 */
        const haddlelayEnd = () => {
            weChatConfig.onVoicePlayEnd({
                success: function () {
                    state.currentPlay = undefined;
                }
            });
        }

        /**展示录音按钮 */
        const haddleOpenVoice = () =>  state.show = !state.show;

        return {
            times,
            state,
            haddleOpenVoice,
            haddleStart,
            haddleStop,
            haddkePlay,
            haddlelayEnd,
            haddleText,
        }
    },

    render({
        state,
        times,
        haddleStart,
        haddleStop,
        haddleOpenVoice,
        haddkePlay,
        haddleText
    }) {
        return (
            <section className="record">
                <header>语音案例</header>
                <main>
                <div className="card">
                        <Button onClick={haddleOpenVoice} value={ state.show ? '结束体验' : '开始体验' }/>     
                    </div>

                    <ul className="audio-list">
                        {
                            state.localIds.map((item, index) =>  (
                                <Fragment>
                                    <li >
                                        {
                                          !item.textStatus && <span onClick={haddleText.bind(this, item.localId, index)} className="tag">转文字</span>
                                        }
                                        <div className="audio" onClick={haddkePlay.bind(this, item.localId)}>
                                                {item.length}"
                                                <div className={state.currentPlay === item.localId  ?  'play play-ing' : 'play'}></div>
                                        </div>
                                        <img src="https://img.clinicmed.net/uploadimg/image/20220401/20220401114010_59661.jpg" />
                                    </li>
                                    {
                                        item.textStatus && <li className="text">{item.currentText }</li>
                                    }
                                </Fragment>
                            ))
                        }
                    </ul>
                </main>
                <footer>
                    <Transition name="slide-fade">
                        {
                            state.show && <div className="content">
                                <p>{ !state.status ? '按住说话' : FormData(times.timeLength)}</p> 
                                <div 
                                    className={ !state.status ? "back" : "back play"} 
                                    onTouchstart={haddleStart}
                                    onTouchend={haddleStop}
                                >
                                    <img src={voice}/>
                                </div>
                            </div>
                        }
                    </Transition>
                </footer>
            </section>
        );
    }
});