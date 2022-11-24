import os from 'os';
import path from 'path';
import {parentPort, workerData} from 'worker_threads';
import {videoFormat} from 'ytdl-core';
import {YT_DL} from '../../typings';
import {FFmpegProgress, RecordingMetadata} from '../../typings/interfaces-core';
import {convertTimestampToSeconds} from '../tools/convertTimestampToSeconds';


const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffProbe = require('ffprobe-static');
const YTDownload = require('ytdl-core');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffProbe.path);


const sendToMainProcess = (message: string, ...data: any[]) => {
	const messageData: YT_DL.Core.Workers.Message = {
		details: data,
		type: message
	};
	parentPort?.postMessage(messageData);
};

const downloadRecording = async (recordingURL: string, recordingFormat: videoFormat, recodingMetadata: RecordingMetadata) => {
	const qualityID = (recodingMetadata.audioBitrate ?? 0) + 'x' + (recodingMetadata.videoQuality ?? '0p') + '-' + recodingMetadata.recordingID;

	// set filename and path of an output
	const filename = 'combo' + '-' + qualityID + '-' + new Date().getTime() + '.' + recodingMetadata.recordingExtension;
	const outputPath = path.join(os.tmpdir(), filename);

	// values to calculate approximate download progress
	let mediaDownloadPercent = 0;
	let mediaDownloadPercentInt = 0;

	ffmpeg()
		.input(await YTDownload(recordingURL, {
			filter: (vFormat: videoFormat) => vFormat.audioBitrate === recordingFormat.audioBitrate && vFormat.qualityLabel === recordingFormat.qualityLabel && vFormat.codecs === recordingFormat.codecs
		}))
		.on('start', (command: string) => {
			console.info('[INFO] Starting ffmpeg video download with: ' + command);

			sendToMainProcess('download-started', command, outputPath);
		})
		.on('error', (err: Error) => {
			console.error('[ERROR] Cannot download video: ' + err.message);

			sendToMainProcess('download-error', err);
		})
		.on('progress', (progress: FFmpegProgress) => {
			if (progress.percent)
				mediaDownloadPercent = progress.percent;
			else
				mediaDownloadPercent = convertTimestampToSeconds(progress.timemark) / recodingMetadata.recordingDurationSec * 100;
			if (mediaDownloadPercent >= mediaDownloadPercentInt + 1) {
				console.info('[INFO] Recording download progress: ' + mediaDownloadPercent);

				sendToMainProcess('download-progress', mediaDownloadPercent, recodingMetadata.recordingExtension);
				mediaDownloadPercentInt += 1;
			}
		})
		.on('end', async () => {
			console.error('[SUCCESS] Recording ' + recodingMetadata.recordingExtension + ' downloaded.');

			mediaDownloadPercent = 100;
			sendToMainProcess('download-progress', mediaDownloadPercent, recodingMetadata.recordingExtension);
			process.exit(0);
		})
		.save(outputPath);
};

downloadRecording(workerData.recordingURL, workerData.recordingFormat, workerData.recordingMetadata);