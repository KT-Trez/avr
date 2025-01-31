import { contextBridge, ipcRenderer } from 'electron';

/** @type {ElectronAPI} */
const api = {
  openDownloadsDir: () => ipcRenderer.send('open:downloadsDir'),
  readDownloadsDir: () => ipcRenderer.invoke('read:downloadsDir'),
};

contextBridge.exposeInMainWorld('electronAPI', api);

