const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = require('electron-is-dev');   
const ipc = require('electron').ipcMain;
const { protocol } = require('electron');

const { fileSystem } = require('./utils');

const config = {
  baseDir: process.env.RESOURCES_FOLDER
};

const createWindow = () => {
  let mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startURL = 'http://localhost:3000';
  // const startURL = isDev ? 'http://localhost:3002' : `file://${path.join(__dirname, '../build/index.html')}`;
  // const startURL = `file://${path.join(__dirname, './build/index.html')}`;

  mainWindow.loadURL(startURL);
  // mainWindow.setFullScreen(true);
  mainWindow.setResizable(false);
  mainWindow.setMaximizable(false);
  mainWindow.webContents.openDevTools();

  ipc.on('build-filename', (e, file) => {
    const filePath = `${config.baseDir}/${file}`;
    mainWindow.webContents.send('build-filename-result', filePath);
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  });

  mainWindow.on('closed', () => {
      mainWindow = null;
  });
}

app.on('ready', () => {
  const protocolName = 'proto-propio';
  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, '')
    console.log(url);
    try {
      return callback(decodeURIComponent(url))
    }
    catch (error) {
      // Handle the error as needed
      console.error(error)
    }
  });

  createWindow();
});
