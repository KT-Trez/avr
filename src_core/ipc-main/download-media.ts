import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import {videoFormat} from 'ytdl-core';
import {NotificationSeverity} from '../../typings/enums';
import {IpcMainHandler} from '../../typings/interfaces-core';
import Download from '../classes/Download';
import {Messenger} from '../classes/Messenger';
import Cache from '../services/Cache';
import {getPath} from '../tools/getPath';


const YTDownload = require('ytdl-core');

const handler: IpcMainHandler = {
	execute: async (event, format: videoFormat, title: string, url: string) => {
		// select extension based on media type
		let fileExt = 'mp4';
		if (format.hasAudio && !format.hasVideo)
			fileExt = 'mp3';

		// set filename, id and path to save selected media
		const mediaID = YTDownload.getVideoID(url);
		const filename = [format.audioBitrate ?? '0', format.qualityLabel ?? '0p', mediaID, crypto.randomUUID()].join('_').concat('.' , fileExt);
		const outputPath = path.join(getPath('downloads'), filename);

		// check if media with chosen audio and video quality was already downloaded; save download 'preset'
		const downloadID = [mediaID, format.audioBitrate ?? '0', format.qualityLabel ?? '0p', format.codecs].join('.');
		const wasDownloaded = Cache.downloaded.has(downloadID);
		if (wasDownloaded)
			Messenger.notify('Media in selected format has been already downloaded', NotificationSeverity.Warning);
		else
			Cache.downloaded.add(downloadID);

		// save download progress to cache; notify user about started download
		console.info('[INFO] Starting media download.');
		Cache.downloads.set(downloadID, new Download({
			hasError: false,
			hasFinished: false,
			id: downloadID,
			isSubscribed: true,
			name: title,
			progress: 0,
			status: 'downloading audio and video'
		}));
		Messenger.notify('Downloading: [' + mediaID + ']', NotificationSeverity.Info);

		// values to calculate approximate download progress
		let mediaDownloadPercent = 0;
		let mediaDownloadPercentInt = 0;

		// download media & handle errors
		await YTDownload(url, {
			filter: (vFormat: videoFormat) => vFormat.audioBitrate === format.audioBitrate && vFormat.qualityLabel === format.qualityLabel
		})
			.on('progress', (segmentSize: number, segmentsSum: number, totalSegments: number) => {
				// update progress in cache only when it's bigger than 1%
				mediaDownloadPercent = segmentsSum / totalSegments * 100;
				if (mediaDownloadPercent >= mediaDownloadPercentInt + 1) {
					console.info('[INFO] Recording download progress: ' + mediaDownloadPercent);

					Cache.updateDownloadProgress(downloadID, false, Math.round(mediaDownloadPercent));
					Messenger.notifyQueueProgress();

					mediaDownloadPercentInt += 1;
				}
			})
			.on('error', (err: Error) => {
				console.error('[ERROR] Cannot download media: ' + err.message);
				Messenger.notify('Error, media download [' + mediaID + '] unsuccessful', NotificationSeverity.Error);
			})
			.pipe(fs.createWriteStream(outputPath)
				.on('error', (err: Error) => {
					console.error('[ERROR] Cannot save media: ' + err.message);
					Messenger.notify('Error, cannot save media [' + mediaID + ']', NotificationSeverity.Error);
				})
				.on('finish', () => {
					console.info('[SUCCESS] Media saved at: ' + outputPath);

					// updated cache so the progress approximation is correct
					Cache.updateDownloadProgress(downloadID, true, 100);
					Messenger.notifyQueueEnd();

					Cache.updateDownloadStatus(downloadID, 'download completed');
					Messenger.notify('Media [' + mediaID + '] saved at [' + filename + ']', NotificationSeverity.Success);
				}));
	},
	name: 'media:download',
	type: 'on'
};

export default handler;