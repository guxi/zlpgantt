const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const path = require('path');
// const fs = require("fs");
//const menu = require("./menu.js")
const datafile = require("./get-data-file.js");


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}



const createWindow = () => {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    transparent: true,
    // transparent: true,
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'gantt6.png'),
    webPreferences: {
      //nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true, // add this
      preload: path.join(__dirname, 'preload.js')
    }
  });

  ipcMain.on('set-DrogFile', (event, filePath) => {
    let fillesuffix = filePath.substring(filePath.lastIndexOf("."));
    let data;
    if (fillesuffix == ".xlsx") {
      data = datafile.getXlsxFile(filePath);
    }
    else {
      data = datafile.getJsonFile(filePath);
    }
    mainWindow.webContents.send('GetData', data);
  })

  // require(path.join(__dirname, 'menu.js'));

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
          properties: ['openFile'],
          filters: [
            { name: 'Gantt', extensions: ['json', 'JSON', 'xlsx', 'txt'] }
          ]
        }).then(result => {
          let filePath = result.filePaths[0];
          let fillesuffix = filePath.substring(filePath.lastIndexOf("."));
          let data;
          if (fillesuffix == ".xlsx") {
            data = datafile.getXlsxFile(filePath);
          }
          else {
            data = datafile.getJsonFile(filePath);
          }
          mainWindow.webContents.send('GetData', data);
        }).catch(err => {
          console.log(err)
        })
      }
    },
    {
      label: '示例',
      click: () => {
        let fpath = path.join(__dirname, 'samplesource.json')
        let data = datafile.getJsonFile(fpath);
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
      click: () => {//点击事件
        var win = new BrowserWindow({
          width: 400,
          height: 600,
          icon: path.join(__dirname, 'gantt6ß.png')
        })
        win.setMenu(null);
        win.loadFile(path.join(__dirname, 'help.html'))
        win.on('closed', () => {
          win = null
        })
      }
    }, {
      label: '关于',
      click: () => {
        dialog.showMessageBox({
          title: "关于",
          button: "确定",
          type: "info",
          message: "甘特图生成器"
        });
      }
      //  role: 'about'
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


