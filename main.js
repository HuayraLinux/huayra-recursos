const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = require('electron-is-dev');   
const ipc = require('electron').ipcMain;

const { fileSystem } = require('./utils');

const config = {
  baseDir: '/tmp'

};
 
ipc.on('inspect-dir', (e, dir) => {
  const fullDir = `${config.baseDir}/${dir}`;
  console.log(fileSystem().readDir(fullDir));
});
 
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
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
