import path from 'path';
import {Worker} from 'worker_threads';
import {videoFormat} from 'ytdl-core';
import {YT_DL} from '../../typings';
import {NotificationSeverity, ProgressAction, ProgressType} from '../../typings/enums';
import {IpcMainHandler} from '../../typings/interfaces-core';
import {Extensions} from '../../typings/types';
import {Messenger} from '../classes/Messenger';
import LocalCache from '../services/LocalCache';
import {getPath} from '../tools/getPath';
import DownloadWorkerData = YT_DL.Core.Workers.DownloadWorkerData;
import WorkerMessage = YT_DL.Core.Workers.WorkerMessage;
import MergeWorkerData = YT_DL.Core.Workers.MergeWorkerData;


const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffProbe = require('ffprobe-static');
const YTDownload = require('ytdl-core');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffProbe.path);


const handler: IpcMainHandler = {
	execute: async (event, formats: { details: videoFormat, type: 'audio' | 'video' }[], recordingDurationSec: number, recordingURL: string) => {
		for (const format of formats) {
			if (format.type === 'audio' && !format.details.hasAudio)
				throw Error('Audio format doesn\'t contain audio.');
			if (format.type === 'video' && !format.details.hasVideo)
				throw Error('Video format doesn\'t contain video.');
		}

		//@ts-ignore
		process.dlopen = () => {
			throw new Error('Load native module is not safe');
		};

		const audioFormat = formats.find(format => format.type === 'audio');
		const recordingID = YTDownload.getVideoID(recordingURL);
		const videoFormat = formats.find(format => format.type === 'video');

		const saveName = 'combo-' + (audioFormat ? audioFormat.details.audioBitrate! : 0) + 'x' + (videoFormat ? videoFormat.details.qualityLabel : '0p') + '-' + recordingID + '-' + new Date().getTime() + '.mp4';

		LocalCache.cacheOngoingDownload(saveName);
		Messenger.notify('Download started: ' + recordingID, NotificationSeverity.Info);

		// todo: queue start notification

		let audioPercent = 0;
		let mergePercent = 0;
		let videoPercent = 0;

		const paths: string[] = await new Promise(resolve => {
			let finishedDownloads = 0;
			const paths: string[] = [];

			for (const format of formats) {
				// todo: find universal extension
				let extension: Extensions;
				switch (format.type) {
					case 'audio':
						extension = 'wav';
						break;
					case 'video':
						extension = 'mp4';
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

				// TODO: workers doesn't seem to work in asar archives, find a workaround that let's pack the app in asar
				const worker = new Worker(path.join(getPath('workers'), 'ffmpeg-download.js'), {workerData})
					.on('exit', exitCode => {
						// todo: move to debug only
						console.info('[INFO] Worker exited with code: ' + exitCode);
						if (exitCode === 0)
							finishedDownloads += 1;
						if (finishedDownloads === formats.length)
							resolve(paths);
					})
					.on('error', err => {
						console.error('[ERROR] Worker encountered an error:', err);
					})
					.on('message', (message: WorkerMessage) => {
						switch (message.type) {
							case 'search-started':
								paths.push(message.details[1]);
								break;
							case 'search-progress':
								switch (message.details[1]) {
									case 'mp3':
									case 'wav':
										audioPercent = message.details[0];
										break;
									case 'mp4':
										videoPercent = message.details[0];
										break;
								}
								Messenger.notifyProgress(recordingID, [
									{action: ProgressAction.Download, type: ProgressType.Audio, value: audioPercent},
									{action: ProgressAction.Download, type: ProgressType.Video, value: videoPercent}
								]);
								break;
							case 'search-error':
								// todo: retry worker task
								worker.terminate();
								Messenger.notify('Part of the download ' + recordingID + ' failed', NotificationSeverity.Error);
								break;
						}
					})
					.on('online', () => {
						console.info('[INFO] Worker online, starting job');
					});
			}
		});

		const workerData: MergeWorkerData = {
			recordingPaths: paths,
			savePath: path.join(getPath('downloads'), saveName)
		};
		const worker = new Worker(path.join(getPath('workers'), 'ffmpeg-merge-audio-video.js'), {workerData})
			.on('exit', exitCode => {
				// todo: move to debug only
				console.info('[INFO] Merge worker exited with code: ' + exitCode);

				if (exitCode === 0) {
					LocalCache.clearOngoingDownload(saveName);
					Messenger.notify('Video ' + recordingID + ' saved as ' + saveName, NotificationSeverity.Success);
				}
			})
			.on('error', err => {
				console.error('[ERROR] Merge worker encountered an error:', err);
			})
			.on('message', (message: WorkerMessage) => {
				switch (message.type) {
					case 'merge-progress':
						mergePercent = message.details[0];
						Messenger.notifyProgress(recordingID, [{
							action: ProgressAction.Merge,
							type: ProgressType.AudioAndVideo,
							value: mergePercent
						}]);
						break;
					case 'search-error':
						worker.terminate();
						Messenger.notify('Merging audio and video in ' + recordingID + ' failed', NotificationSeverity.Error);
						break;
				}
			})
			.on('online', () => {
				console.info('[INFO] Merge worker online, starting job.');
			});
	},
	name: 'video:advancedDownload',
	type: 'on'
};

export default handler;