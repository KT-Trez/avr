import * as path from 'path';
import {videoFormat} from 'ytdl-core';
import {Worker} from 'worker_threads';
import Core from '../../core';
import LocalCache from '../services/LocalCache';
import {NotificationSeverity} from '../types/enums';
import {IpcMainHandler, DownloadWorkerData, WorkerMessage, MergeWorkerData} from '../types/interfaces';
import {FileExtension} from '../types/types';


const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffProbe = require('ffprobe-static');
const YTDownload = require('ytdl-core');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffProbe.path);


const handler: IpcMainHandler = {
	execute: async (event, recordingURL: string, formats: { details: videoFormat, type: 'audio' | 'video' }[], recordingDurationSec: number) => {
		for (const format of formats) {
			if (format.type === 'audio' && !format.details.hasAudio)
				throw Error('Audio format doesn\'t contain audio.');
			if (format.type === 'video' && !format.details.hasVideo)
				throw Error('Video format doesn\'t contain video.');
		}

		const audioFormat = formats.find(format => format.type === 'audio');
		const recordingID = YTDownload.getVideoID(recordingURL);
		const videoFormat = formats.find(format => format.type === 'video');

		const saveName = 'combo-' + (audioFormat ? audioFormat.details.audioBitrate! : 0) + 'x' + (videoFormat ? videoFormat.details.qualityLabel : '0p') + '-' + recordingID + '-' + new Date().getTime() + '.mp4';

		LocalCache.cacheOngoingDownload(saveName);
		Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Information, 'Downloading video: ' + recordingID);
		Core.getInstance().getBrowserWindow().webContents.send('download-advanced-start', saveName, !!audioFormat, !!videoFormat, audioFormat && videoFormat);

		let audioPercent = 0;
		let mergePercent = 0;
		let videoPercent = 0;

		const paths: string[] = await new Promise(resolve => {
			let finishedDownloads = 0;
			const paths: string[] = [];

			for (const format of formats) {
				// todo: find universal extension
				let extension: FileExtension;
				switch (format.type) {
					case 'audio':
						extension = 'wav';
						break
					case 'video':
						extension = 'mp4'
						break;
				}

				const workerData: DownloadWorkerData = {
					recordingURL,
					recordingFormat: format.details,
					recordingMetadata: {
						audioBitrate: audioFormat ? audioFormat.details.audioBitrate! : 0,
						recordingDurationSec,
						recordingExtension: extension,
						recordingID,
						videoQuality: videoFormat ? videoFormat.details.qualityLabel : '0p'
					}
				};

				const worker = new Worker('./dist/src/workers/ffmpeg-download.js', {workerData})
					.on('exit', exitCode => {
						// todo: move to debug only
						console.log('[INFO] Worker exited with code: ' + exitCode);
						if (exitCode === 0)
							finishedDownloads += 1;
						if (finishedDownloads === formats.length)
							resolve(paths);
					})
					.on('error', err => {
						console.log('[ERROR] Worker encountered an error:', err);
					})
					.on('message', (message: WorkerMessage) => {
						switch (message.type) {
							case 'download-started':
								paths.push(message.details[1]);
								break;
							case 'download-progress':
								switch (message.details[1]) {
									case 'mp3':
									case 'wav':
										audioPercent = message.details[0];
										break;
									case 'mp4':
										videoPercent = message.details[0];
										break;
								}
								Core.getInstance().getBrowserWindow().webContents.send('download-advanced-progress', saveName, audioPercent, videoPercent, mergePercent);
								break;
							case 'download-error':
								// todo: retry worker task
								worker.terminate();
								Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Error, 'Error while downloading parts of the recording: ' + recordingID + '.');
								break;
						}
					})
					.on('online', () => {
						console.log('[INFO] Worker online, starting job');
					});
			}
		});

		const workerData: MergeWorkerData = {
			recordingPaths: paths,
			savePath: path.resolve('../downloads', saveName)
		};
		const worker = new Worker('./dist/src/workers/ffmpeg-merge-audio-video.js', {workerData})
			.on('exit', exitCode => {
				// todo: move to debug only
				console.log('[INFO] Merge worker exited with code: ' + exitCode);

				if (exitCode === 0) {
					LocalCache.clearOngoingDownload(saveName);
					Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Success, 'Saved as: ' + saveName);
				}
			})
			.on('error', err => {
				console.log('[ERROR] Merge worker encountered an error:', err);
			})
			.on('message', (message: WorkerMessage) => {
				switch (message.type) {
					case 'merge-progress':
						mergePercent = message.details[0];
						Core.getInstance().getBrowserWindow().webContents.send('download-advanced-progress', saveName, audioPercent, videoPercent, mergePercent);
						break;
					case 'download-error':
						worker.terminate();
						Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Error, 'Error while merging parts of the recording: ' + recordingID + '.');
						break;
				}
			})
			.on('online', () => {
				console.log('[INFO] Merge worker online, starting job.');
			});
	},
	name: 'get-recording-advanced',
	type: 'on'
};

export default handler;