const { app, BrowserWindow } = require('electron')
const mock = require('../tests/mocks')

let mainWindow = null

app.on('ready', () => {
  console.log('app is ready')
  mainWindow = new BrowserWindow({
    maxWidth: 800,
    maxHeight: 600,
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)
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


// if (process.env.SPECTRON) {
//   mock(dialog)
// }
