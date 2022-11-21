import * as fs from 'fs';
import * as path from 'path';
import {videoFormat} from 'ytdl-core';
import {NotificationSeverity} from '../../typings/enums';
import {Messenger} from '../classes/Messenger';
import LocalCache from '../services/LocalCache';
import {IpcMainHandler} from '../types/interfaces';
import {downloadsPath} from '../utils/paths';


const YTDownload = require('ytdl-core');

const handler: IpcMainHandler = {
	execute: async (event, format: videoFormat, url: string) => {
		let fileExtension = 'mp4';
		if (format.hasAudio && !format.hasVideo)
			fileExtension = 'mp3';

		const videoID = YTDownload.getVideoID(url);
		const saveName = fileExtension + '-' + (format.audioBitrate ?? 0) + 'x' + (format.qualityLabel ?? '0p') + '-' + videoID + '-' + new Date().getTime() + '.' + fileExtension;
		const savePath = path.resolve(downloadsPath, saveName);

		const downloadID = videoID + '-' + (format.audioBitrate ?? 0) + 'x' + (format.qualityLabel ?? '0p') + '-' + format.codecs;
		const downloadFlag = LocalCache.readRecordingIsDownloaded(downloadID);
		if (downloadFlag)
			Messenger.notify('Selected format has been already downloaded', NotificationSeverity.Warning);
		else
			LocalCache.cacheRecordingIsDownloaded(downloadID, true);

		Messenger.notify('Downloading: ' + videoID, NotificationSeverity.Info);

		console.info('[INFO] Starting recording search.');
		LocalCache.cacheOngoingDownload(saveName);
		// todo:
		//Core.getInstance().getBrowserWindow().webContents.send('search-advanced-start', saveName, format.hasAudio, format.hasVideo, false);

		let recordingPercent = 0;
		let recordingProgress = 0;
		await YTDownload(url, {
			filter: (vFormat: videoFormat) => vFormat.audioBitrate === format.audioBitrate && vFormat.qualityLabel === format.qualityLabel
		})
			.on('progress', (segmentSize: number, segmentsSum: number, totalSegments: number) => {
				recordingPercent = segmentsSum / totalSegments * 100;
				if (recordingPercent >= recordingProgress + 1) {
					console.info('[INFO] Recording search progress: ' + recordingPercent);
					// todo:
					//Core.getInstance().getBrowserWindow().webContents.send('search-advanced-progress', saveName, format.hasAudio ? recordingPercent : null, format.hasVideo ? recordingPercent : null);
					recordingPercent += 1;
				}
			})
			.on('error', (err: Error) => {
				console.error('[ERROR] Cannot search audio: ' + err.message);
				Messenger.notify('Error, download ' + videoID + ' unsuccessful', NotificationSeverity.Error);
			})
			.pipe(fs.createWriteStream(savePath)
				.on('error', (err: Error) => {
					console.error('[ERROR] Cannot save audio: ' + err.message);
					Messenger.notify('Error, cannot save ' + videoID, NotificationSeverity.Error);
				})
				.on('finish', () => {
					console.info('[SUCCESS] Downloads: ' + savePath);
					Messenger.notify('Download ' + videoID + ' ended', NotificationSeverity.Success);
				}));
	},
	name: 'video:download',
	type: 'on'
};

export default handler;