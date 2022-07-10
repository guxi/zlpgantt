const { Menu, dialog } = require('electron')
const fs = require("fs");
const path = require('path');

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
    click: () => {//点击事件
      var win = new BrowserWindow({
        width: 500,
        height: 400,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
      })
      win.setMenu(null);
      win.loadFile(path.join(__dirname, 'help.html'))
      win.on('closed', () => {
        win = null
      })
    }
  }, {
    label: '关于',
    role: 'about'
  }]
},

];

var list = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(list);

