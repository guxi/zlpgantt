const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {

  handleGetData: (callback) => {
    ipcRenderer.on('GetData', callback);
  },

  setDrogFile: (filePath) => {
    ipcRenderer.send('set-DrogFile', filePath);
  },



});

