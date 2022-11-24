import {IpcRendererEvent} from 'electron';
import {VideoSearchResult} from 'yt-search';
import {videoFormat} from 'ytdl-core';
import {NotificationSeverity} from './enums';
import {YT_DL} from './index';
import {NotificationVariant} from './types';
import Core = YT_DL.Core;
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
	downloadMedia: (format: videoFormat, title: string, url: string) => void;
	downloadAndMergeMedia: (formats: { details: videoFormat, type: 'audio' | 'video' }[], durationSec: number, title: string, url: string) => void;
	getDownloads: () => Promise<FileStats[]>;
	// todo: add custom type that reflects deleted properties
	getFormats: (url: string) => Promise<videoFormat[]>;
	notify: (cb: (event: IpcRendererEvent, message: string, severity: NotificationSeverity, title?: string, variant?: NotificationVariant) => void) => void;
	openDownloads: () => void;
	openDownloadsFile: (filename: string) => void;
	queueGetUpdate: () => Promise<Core.Cache.Download[]>;
	queueUnsubscribeItem: (ids: string[]) => void;
	queueUpdate: (cb: () => void) => void;
	searchVideos: (keywords: string) => Promise<VideoSearchResult[]>;
}