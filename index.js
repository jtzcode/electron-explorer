const { app, BrowserWindow, ipcMain} = require('electron');

function createWindows() {
    let appWindow = new BrowserWindow({
        show: false
    });
    //appWindow.loadURL('https://www.citrix.com');
    appWindow.loadFile('./pages/index.html');
    appWindow.once('ready-to-show', () => {
        appWindow.maximize();
        appWindow.show();
        setTimeout(() => {
            infoWindow.show();
        }, 2000);
    });

    appWindow.on('closeInfoWindow', () => {
        infoWindow.hide();
    });

    let infoWindow = new BrowserWindow({
        width: 275,
        height: 300,
        show: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    infoWindow.loadFile('./pages/about.html');

    ipcMain.on('closeInfoWindow', (event) => {
        infoWindow.close();
    });
}

app.on('ready', createWindows);