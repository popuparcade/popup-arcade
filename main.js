var app = require('app')
var Menu = require('menu')
var BrowserWindow = require('browser-window')
require('electron-debug')()

app.on('window-all-closed', function () {
  app.quit()
})

app.on('ready', function () {
  var win = new BrowserWindow({
    title: 'Popup Arcade Demo',
    'title-bar-style': 'hidden',
    width: 1200,
    height: 800,
    minWidth: 700,
    minHeight: 300
  })

  win.loadURL('file://' + __dirname + '/index.html')

  win.on('closed', function () {
    win = null
  })
})