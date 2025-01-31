// import { contextBridge, ipcRenderer } from 'electron';
// import type { videoFormat } from 'ytdl-core';
// import type { NotificationSeverity } from '../../typings/enums';
// import type { NotificationVariant } from '../../typings/types';
// import IpcRendererEvent = Electron.IpcRendererEvent;
//
// contextBridge.exposeInMainWorld('coreAPI', {
//   deleteFromDownloads: (path: string) => ipcRenderer.send('downloads:delete', path),
//   downloadMedia: (format: videoFormat, title: string, url: string) =>
//       ipcRenderer.send('media:download', format, title, url),
//   downloadAndMergeMedia: (
//       formats: { details: videoFormat; type: 'audio' | 'video' }[],
//       durationSec: number,
//       title: string,
//       url: string,
//   ) => ipcRenderer.send('media:downloadAndMerge', formats, durationSec, title, url),
//   getDownloads: () => ipcRenderer.invoke('downloads:get'),
//   getFormats: (url: string) => ipcRenderer.invoke('formats:get', url),
//   notify: (
//       cb: (
//           event: IpcRendererEvent,
//           message: string,
//           severity: NotificationSeverity,
//           title?: string,
//           variant?: NotificationVariant,
//       ) => void,
//   ) => ipcRenderer.on('notification', cb),
//   openDownloads: () => ipcRenderer.send('downloads:open'),
//   openDownloadsFile: (filename: string) => ipcRenderer.send('downloads:openFile', filename),
//   queueGetUpdate: () => ipcRenderer.invoke('queue:getUpdate'),
//   queueUnsubscribeItem: (ids: string[]) => ipcRenderer.send('queue:unsubscribeItem', ids),
//   queueUpdate: (cb: () => void) => ipcRenderer.on('notify:queueUpdate', cb),
//   searchVideos: (keywords: string) => ipcRenderer.invoke('video:search', keywords),
// });
