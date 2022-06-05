export interface QueueEntryMetadata {
	audioProgress: number;
	hasAudio: boolean;
	hasMerge: boolean;
	hasVideo: boolean;
	// todo: implement damage notification
	//isAudioDamaged: boolean;
	isAudioDownloaded: boolean;
	//isDamaged: boolean;
	isDownloaded: boolean;
	isMerged: boolean;
	//isVideoDamaged: boolean;
	isVideoDownloaded: boolean;
	mergeProgress: number;
	name: string;
	videoProgress: number;
}

export interface FileInfo {
	created: Date;
	media: 'mp3' | 'mp4' | 'wav';
	modified: Date;
	name: string;
	size: {
		unit: 'B' | 'KB' | 'MB' | 'GB' | 'TB';
		value: number;
	}
}

export interface RecordingFormat {
	approxDurationMs: string;
	audioBitrate: number;
	audioChannels: number;
	audioCodec: string;
	audioSampleRate: string;
	audioQuality: string;
	averageBitrate: number;
	codecs: string;
	container: string;
	contentLength: string;
	bitrate: number;
	fps: number;
	hasAudio: boolean;
	hasVideo: boolean;
	height: number;
	isDashMPD: boolean;
	isHLS: boolean;
	isLive: boolean;
	itag: number;
	lastModified: string;
	mimeType: string;
	projectionType: string;
	quality: string;
	qualityLabel: string;
	url: string;
	videoCodec: string;
	width: number;
}

export interface Video {
	ago: string;
	author: {
		name: string;
		url: string;
	}
	description: string;
	duration: {
		seconds: number;
		timestamp: string;
		toString: () => string;
	}
	image: string;
	thumbnail: string;
	title: string;
	type: string;
	url: string;
	videoId: string;
	views: number;
}