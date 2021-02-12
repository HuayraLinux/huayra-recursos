const path = require('path');

const { app, BrowserWindow, protocol, ipcMain } = require('electron');

const config = {
  baseDir: process.env.RESOURCES_FOLDER
};
const reactDevServer = process.env.REACT_DEV_SERVER;

const createWindow = () => {
  let mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startURL = reactDevServer || `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startURL);
  // mainWindow.setFullScreen(true);
  mainWindow.setResizable(false);
  mainWindow.setMaximizable(false);
  mainWindow.webContents.openDevTools();

  ipcMain.on('build-filename', (e, file) => {
    const filePath = `${config.baseDir}/${file}`;
    mainWindow.webContents.send('build-filename-result', filePath);
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  const protocolName = 'proto-propio';
  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, '')
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
