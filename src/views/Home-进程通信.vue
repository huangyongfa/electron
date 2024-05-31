<template>
    <div class="home" style="margin: 50px">
        接收主进程的消息： {{ remote }}
        <p>
        <button id="sendMsg" @click.stop="sendMessage" style="margin: 20px 0px;">发送给主进程(你叫什么名字？)</button>
        </p>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            ipcRenderer: '',
            remote: {
                sn: '',
                cid: '',
                address: ''
            }
        }
    },
    mounted() {
        this.ipcRenderer = require('electron').ipcRenderer
        this.receiveMessage()
    },
    methods: {
        sendMessage() { // 向主进程发送了一个名为sonMsg的消息事件
            this.ipcRenderer.send('sonMsg', 'Hello, what is your name')
        },
        receiveMessage() {
            // 监听主进程 webContents.send() 发送过来的消息
            this.ipcRenderer.on('main-process-message', (event, message) => {
                this.remote = message
            })
            // 接收主进程名为parentMsg消息
            this.ipcRenderer.on('parentMsg', (event, params) => {
                console.log('接收到的消息:', params)
                this.remote = params
            })
        }
    }
}
</script>