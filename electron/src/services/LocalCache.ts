import {videoFormat} from 'ytdl-core';


export default class LocalCache {
	private static recordingFormats: Map<string, videoFormat[]>
	private static recordingInfo: Map<string, boolean>;

	// methods saving items to cache
	static cacheRecordingFormats(url: string, formats: videoFormat[]) {
		const cache = this.getRecordingFormatsStore();
		if (cache.size >= 250)
			cache.clear();

		cache.set(url, formats);

	}

	static cacheRecordingInfo(id: string, isDownloaded: boolean) {
		const cache = this.getRecordingInfoStore();
		if (cache.size >= 100)
			cache.clear();

		cache.set(id, isDownloaded);
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

	// methods reading cache item
	static readRecordingInfo(id: string) {
		const cache = this.getRecordingInfoStore();
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

	private static getRecordingInfoStore() {
		if (!this.recordingInfo)
			this.recordingInfo = new Map();
		return this.recordingInfo;
	}
}