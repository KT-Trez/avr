import * as fs from 'fs';
import {videoFormat} from 'ytdl-core';
import Core from '../../core';
import LocalCache from '../services/LocalCache';
import {NotificationSeverity} from '../types/enums';
import {IpcMainHandler} from '../types/interfaces';


const YTDownload = require('ytdl-core');

const handler: IpcMainHandler = {
	execute: async (event, url: string, format: videoFormat) => {
		let fileExtension = 'mp4';
		if (format.hasAudio && !format.hasVideo)
			fileExtension = 'mp3';
		const videoID = YTDownload.getVideoID(url);

		const downloadID = videoID + '-' + (format.audioBitrate ?? 0) + 'x' + (format.qualityLabel ?? '0p') + '-' + format.codecs;
		const downloadFlag = LocalCache.readRecordingIsDownloaded(downloadID);
		if (downloadFlag)
			Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Warning, `Recording in selected format is already downloaded.`);
		else
			LocalCache.cacheRecordingIsDownloaded(downloadID, true);

		const name = fileExtension + '-' + (format.audioBitrate ?? 0) + 'x' + (format.qualityLabel ?? '0p') + '-' + videoID + '-' + new Date().getTime() + '.' + fileExtension;
		const path = '../downloads/' + name;
		await YTDownload(url, {
			filter: (vFormat: videoFormat) => vFormat.audioBitrate === format.audioBitrate && vFormat.qualityLabel === format.qualityLabel
		}).pipe(fs.createWriteStream(path));

		if (!downloadFlag)
			Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Success, 'Saved as: ' + name);
		console.log('[INFO] Downloaded: ' + path);
	},
	name: 'get-recording',
	type: 'on'
};

export default handler;