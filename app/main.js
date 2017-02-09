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

const getFile = () => {
  const files = dialog.showOpenDialog(mb, {
    properties: ['openFile'],
    filters: [
      {name: 'Code', extensions: ['js']}
    ]
  })

  if(!files) return

  const file = files[0]
  return file
}

const saveFile = exports.saveFile = (code) => {
  dialog.showSaveDialog({ filters: [
     { name: 'code', extensions: ['js', 'json'] }
   ]}, (file) => {
    if (file === undefined) return

    fs.writeFile(file, code, (err) => {
      if(err !== null) {
        console.error('Error in save process :', err);
        dialog.showErrorBox('File Save Error: ', err)
      }
    });
  });
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
