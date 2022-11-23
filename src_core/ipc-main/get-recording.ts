import * as fs from 'fs';
import * as path from 'path';
import {videoFormat} from 'ytdl-core';
import {NotificationSeverity, ProgressAction, ProgressType} from '../../typings/enums';
import {IpcMainHandler} from '../../typings/interfaces-core';
import {Messenger} from '../classes/Messenger';
import LocalCache from '../services/LocalCache';
import {getPath} from '../tools/getPath';


const YTDownload = require('ytdl-core');

const handler: IpcMainHandler = {
	execute: async (event, format: videoFormat, url: string) => {
		let fileExtension = 'mp4';
		if (format.hasAudio && !format.hasVideo)
			fileExtension = 'mp3';

		const videoID = YTDownload.getVideoID(url);
		const saveName = fileExtension + '-' + (format.audioBitrate ?? 0) + 'x' + (format.qualityLabel ?? '0p') + '-' + videoID + '-' + new Date().getTime() + '.' + fileExtension;
		const savePath = path.join(getPath('downloads'), saveName);

		const downloadID = videoID + '-' + (format.audioBitrate ?? 0) + 'x' + (format.qualityLabel ?? '0p') + '-' + format.codecs;
		const downloadFlag = LocalCache.readRecordingIsDownloaded(downloadID);
		if (downloadFlag)
			Messenger.notify('Selected format has been already downloaded', NotificationSeverity.Warning);
		else
			LocalCache.cacheRecordingIsDownloaded(downloadID, true);

		Messenger.notify('Downloading: [' + videoID +']', NotificationSeverity.Info);

		console.info('[INFO] Starting recording download.');
		LocalCache.cacheOngoingDownload(saveName);

		Messenger.notifyAboutDownload([{action: ProgressAction.Download, type: ProgressType.AudioAndVideo}], videoID, url);

		let recordingPercent = 0;
		let recordingProgress = 0;
		await YTDownload(url, {
			filter: (vFormat: videoFormat) => vFormat.audioBitrate === format.audioBitrate && vFormat.qualityLabel === format.qualityLabel
		})
			.on('progress', (segmentSize: number, segmentsSum: number, totalSegments: number) => {
				recordingPercent = segmentsSum / totalSegments * 100;
				if (recordingPercent >= recordingProgress + 1) {
					console.info('[INFO] Recording download progress: ' + recordingPercent);
					Messenger.notifyProgress(videoID, [{
						action: ProgressAction.Download,
						type: ProgressType.AudioAndVideo,
						value: recordingPercent
					}]);
					recordingPercent += 1;
				}
			})
			.on('error', (err: Error) => {
				console.error('[ERROR] Cannot download audio: ' + err.message);
				Messenger.notify('Error, download [' + videoID + '] unsuccessful', NotificationSeverity.Error);
			})
			.pipe(fs.createWriteStream(savePath)
				.on('error', (err: Error) => {
					console.error('[ERROR] Cannot save audio: ' + err.message);
					Messenger.notify('Error, cannot save download [' + videoID + ']', NotificationSeverity.Error);
				})
				.on('finish', () => {
					console.info('[SUCCESS] Downloads: ' + savePath);
					Messenger.notify('Download [' + videoID + '] ended', NotificationSeverity.Success);
				}));
	},
	name: 'video:download',
	type: 'on'
};

export default handler;