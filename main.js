const { app, BrowserWindow } = require("electron");
const path = require("path");

app.commandLine.appendSwitch("no-sandbox");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true
    },
    icon: path.join(__dirname, "assets", "icon.png"),
  });
  mainWindow.setMenu(null);
  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
