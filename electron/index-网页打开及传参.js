const { app, BrowserWindow, session, ipcMain } = require('electron')
const path = require('path')

const reactDevToolsPath = path.resolve(__dirname, '../vue-devtools');

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
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

// 限制只打开一次窗口实例
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, argv) => {
    if (process.platform === 'win32') {
      // 接收传递参数
     win.webContents.send('main-process-message', argv[argv.length - 1]) 
    }
  })
}

// 第一次打开 通过process.argv获取协议url参数
if (process.platform === 'win32' && process.argv && process.argv.length > 1) {
  const url = process.argv[process.argv.length - 1];
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('main-process-message', url)
  })
}

}



app.whenReady().then(async () => {
  if (process.env.NODE_ENV === 'development') {
    await session.defaultSession.loadExtension(reactDevToolsPath)
  }
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


