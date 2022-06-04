import * as fs from 'fs';
import {videoFormat} from 'ytdl-core';
import Core from '../../core';
import LocalCache from '../services/LocalCache';
import {NotificationSeverity} from '../types/enums';
import {FFmpegProgress, IpcMainHandler} from '../types/interfaces';


const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffProbe = require('ffprobe-static');
const YTDownload = require('ytdl-core');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffProbe.path);


const convertTimestampToSeconds = (timestamp: string) => {
	timestamp = timestamp.slice(0, timestamp.lastIndexOf('.'));
	let seconds = 0;

	let multiplier = 1;
	for (const timeElement of timestamp.split(':').reverse()) {
		seconds += parseInt(timeElement) * multiplier;
		multiplier *= 60;
	}
	return seconds;
};

const handler: IpcMainHandler = {
	execute: async (event, recordingURL: string, audioFormat: videoFormat, videoFormat: videoFormat, recordingDurationSec: number) => {
		if (!audioFormat.hasAudio)
			throw Error('Audio format doesn\'t contain audio.');
		if (!videoFormat.hasVideo)
			throw Error('Video format doesn\'t contain video.');

		const videoID = YTDownload.getVideoID(recordingURL);
		const saveName = 'combo' + '-' + audioFormat.audioBitrate + 'x' + videoFormat.qualityLabel + '-' + videoID + '-' + new Date().getTime() + '.mp4';
		const savePath = '../downloads/' + saveName;
		const tempID = new Date().getTime() + '-';
		const tempPath = '../downloads/' + tempID + '-' + savePath;

		const downloadID = videoID + '-' + (audioFormat.audioBitrate ?? 0) + 'x' + (videoFormat.qualityLabel ?? '0p');
		const downloadFlag = LocalCache.readRecordingIsDownloaded(downloadID);
		if (downloadFlag)
			Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Warning, `Recording in selected format has been already downloaded.`);
		else
			LocalCache.cacheRecordingIsDownloaded(downloadID, true);

		Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Information, 'Downloading video: ' + videoID);

		let audioProgress = 0;
		let audioPercent = 0;
		let videoProgress = 0;
		let videoPercent = 0;
		ffmpeg()
			.input(await YTDownload(recordingURL, {
				filter: (vFormat: videoFormat) => vFormat.audioBitrate === videoFormat.audioBitrate && vFormat.qualityLabel === videoFormat.qualityLabel
			}))
			.on('start', (command: string) => {
				console.log('[INFO] Starting ffmpeg video download with: ' + command);
				LocalCache.cacheOngoingDownload(saveName);
				Core.getInstance().getBrowserWindow().webContents.send('download-advanced-start', saveName, audioFormat.hasAudio, videoFormat.hasVideo);
			})
			.on('error', (err: Error) => {
				console.log('[ERROR] Cannot download video: ' + err.message);
				Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Error, 'Error while downloading video to recording: ' + videoID + '.');
			})
			.on('progress', (progress: FFmpegProgress) => {
				videoPercent = convertTimestampToSeconds(progress.timemark) / recordingDurationSec * 100;
				if (videoPercent >= videoProgress + 1) {
					console.log('[INFO] Video download progress: ' + videoPercent);
					Core.getInstance().getBrowserWindow().webContents.send('download-advanced-progress', saveName, audioPercent, videoPercent);
					videoProgress += 1;
				}
			})
			.on('end', async () => {
				videoPercent = 100;
				console.log('[SUCCESS] Downloaded video, adding audio!');

				ffmpeg()
					.input(tempPath)
					.input(await YTDownload(recordingURL, {
						filter: (vFormat: videoFormat) => vFormat.audioBitrate === audioFormat.audioBitrate && vFormat.qualityLabel === audioFormat.qualityLabel
					}))
					.on('start', (command: string) => console.log('[INFO] Starting ffmpeg audio download with: ' + command))
					.on('error', (err: Error) => {
						console.log('[ERROR] Cannot download audio: ' + err.message);
						Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Error, 'Error while downloading audio to recording: ' + videoID + '.');
					})
					.on('progress', (progress: FFmpegProgress) => {
						audioPercent = progress.percent!;
						if (audioPercent! >= audioProgress + 1) {
							console.log('[INFO] Audio download progress: ' + audioPercent);
							Core.getInstance().getBrowserWindow().webContents.send('download-advanced-progress', saveName, audioPercent, videoPercent);
							audioProgress += 1;
						}
					})
					.on('end', () => {
						audioPercent = 100;

						fs.unlinkSync(tempPath);
						LocalCache.clearOngoingDownload(saveName);

						console.log('[SUCCESS] Merging finished.');
						Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Success, 'Saved as: ' + saveName);
					})
					.save(savePath);
			})
			.save(tempPath);
	},
	name: 'get-recording-advanced',
	type: 'on'
};

export default handler;