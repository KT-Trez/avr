import crypto from 'crypto';
import path from 'path';
import {Worker} from 'worker_threads';
import {videoFormat} from 'ytdl-core';
import {YT_DL} from '../../typings';
import {NotificationSeverity} from '../../typings/enums';
import {IpcMainHandler} from '../../typings/interfaces-core';
import {Extensions} from '../../typings/types';
import Download from '../classes/Download';
import {Messenger} from '../classes/Messenger';
import Cache from '../services/Cache';
import {getPath} from '../tools/getPath';
import DownloadWorkerData = YT_DL.Core.Workers.DownloadWorkerData;
import MergeWorkerData = YT_DL.Core.Workers.MergeWorkerData;


const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffProbe = require('ffprobe-static');
const YTDownload = require('ytdl-core');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffProbe.path);


const handler: IpcMainHandler = {
	execute: async (event, formats: { details: videoFormat, type: 'audio' | 'video' }[], durationSec: number, title: string, url: string) => {
		// validate format input
		for (const format of formats) {
			if (format.type === 'audio' && !format.details.hasAudio)
				throw Error('Audio format doesn\'t contain audio.');
			if (format.type === 'video' && !format.details.hasVideo)
				throw Error('Video format doesn\'t contain video.');
		}

		// @ts-ignore
		process.dlopen = () => {
			throw new Error('Load native module is not safe');
		};

		// identify audio and video formats
		const audioFormat = formats.find(format => format.type === 'audio');
		const videoFormat = formats.find(format => format.type === 'video');

		// set filename, id and path to save selected media
		const mediaID = YTDownload.getVideoID(url);
		const filename = [audioFormat!.details.audioBitrate ?? '0', videoFormat!.details.qualityLabel ?? '0p', mediaID, crypto.randomUUID()].join('_').concat('.mp4');
		const outputPath = path.join(getPath('downloads'), filename);

		// todo: optimize common parts (download-media.ts)
		// check if media with chosen audio and video quality was already downloaded; save download 'preset'
		const downloadID = [mediaID, audioFormat!.details.audioBitrate ?? '0', videoFormat!.details.qualityLabel ?? '0p', audioFormat!.details.codecs, videoFormat!.details.codecs].join('.');
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

		// combined values of download & merge progress
		let audioPercent = 0;
		let mergePercent = 0;
		let videoPercent = 0;

		// download audio and video separately
		const paths: string[] = await new Promise(resolve => {
			let finishedDownloadCount = 0;
			const outputPaths: string[] = [];

			for (const format of formats) {
				// todo: find universal extension
				// select extension based on media type
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
					recordingURL: url,
					recordingFormat: format.details,
					recordingMetadata: {
						audioBitrate: audioFormat ? audioFormat.details.audioBitrate! : 0,
						recordingDurationSec: durationSec,
						recordingExtension: extension,
						recordingID: mediaID,
						videoQuality: videoFormat ? videoFormat.details.qualityLabel : '0p'
					}
				};
				const worker = new Worker(path.join(getPath('workers'), 'ffmpeg-download.js'), {workerData})
					.on('exit', exitCode => {
						console.info('[INFO] Worker exited with code: ' + exitCode);
						// todo: change download status
						if (exitCode === 0)
							finishedDownloadCount += 1;

						if (finishedDownloadCount === formats.length)
							resolve(outputPaths);
						else
							Cache.updateDownloadStatus(downloadID, 'downloading ' + format.type === 'audio' ? 'video' : 'audio');
					})
					.on('error', err => {
						console.error('[ERROR] Worker encountered an error:', err);
					})
					.on('message', (message: YT_DL.Core.Workers.Message) => {
						switch (message.type) {
							case 'download-started':
								outputPaths.push(message.details[1]);
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

								Cache.updateDownloadProgress(downloadID, false, Math.round((audioPercent + mergePercent + videoPercent)  / 3));
								Messenger.notifyQueueProgress();
								break;
							case 'download-error':
								// todo: retry worker task
								worker.terminate();
								Messenger.notify('Part of the download [' + mediaID + '] failed', NotificationSeverity.Error);
								break;
						}
					})
					.on('online', () => {
						console.info('[INFO] Worker online, starting job');
					});
			}
		});

		// merge downloaded audio and video
		const workerData: MergeWorkerData = {
			recordingPaths: paths,
			savePath: outputPath
		};
		const worker = new Worker(path.join(getPath('workers'), 'ffmpeg-merge-audio-video.js'), {workerData})
			.on('exit', exitCode => {
				if (exitCode !== 0)
					throw Error('Worker ended with code: ' + exitCode);
				console.info('[SUCCESS] Media saved at: ' + outputPath);

				// updated cache so the progress approximation is correct
				Cache.updateDownloadProgress(downloadID, true, 100);
				Messenger.notifyQueueEnd();

				Cache.updateDownloadStatus(downloadID, 'download completed');
				Messenger.notify('Media [' + mediaID + '] saved at [' + filename + ']', NotificationSeverity.Success);
			})
			.on('error', err => {
				console.error('[ERROR] Merge worker encountered an error:', err);
			})
			.on('message', (message: YT_DL.Core.Workers.Message) => {
				switch (message.type) {
					case 'merge-progress':
						mergePercent = message.details[0];

						Cache.updateDownloadProgress(downloadID, false, Math.round((audioPercent + mergePercent + videoPercent) / 3));
						Messenger.notifyQueueProgress();
						break;
					case 'download-error':
						worker.terminate();
						Messenger.notify('Merging audio and video in [' + mediaID + '] failed', NotificationSeverity.Error);
						break;
				}
			})
			.on('online', () => {
				console.info('[INFO] Merge worker online, starting job.');
				Cache.updateDownloadStatus(downloadID, 'merging audio and video');
			});
	},
	name: 'media:downloadAndMerge',
	type: 'on'
};

export default handler;