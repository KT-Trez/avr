import * as fs from 'fs';
import {videoFormat} from 'ytdl-core';
import LocalCache from '../services/LocalCache';
import {IpcMainHandler} from '../types/interfaces';


const YTDownload = require('ytdl-core');

const handler: IpcMainHandler = {
	execute: async (event, url: string, format: videoFormat) => {
		let fileExtension = 'mp4';
		if (format.hasAudio && !format.hasVideo)
			fileExtension = 'mp3';
		const videoID = YTDownload.getVideoID(url);

		const cacheKey = videoID + '-' + fileExtension + '-' + (format.audioBitrate ?? 0) + 'x' + (format.qualityLabel ?? '0p');
		if (LocalCache.readRecordingInfo(cacheKey))
			return //todo: inform user, that video has already been downloaded;
		LocalCache.cacheRecordingInfo(cacheKey, false);

		const path = '../downloads/' + fileExtension + '-' + (format.audioBitrate ?? 0) + 'x' + (format.qualityLabel ?? '0p') + '-' + videoID + '-' + new Date().getTime() + '.' + fileExtension;
		await YTDownload(url, {
			filter: (vFormat: videoFormat) => vFormat.audioBitrate === format.audioBitrate && vFormat.qualityLabel === format.qualityLabel
		}).pipe(fs.createWriteStream(path));

		// todo: inform client about successful download
		LocalCache.cacheRecordingInfo(cacheKey, true);
		console.log('[INFO] Downloaded: ' + path);
	},
	name: 'get-recording',
	type: 'on'
};

export default handler;