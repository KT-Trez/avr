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
		const saveName = fileExtension + '-' + (format.audioBitrate ?? 0) + 'x' + (format.qualityLabel ?? '0p') + '-' + videoID + '-' + new Date().getTime() + '.' + fileExtension;
		const savePath = '../downloads/' + saveName;

		const downloadID = videoID + '-' + (format.audioBitrate ?? 0) + 'x' + (format.qualityLabel ?? '0p') + '-' + format.codecs;
		const downloadFlag = LocalCache.readRecordingIsDownloaded(downloadID);
		if (downloadFlag)
			Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Warning, `Recording in selected format has been already downloaded.`);
		else
			LocalCache.cacheRecordingIsDownloaded(downloadID, true);

		Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Information, 'Downloading video: ' + videoID);

		console.log('[INFO] Starting recording download.');
		LocalCache.cacheOngoingDownload(saveName);
		Core.getInstance().getBrowserWindow().webContents.send('download-advanced-start', saveName, format.hasAudio, format.hasVideo, false);

		let recordingPercent = 0;
		let recordingProgress = 0;
		await YTDownload(url, {
			filter: (vFormat: videoFormat) => vFormat.audioBitrate === format.audioBitrate && vFormat.qualityLabel === format.qualityLabel
		})
			.on('progress', (segmentSize: number, segmentsSum: number, totalSegments: number) => {
				recordingPercent = segmentsSum / totalSegments * 100;
				if (recordingPercent >= recordingProgress + 1) {
					console.log('[INFO] Recording download progress: ' + recordingPercent);
					Core.getInstance().getBrowserWindow().webContents.send('download-advanced-progress', saveName, format.hasAudio ? recordingPercent : null, format.hasVideo ? recordingPercent : null);
					recordingPercent += 1;
				}
			})
			.on('error', (err: Error) => {
				console.log('[ERROR] Cannot download audio: ' + err.message);
				Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Error, 'Error while downloading recording: ' + videoID + '.');
			})
			.pipe(fs.createWriteStream(savePath)
				.on('finish', () => {
					console.log('[SUCCESS] Downloaded: ' + savePath);
					Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Success, 'Saved as: ' + saveName);
				}));
	},
	name: 'get-recording',
	type: 'on'
};

export default handler;