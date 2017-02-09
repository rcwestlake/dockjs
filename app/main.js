const { app, BrowserWindow } = require('electron')
const mock = require('../tests/mocks')

let mainWindow = null

app.on('ready', () => {
  console.log('app is ready')
  mainWindow = new BrowserWindow({
    maxWidth: 800,
    maxHeight: 600,
    // webPreferences: { devTools: true }
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.openDevTools()

  mainWindow.loadURL(`file://${__dirname}/index.html`)
})

// BrowserWindow.addDevToolsExtension(path)

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
