const { app, BrowserWindow, session, ipcMain } = require('electron')
const path = require('path')
const reactDevToolsPath = path.resolve(__dirname, '../vue-devtools')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })


  let url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'file://' + path.join(__dirname, '../dist/index.html');
  win.loadURL(url)

   // 减少白屏时间
   win.on("ready-to-show", function () {
    win.show()
  })

  // 没建立会话，主进程直接发给渲染进程
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('main-process-message', { msg: '传给子进程了' })
  })
  
  //建立会话后，主进程接收渲染进程发送的消息
  ipcMain.on('sonMsg', (event, msg) => {
    console.log(msg); // 接收渲染进程发送的消息
    event.reply('parentMsg', '我叫王小二'); // 回复渲染进程
  })

}


app.whenReady().then(async () => {
  if (process.env.NODE_ENV === 'development') {
    await session.defaultSession.loadExtension(reactDevToolsPath)
  }
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


