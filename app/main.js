const { app, BrowserWindow } = require('electron')
const menubar = require('menubar')
const mock = require('../tests/mocks')

const mb = menubar({
  width: 800,
  height: 600
})

mb.on('ready', function ready () {
  console.log('dockjs is ready')
})

mb.on('after-create-window', () => {
  mb.window.loadURL(`file://${__dirname}/index.html`)
  mb.window.webContents.openDevTools()
})

/* electron modules */
// [ 'clipboard',
//   'crashReporter',
//   'nativeImage',
//   'shell',
//   'app',
//   'autoUpdater',
//   'BrowserWindow',
//   'contentTracing',
//   'dialog',
//   'ipcMain',
//   'globalShortcut',
//   'Menu',
//   'MenuItem',
//   'powerMonitor',
//   'powerSaveBlocker',
//   'protocol',
//   'screen',
//   'session',
//   'systemPreferences',
//   'Tray',
//   'webContents',
//   'net' ]


if (process.env.SPECTRON) {
  mock(dialog)
}
