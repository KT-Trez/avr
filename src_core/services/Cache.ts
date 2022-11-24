import {videoFormat} from 'ytdl-core';
import {YT_DL} from '../../typings';


export default class Cache {
	public static downloads = new Map<string, YT_DL.Core.Cache.Download>();
	public static downloaded = new Set();

	public static getQueue() {
		return [...this.downloads.values()].filter(d => d.isSubscribed);
	}

	public static unsubscribeItem(ids: string[]) {
		for (const id of ids) {
			const download = this.downloads.get(id);
			if (download!.hasFinished) {
				this.downloads.delete(id);
				continue;
			}

			Object.assign(download!, {
				isSubscribed: false
			});

			this.downloads.set(id, download!);
		}
	}

	public static updateDownloadProgress(id: string, hasFinished: boolean, progress: number) {
		const download = this.downloads.get(id);
		if (!download)
			return;

		if (hasFinished && !download.isSubscribed)
			return this.downloads.delete(id);

		Object.assign(download, {
			hasFinished,
			progress
		});

		this.downloads.set(id, download);
	}

	public static updateDownloadStatus(id: string, status: string) {
		const download = this.downloads.get(id);
		if (!download)
			return;

		Object.assign(download, {
			status
		});

		this.downloads.set(id, download);
	}

	// important todo: refactor legacy code below
	private static recordingFormats: Map<string, videoFormat[]>;

	// methods saving items to cache
	static cacheRecordingFormats(url: string, formats: videoFormat[]) {
		const cache = this.getRecordingFormatsStore();
		if (cache.size >= 250)
			cache.clear();

		cache.set(url, formats);
	}

	// methods checking if cache includes item
	static hasRecordingFormats(url: string) {
		const cache = this.getRecordingFormatsStore();
		return cache.has(url);
	}

	static readRecordingFormats(url: string) {
		const cache = this.getRecordingFormatsStore();
		if (cache.has(url))
			return cache.get(url);
	}

	// private methods initializing cache
	private static getRecordingFormatsStore() {
		if (!this.recordingFormats)
			this.recordingFormats = new Map();
		return this.recordingFormats;
	}
}