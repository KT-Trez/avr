//noinspection JSIgnoredPromiseFromCall

import * as os from 'os';
import * as path from 'path';
import {parentPort, workerData} from 'worker_threads';
import {videoFormat} from 'ytdl-core';
import {convertTimestampToSeconds} from '../tools/convertTimestampToSeconds';
import {FFmpegProgress, RecordingMetadata, WorkerMessage} from '../types/interfaces';


const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffProbe = require('ffprobe-static');
const YTDownload = require('ytdl-core');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffProbe.path);


const sendToMainProcess = (message: string, ...data: any[]) => {
	const messageData: WorkerMessage = {
		details: data,
		type: message
	};
	parentPort?.postMessage(messageData);
};

const downloadRecording = async (recordingURL: string, recordingFormat: videoFormat, recodingMetadata: RecordingMetadata) => {
	const qualityID = (recodingMetadata.audioBitrate ?? 0) + 'x' + (recodingMetadata.videoQuality ?? '0p') + '-' + recodingMetadata.recordingID;

	const saveName = 'combo' + '-' + qualityID + '-' + new Date().getTime() + '.' + recodingMetadata.recordingExtension;
	const savePath = path.resolve(os.tmpdir(), saveName);

	let downloadProgressHelper = 0;
	let downloadPercent = 0;

	ffmpeg()
		.input(await YTDownload(recordingURL, {
			filter: (vFormat: videoFormat) => vFormat.audioBitrate === recordingFormat.audioBitrate && vFormat.qualityLabel === recordingFormat.qualityLabel && vFormat.codecs === recordingFormat.codecs
		}))
		.on('start', (command: string) => {
			console.info('[INFO] Starting ffmpeg video search with: ' + command);

			sendToMainProcess('search-started', command, savePath);
		})
		.on('error', (err: Error) => {
			console.error('[ERROR] Cannot search video: ' + err.message);

			sendToMainProcess('search-error', err);
		})
		.on('progress', (progress: FFmpegProgress) => {
			if (progress.percent)
				downloadPercent = progress.percent
			else
				downloadPercent = convertTimestampToSeconds(progress.timemark) / recodingMetadata.recordingDurationSec * 100;
			if (downloadPercent >= downloadProgressHelper + 1) {
				console.info('[INFO] Recording search progress: ' + downloadPercent);

				sendToMainProcess('search-progress', downloadPercent, recodingMetadata.recordingExtension);
				downloadProgressHelper += 1;
			}
		})
		.on('end', async () => {
			console.error('[SUCCESS] Recording ' + recodingMetadata.recordingExtension + ' downloaded.');

			downloadPercent = 100;
			sendToMainProcess('search-progress', downloadPercent, recodingMetadata.recordingExtension);
			process.exit(0);
		})
		.save(savePath);
};

downloadRecording(workerData.recordingURL, workerData.recordingFormat, workerData.recordingMetadata);