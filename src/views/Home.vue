<template>
    <div class="home">
        <div ref="wrapper" class="wrapper" v-show="!showLoading"></div>
        <div v-show="showLoading" class="msg-placeholder" id="msg">
            <div class="loading" id="loading-animate">
                <span></span><span></span><span></span><span></span><span></span>
            </div>
            <span id="msg-text" class="msg-text">{{ msgText }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            showLoading: true,
            client: null,
            totalBytes: 0,
            view: null,
            framesCount: 0,
            msgText: '正在加载画面...',
            ipcRenderer: '',
            remote: {
                sn: '',
                cid: '',
                address: ''
            }
        }
    },
    mounted() {
        this.ipcRenderer = require('electron').ipcRenderer // 引入electron中的ipcRenderer模块
        this.receiveMessage()
    },
    methods: {
        getUrlParams(urlString) {
            const queryStart = urlString.indexOf('?')
            if (queryStart === -1) {
                return {}
            }
            const queryString = urlString.slice(queryStart + 1)
            const pairs = queryString.split('&')
            const params = {}
            pairs.forEach(pair => {
                const [key, value] = pair.split('=')
                params[decodeURIComponent(key)] = decodeURIComponent(value || '')
            })
            return params
        },
        receiveMessage() {
            // 监听主进程 webContents.send() 发送过来的消息
            this.ipcRenderer.on('main-process-message', (event, url) => {
                this.remote = this.getUrlParams(url)
                this.initSunlogin(this.remote)
            })
        },
        initSunlogin({ sn, address, cid }) {
            console.log(sn)
            const _this = this
            const reg = /PHSRC_(HTTP|HTTPS):\/\/([^/]+):(\d+)*\//
            const matches = address.match(reg)
            _this.msgText = '正在加载画面...'
            this.client = new this.SunloginControl.Client({
                host: matches[2],
                embed: true, // SDK 传true
                ssl: matches[1].indexOf('HTTPS') !== -1, // node环境下可以主动忽略证书校验，即使服务器没有配置也可以运行
                cid,
                port: matches[3],
                debug: false,
                // debug: process.env.NODE_ENV === 'development' // 控制台日志输出，生产环境请关闭debug
            })
            this.SunloginControl.Wasm.preload().then(() => {
                _this.client
                    .connect() // 客户端连接开始
                    .then(() => {
                        _this.showLoading = false
                        // 断开连接
                        _this.client.on('disconnect', () => {
                            _this.showLoading = true
                            _this.view = null
                            delete _this.view
                            _this.msgText = '连接已断开...'
                        })
                        _this.view = new _this.SunloginControl.Wasm(_this.$refs.wrapper)
                        const desktop = new _this.SunloginControl.Plugin.Desktop({
                            quality: 10,
                        })
                        _this.client.connectPlugin(desktop)
                        // imageinfo 桌面图像信息
                        desktop.on('imageinfo', info => {
                            console.log(info)
                            _this.view.setImageInfo(info)
                        })
                        desktop.on('screen', count => {
                            console.log('屏幕数量：' + count)
                        })
                        desktop.on('session', sessions => {
                            console.log('系统会话：', sessions)
                        })
                        desktop.on('stream', (stream, info) => {
                            this.framesCount = this.framesCount++
                            this.totalBytes = this.totalBytes += info.length
                            _this.view.decode(stream, info)
                            desktop.sendDecodeFinishMessage(
                                _this.framesCount,
                                _this.totalBytes
                            )
                        })
                        // 传输鼠标（触摸）& 键盘(Win)事件，不传输任何主控端事件，即为观看
                        // moveOutRelease 移出图像区域时自动释放鼠标/触摸
                        desktop.transportMouseEvent(_this.$refs.wrapper)
                        desktop.transportKeyBoardEvent(_this.$refs.wrapper)
                    })
                    .catch(e => {
                        _this.client.disconnect()
                    })
            })
        }
    }
}
</script>
<style>
.home {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #2c3e50;
    background-color: #000000;
}

.wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
}

.ant-modal .ant-modal-content {
    background-color: #000;
}

.ant-modal .ant-modal-content .ant-modal-close {
    color: #fff;
}

.ant-modal .ant-modal-content .ant-modal-close:hover {
    color: rgba(255, 255, 255, 0.9);
}

.msg-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.msg-placeholder .msg-text {
    color: #fff;
}

.msg-placeholder .loading {
    height: 20px;
    margin-right: 10px;
    display: inline-block;
}

.msg-placeholder .loading span {
    display: inline-block;
    width: 8px;
    height: 100%;
    border-radius: 4px;
    margin: 0 1px;
    background: #ff8a56;
    animation: load 1s ease infinite;
}

.msg-placeholder .loading span:nth-child(2) {
    animation-delay: 0.2s;
}

.msg-placeholder .loading span:nth-child(3) {
    animation-delay: 0.4s;
}

.msg-placeholder .loading span:nth-child(4) {
    animation-delay: 0.6s;
}

.msg-placeholder .loading span:nth-child(5) {
    animation-delay: 0.8s;
}

@keyframes load {

    0%,
    100% {
        height: 10px;
        background: #ff8a56;
    }

    50% {
        height: 20px;
        margin: -5px 1px;
        background: #ff895679;
    }
}
</style>