import * as fs from 'fs';
import {videoFormat} from 'ytdl-core';
import Core from '../../core';
import {NotificationSeverity} from '../types/enums';
import {FFmpegProgress, IpcMainHandler} from '../types/interfaces';


const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffProbe = require('ffprobe-static');
const YTDownload = require('ytdl-core');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffProbe.path);


const handler: IpcMainHandler = {
	execute: async (event, recordingURL: string, audioFormat: videoFormat, videoFormat: videoFormat) => {
		if (!audioFormat.hasAudio)
			throw Error('Audio format doesn\'t contain audio.');
		if (!videoFormat.hasVideo)
			throw Error('Video format doesn\'t contain video.');

		const videoID = YTDownload.getVideoID(recordingURL);
		const name = 'combo' + '-' + audioFormat.audioBitrate + 'x' + videoFormat.qualityLabel + '-' + videoID + '-' + new Date().getTime() + '.mp4';
		const tempID = new Date().getTime() + '-';

		ffmpeg()
			.input(await YTDownload(recordingURL, {
				filter: (vFormat: videoFormat) => vFormat.audioBitrate === videoFormat.audioBitrate && vFormat.qualityLabel === videoFormat.qualityLabel
			}))
			.on('start', (command: string) => console.log('[INFO] Starting ffmpeg video download with: ' + command))
			.on('error', (err: Error) => {
				console.log('[ERROR] Cannot download video: ' + err.message);
				Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Error, 'Error while downloading video to recording: ' + videoID + '.');
			})
			.on('progress', (progress: FFmpegProgress) => {
				console.log(progress);
			})
			.on('end', async () => {
				console.log('[SUCCESS] Downloaded video, adding audio!');

				ffmpeg()
					.input('../downloads/' + tempID + name)
					.input(await YTDownload(recordingURL, {
						filter: (vFormat: videoFormat) => vFormat.audioBitrate === audioFormat.audioBitrate && vFormat.qualityLabel === audioFormat.qualityLabel
					}))
					.on('start', (command: string) => console.log('[INFO] Starting ffmpeg audio download with: ' + command))
					.on('error', (err: Error) => {
						console.log('[ERROR] Cannot download audio: ' + err.message);
						Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Error, 'Error while downloading audio to recording: ' + videoID + '.');
					})
					.on('progress', (progress: FFmpegProgress) => {
						console.log(progress);
					})
					.on('end', () => {
						fs.unlinkSync('../downloads/' + tempID + name);

						console.log('Merging finished!');
						Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Success, 'Save as: ' + name );
					})
					.save('../downloads/' + name);
			})
			.save('../downloads/' + tempID + name);
	},
	name: 'get-recording-advanced',
	type: 'on'
};

export default handler;