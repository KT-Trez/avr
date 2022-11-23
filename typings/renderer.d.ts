import {IpcRendererEvent} from 'electron';
import {VideoSearchResult} from 'yt-search';
import {videoFormat} from 'ytdl-core';
import {NotificationSeverity} from './enums';
import {YT_DL} from './index';
import {NotificationVariant} from './types';
import FileStats = YT_DL.Core.Stats.FileStats;


declare global {
	interface EventTarget {
		addEventListener<K extends keyof YT_DL.GUI.Events.CustomEventMap>(type: K, listener: (this: Document, ev: YT_DL.GUI.Events.CustomEventMap[K]) => void): void;
		removeEventListener<K extends keyof YT_DL.GUI.Events.CustomEventMap>(type: K, listener: (this: Document, ev: YT_DL.GUI.Events.CustomEventMap[K]) => void): void;
	}

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
	// todo: add custom type that reflects deleted properties
	getFormats: (url: string) => Promise<videoFormat[]>;
	notify: (cb: (event: IpcRendererEvent, message: string, severity: NotificationSeverity, title?: string, variant?: NotificationVariant) => void) => void;
	openDownloads: () => void;
	openDownloadsFile: (filename: string) => void;
	searchVideos: (keywords: string) => Promise<VideoSearchResult[]>;
}