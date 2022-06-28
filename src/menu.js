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

        console.log("result.filePaths[0]:" + result.filePaths[0]);
        data = fs.readFileSync(result.filePaths[0], "utf-8");
        console.log(data);
        mainWindow.webContents.send('GetData', data);

      }).catch(err => {
        console.log(err)
      })

    }
  },
  {
    label: '示例',
    click: () => {

      console.log("PAth ================:" + path.join(__dirname, 'samplesource.txt'));
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

const setMenu = () => {

  var list = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(list);
}


export { setMenu };

