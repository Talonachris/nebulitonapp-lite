const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let splash;

function createWindow() {
  // Splash-Screen
  splash = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    center: true,
    show: true,
  });

  splash.loadFile('splash.html');

  // Hauptfenster
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true
    },
  });

  mainWindow.loadFile('index.html');

  setTimeout(() => {
    splash.close();
    mainWindow.show();
  }, 3000);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
