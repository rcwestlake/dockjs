const { app, dialog } = require('electron')
const menubar = require('menubar')
const fs = require('fs')
const mock = require('../tests/mocks')

const appTitle = 'DockJS'

const mb = menubar({
  width: 800,
  height: 600,
  index: `file://${__dirname}/index.html`,
  icon: './app/icons/blue-cup@2x.png'
})

mb.on('ready', function ready () {
  console.log('dockjs is ready')
})

mb.on('after-create-window', () => {
  mb.window.webContents.openDevTools()
})

mb.on('close', () => {
  if(mb.isDocumentEdited()) {
    const result = dialog.showMessageBox(mb, {
        type: 'warning',
        title: 'Quit with Unsaved Changes?',
        message: 'You have unsaved changes. Are you sure you want to quit?',
        buttons: [
          'Quit Anyway',
          'Cancel'
        ],
        defaultId: 0,
        cancelId: 1
      })

    if(result === 0) mb.destroy()
  }
})

const quitApp = exports.quitApp = () => {
  app.quit()
}

const openFile = exports.openFile = (file = getFile()) => {
  if(!file) return
  const content = fs.readFileSync(file).toString()
  if(!content) return
  return content
}

const getFile = () => {
  const files = dialog.showOpenDialog(mb, {
    title: 'Open File - ' + appTitle,
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
  dialog.showSaveDialog({
    title: 'Save Code - ' + appTitle,
    filters: [
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

mb.on('after-show', () => {
  mb.tray.setImage('./app/icons/red-cup@2x.png')
})

mb.on('after-hide', () => {
  mb.tray.setImage('./app/icons/blue-cup@2x.png')
})

if (process.env.SPECTRON) {
  mock(dialog)
}
