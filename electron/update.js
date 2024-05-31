import { autoUpdater } from 'electron-updater'
import { app, ipcMain } from 'electron'
 
 
// 更新地址,该地址下放的是安装包.exe和latest.yml
const updateUrl = 'https://yiminoss.neostra.com/web/yimin/exe/'
 
// 检测更新，在你想要检查更新的时候执行
function updateHandle (updateConfig) {
  let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新'
  }
  // 设置是否自动下载，默认是true,当点击检测到新版本时，会自动下载安装包，所以设置为false
  autoUpdater.autoDownload = false
  // 设置服务器更新地址
  autoUpdater.setFeedURL({
    provider: 'generic',
    url: updateUrl
  })
  autoUpdater.on('error', function (err) {
    sendUpdateMessage('error',err||message.error)
  })
  autoUpdater.on('checking-for-update', function () {
    sendUpdateMessage('checking-for-update',message.checking)
  })
  // 版本检测结束，准备更新
  autoUpdater.on('update-available', function (info) {
    sendUpdateMessage('update-available',message.updateAva)
  })
  autoUpdater.on('update-not-available', function (info) {
    sendUpdateMessage('update-not-available',message.updateNotAva)
  })
  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    sendUpdateMessage('download-progress',progressObj.percent)
  })
  // 下载完成
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    sendUpdateMessage('update-downloaded','下载完成')
  })
  
  // 通过main进程发送事件给renderer进程，提示更新信息
  function sendUpdateMessage (name,text) {
    // 窗口对象自行修改
    let loginWindow = global.browserList.logins[0]
    loginWindow.webContents.send('UpdateMessage', {name,text})
  }
}
 
// 触发更新检测
ipcMain.on('checkForUpdates', () => {
  autoUpdater.checkForUpdates()
})
 
//  开始下载，通过渲染进程发起
ipcMain.on('downloadUpdate', () => {
    autoUpdater.downloadUpdate()
})
 
//  下载完成，退出且重新安装  
ipcMain.on('updateSuccess', () => {
    // 加载更新程序
    autoUpdater.quitAndInstall()
    // 关闭当前electron
    app.quit()
})


export default updateHandle