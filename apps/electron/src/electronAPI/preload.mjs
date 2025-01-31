import { contextBridge, ipcRenderer } from 'electron';

/** @type {ElectronAPI} */
const api = {
  openDownloadsDir: () => ipcRenderer.send('open:downloadsDir'),
  readDownloadsDir: () => ipcRenderer.invoke('read:downloadsDir'),
  searchMedia: (page, searchPhrase) => ipcRenderer.invoke('search:media', page, searchPhrase),
};

contextBridge.exposeInMainWorld('electronAPI', api);

