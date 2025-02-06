import { contextBridge, ipcRenderer } from 'electron';

/** @type {ElectronAPI} */
const api = {
  downloadMedia: (formats) => ipcRenderer.send('download:media', formats),
  openDownloadsDir: () => ipcRenderer.send('open:downloadsDir'),
  readDownloadsDir: () => ipcRenderer.invoke('read:downloadsDir'),
  searchMedia: (page, searchPhrase) => ipcRenderer.invoke('search:media', page, searchPhrase),
  searchMediaFormats: (url) => ipcRenderer.invoke('search:mediaFormats', url),
};

contextBridge.exposeInMainWorld('electronAPI', api);

