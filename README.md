# electron-vite-vue2

![GitHub Repo stars](https://img.shields.io/github/stars/ziyoren/electron-vite-vue2)
[![vue](https://img.shields.io/badge/vue-2.6.14-brightgreen.svg)](https://github.com/vuejs/vue-next)
[![vite](https://img.shields.io/badge/vite-2.8.6-brightgreen.svg)](https://github.com/vitejs/vite)
[![electron](https://img.shields.io/badge/electron-17.2.0-brightgreen.svg)](https://github.com/electron/electron)
[![electron-builder](https://img.shields.io/badge/electronBuilder-22.14.13-brightgreen.svg)](https://github.com/electron-userland/electron-builder)

一个简单、高效的桌面应用开发样板工程，由Electron、Vite、Vue2等组成。集成了vue devtools工具，方便大家调试。

## 特色
* 使用JavaScript，HTML和CSS构建跨平台的桌面应用程序。

* 主进程支持所有的Node.JS API。

* 高性能的Chromium展示您的网页，让您的应用运行更流畅。

* 极速的服务启动、轻量快速的热重载，让您的开发效率更快。

* 易用、灵活、高效的VUE，丰富的生态支持。

## 开始使用
克隆本项目
```sh
git clone git@github.com:ziyoren/electron-vite-vue2.git
```

进入项目目录
```sh
cd electron-vite-vue2
```

安装依赖
```sh
npm install
```

开始开发
```sh 
npm start
```

打包发布
```sh
npm run release
```

## 目录结构
```sh
├── README.md              
├── build
│   └── icons
│       ├── 256x256.png
│       ├── icon.icns
│       └── icon.ico
├── electron
│   └── index.js              #electron的入口文件
├── electron-builder.json     #打包组件electron-builder的配置文件
├── favicon.svg
├── index.html                #Vue的入口模板文件
├── package.json
├── src                       #Vue的代码目录，就在这里写前端界面
│   ├── App.vue
│   ├── main.js
│   ├── router                #Vue的路由
│   │   └── index.js
│   └── views
│       ├── About.vue
│       └── Home.vue
├── vite.config.js            #Vite的配置文件
├── vue-devtools              #集成Vue-devtools6.1.3 方便您调试Vue项目
├── dist                      #编译Vue时生成的目录
└── release                   #打包发布的应用在这个目录里

```

nsis: { // win版 exe配置
          oneClick: false, // 一键安装
          guid: 'iMinRemoteExe', // 注册表名字
          perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）
          allowElevation: true, // 允许请求提升, 如果为false，则用户必须使用提升的权限重新启动安装程序
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: '.', // 安装图标
          uninstallerIcon: '', // 卸载图标
          installerHeaderIcon: '', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: "iMinRemoteExe", // 用于所有快捷方式的名称。默认为应用程序名称
          include: "electron/registerProtocol.nsh" // win版 注册协议 
        },

## 国内镜像配置

国内访问请配置镜像地址，否则可能会下载失败

1. 打开npm配置文件
```sh
npm config edit
```

2. 在空白处添加下面配置内容
```sh
electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
electron_custom_dir={{ version }}
electron_mirror=https://cdn.npmmirror.com/binaries/electron/v
registry=https://registry.npmmirror.com/
```

3. 安装依赖
```sh
npm install
```

## 包下载问题
构建时，如遇到无法下载electron相关的包，可以到npmmirror.com镜像站下载后放在缓存目录中。

各操作系统包的位置如下：

* `macOS` ~/Library/Caches/electron-builder

* `linux` ~/.cache/electron-builder

* `windows` %LOCALAPPDATA%\electron-builder\cache


## 相关链接

[Electron官网](https://www.electronjs.org/)

[Vue官网](https://v2.vuejs.org/)

[Vue.js视频教程](https://learning.dcloud.io/#/)

[ViteJS官网](https://vitejs.cn/)

[npmmirror.com中国镜像站](https://npmmirror.com/)
