const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const path = require('path');
const fs = require("fs");
const menu = require("./menu.js")



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}



const createWindow = () => {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // transparent: true,
    width: 800,
    height: 600,
    webPreferences: {
      //nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true, // add this
      preload: path.join(__dirname, 'preload.js')
    }
  });


  ipcMain.on('set-DrogFile', (event, filePath) => {
    try {
      data = fs.readFileSync(filePath, "utf-8");
      mainWindow.webContents.send('GetData', data);
    } catch (err) {
      console.log(err)
    };
    // console.log("handleFileOpen data: " + data);

  })



  /**
   * 设置菜单
   */
  //menu.setMenu();
  const template = [{
    label: '文件',
    submenu: [{
      label: '打开',
      click: () => {
        dialog.showOpenDialog({
          properties: ['openFile']
        }).then(result => {
          data = fs.readFileSync(result.filePaths[0], "utf-8");
          mainWindow.webContents.send('GetData', data);
        }).catch(err => {
          console.log(err)
        })
      }
    },
    {
      label: '示例',
      click: () => {

        console.log(path.join(__dirname, 'samplesource.json'));
        data = fs.readFileSync(path.join(__dirname, 'samplesource.json'), "utf-8");

        mainWindow.webContents.send('GetData', data);
      }

    },

    {
      label: '退出',
      role: 'quit'
    }
    ]
  },
  {
    label: '编辑',
    role: 'editMenu'
  },
  {
    label: '视图',
    role: 'viewMenu'
  },
  {
    label: '帮助',
    submenu: [{
      label: '帮助',
      role: 'help'
    }, {
      label: '关于',
      role: 'about'
    }]
  },

  ];

  var list = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(list);

  /////////////// end 设置菜单 ////////////////////


  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // mainWindow.webContents.openDevTools();// Open the DevTools.
};

app.whenReady().then(() => {


  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


