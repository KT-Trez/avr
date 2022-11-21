import * as Electron from 'electron';
import {VideoSearchResult} from 'yt-search';
import {videoFormat} from 'ytdl-core';
import {NotificationSeverity} from './enums';
import {YT_DL} from './index';
import {NotificationVariant} from './types';
import IpcRendererEvent = Electron.IpcRendererEvent;
import FileStats = YT_DL.Core.Stats.FileStats;


declare global {
	interface Window {
		coreAPI: ElectronCoreAPI;
	}
}

export interface ElectronCoreAPI {
	deleteFromDownloads: (path: string) => void;
	downloadVideo: (format: videoFormat, url: string) => void;
	downloadPartialVideo: (formats: { details: videoFormat, type: 'audio' | 'video' }[], recordingDurationSec: number, recordingURL: string) => void;
	getCurrentDownloads: () => string[];
	getDownloads: () => Promise<FileStats[]>;
	getFormats: (url: string) => videoFormat[];
	// todo: add custom type that reflects deleted properties
	getVideos: (keywords: string) => VideoSearchResult[];
	notify: (cb: (event: IpcRendererEvent, message: string, severity: NotificationSeverity, title?: string, variant?: NotificationVariant) => void) => void;
	openDownloads: () => void;
	openDownloadsFile: (filename: string) => void;
}