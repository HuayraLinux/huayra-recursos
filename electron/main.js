const fs = require('fs');
const path = require('path');

const {
  app,
  BrowserWindow,
  protocol,
  ipcMain,
  shell,
  Menu,
  globalShortcut,
} = require('electron');

const config = require('./config');

const reactDevServer = process.env.REACT_DEV_SERVER;

const createWindow = () => {
  let mainWindow = new BrowserWindow({
    width: config.width,
    height: config.height,
    minWidth: config.width,
    minHeight: config.height,
    webPreferences: {
      nodeIntegration: true,
      devTools: reactDevServer && true,
    },
  });

  const startURL = reactDevServer || `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startURL);
  mainWindow.setPosition(0, 0);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setTitle('Recursos Educativos Abiertos');
  
  if (reactDevServer) {
    mainWindow.webContents.openDevTools();
  } else {
    Menu.setApplicationMenu(Menu.buildFromTemplate([]));
  }

  ipcMain.on('build-filename', (e, file) => {
    const filePath = `${config.baseDir}/${file}`;
    const response = { filePath };

    try {
      fs.accessSync(filePath);
    } catch (e) {
      response.error = true;
    } finally {
      mainWindow.webContents.send('build-filename-result', response);
    }
  });

  ipcMain.on('open-in-folder', (e, file) => shell.showItemInFolder(file));
  ipcMain.on('open-file', (e, file) => shell.openPath(file));
  ipcMain.on('open-resource-folder', (e, file) => shell.openPath(config.baseDir));

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  if (!reactDevServer) {
    globalShortcut.register('CommandOrControl+R', () => null);
    globalShortcut.register('F5', () => null);
  }

  const protocolName = 'proto-propio';
  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, '')
    try {
      return callback(decodeURIComponent(url))
    } catch (error) {
      console.error(error)
    }
  });

  createWindow();
});
