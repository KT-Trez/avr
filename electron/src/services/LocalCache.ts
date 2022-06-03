import {videoFormat} from 'ytdl-core';


export default class LocalCache {
	private static recordingFormats: Map<string, videoFormat[]>
	private static recordingIsDownloaded: Map<string, boolean>;

	// methods saving items to cache
	static cacheRecordingFormats(url: string, formats: videoFormat[]) {
		const cache = this.getRecordingFormatsStore();
		if (cache.size >= 250)
			cache.clear();

		cache.set(url, formats);

	}

	static cacheRecordingIsDownloaded(id: string, isDownloaded: boolean) {
		const cache = this.getRecordingIsDownloadedStore();
		if (cache.size >= 100)
			cache.clear();

		cache.set(id, isDownloaded);
	}

	// methods clearing saved items from cache
	static clearRecordingIsDownloaded(id: string) {
		const cache = this.getRecordingIsDownloadedStore();
		cache.delete(id);
	}

	// methods checking if cache includes item
	static hasRecordingFormats(url: string) {
		const cache = this.getRecordingFormatsStore();
		return cache.has(url);
	}

	// methods reading cache item
	static readRecordingFormats(url: string) {
		const cache = this.getRecordingFormatsStore();
		if (cache.has(url))
			return cache.get(url);
	}

	static readRecordingIsDownloaded(id: string) {
		const cache = this.getRecordingIsDownloadedStore();
		if (cache.has(id))
			return cache.get(id);
		else
			return false;
	}

	// private methods initializing cache
	private static getRecordingFormatsStore() {
		if (!this.recordingFormats)
			this.recordingFormats = new Map();
		return this.recordingFormats;
	}

	private static getRecordingIsDownloadedStore() {
		if (!this.recordingIsDownloaded)
			this.recordingIsDownloaded = new Map();
		return this.recordingIsDownloaded;
	}
}