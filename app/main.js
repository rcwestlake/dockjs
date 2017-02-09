const { app, dialog } = require('electron')
const menubar = require('menubar')
const fs = require('fs')
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

const openFile = exports.openFile = (file = getFile()) => {
  if(!file) return
  const content = fs.readFileSync(file).toString()
  if(!content) return
  return content
}

const getFile = exports.getFile = () => {
  const files = dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      {name: 'Code', extensions: ['js']}
    ]
  })

  if(!files) return

  const file = files[0]
  return file
}

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
