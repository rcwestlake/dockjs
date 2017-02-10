const { app, BrowserWindow } = require('electron')
const menubar = require('menubar')
const mock = require('../tests/mocks')

const mb = menubar({
  width: 800,
  height: 600,
  icon: './app/icons/blue-cup@2x.png'
})

mb.on('ready', function ready () {
  console.log('dockjs is ready')
})

mb.on('after-create-window', () => {
  mb.window.loadURL(`file://${__dirname}/index.html`)
  mb.window.webContents.openDevTools()
})

mb.on('after-show', () => {
  mb.tray.setImage('./app/icons/red-cup@2x.png')
})

mb.on('after-hide', () => {
  mb.tray.setImage('./app/icons/blue-cup@2x.png')
})

if (process.env.SPECTRON) {
  mock(dialog)
}
