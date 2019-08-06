const { app, BrowserWindow, ipcMain, Menu, WebContents } = require('electron');
let appWindow;
let infoWindow;

function createWindows() {
    appWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
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

    appWindow.on('close', () => {
        infoWindow.close();
        infoWindow = null;
        appWindow = null;
    })

    infoWindow = new BrowserWindow({
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
        infoWindow.hide();
    });

    ipcMain.on('showAbout', (event) => {
        infoWindow.show();
    });
}

const menuTemplate = [
    {
        label: 'About',
        submenu: [
            {
                role: 'close'
            },
            {
                label: 'Visit my site',
                click() {
                    require('electron').shell.openExternal('https://jtzcode.github.io');
                }
            },
            {
                label: 'Show about',
                accelerator: 'Ctrl+Shift+U',
                click() {
                    appWindow.webContents.send('showAbout');
                }
            }
        ]
    }
];

const newMenu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(newMenu);

app.on('ready', createWindows);