const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');   
const path = require('path');
 
let mainWindow;
 
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    show: false
  });

  const startURL = isDev ? 'http://localhost:3002' : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startURL);
  // mainWindow.setFullScreen(true);
  mainWindow.setResizable(false);
  mainWindow.setMaximizable(false);
  mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('closed', () => {
      mainWindow = null;
  });
}
app.on('ready', createWindow);
