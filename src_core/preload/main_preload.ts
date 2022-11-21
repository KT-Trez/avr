import {contextBridge, ipcRenderer} from 'electron';
import {videoFormat} from 'ytdl-core';
import {YT_DL} from '../../typings';
import {NotificationSeverity} from '../../typings/enums';
import {NotificationVariant} from '../../typings/types';
import IpcRendererEvent = Electron.IpcRendererEvent;


contextBridge.exposeInMainWorld('coreAPI', {
	deleteFromDownloads: (path: string) => ipcRenderer.send('downloads:delete', path),
	downloadVideo: (format: videoFormat, url: string) => ipcRenderer.send('video:download', format, url),
	downloadPartialVideo: (formats: { details: videoFormat, type: 'audio' | 'video' }[], recordingDurationSec: number, recordingURL: string) => ipcRenderer.send('video:advancedDownload', formats, recordingDurationSec, recordingURL),
	getCurrentDownloads: () => ipcRenderer.invoke('currentDownloads:get'),
	getDownloads: () => ipcRenderer.invoke('downloads:get'),
	getFormats: (url: string) => ipcRenderer.invoke('formats:get', url),
	notify: (cb: (event: IpcRendererEvent, message: string, severity: NotificationSeverity, title?: string, variant?: NotificationVariant) => void) => ipcRenderer.on('notification', cb),
	notifyProgress: (cb: (event: IpcRendererEvent, id: string, progresses: YT_DL.Core.Stats.Progress[]) => void) => ipcRenderer.on('notification:progress', cb),
	openDownloads: () => ipcRenderer.send('downloads:open'),
	openDownloadsFile: (filename: string) => ipcRenderer.send('downloads:openFile', filename),
	searchVideos: (keywords: string) => ipcRenderer.invoke('video:search', keywords)
});