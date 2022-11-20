// todo: fix imports
import * as fs from 'fs';
import {parentPort, workerData} from 'worker_threads';
import {FFmpegProgress, WorkerMessage} from '../types/interfaces';


const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffProbe = require('ffprobe-static');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffProbe.path);


const sendToMainProcess = (message: string, ...data: any[]) => {
	const messageData: WorkerMessage = {
		details: data,
		type: message
	};
	parentPort?.postMessage(messageData);
};


const mereAudioWithVideo = (recordingPaths: string[], savePath: string) => {
	const command = ffmpeg();

	for (const recordingPath of recordingPaths)
		command.input(recordingPath);

	let mergeProgress = 0;
	command
		.on('start', (command: string) => {
			console.info('[INFO] Starting ffmpeg audio and video merge: ' + command);
		})
		.on('error', (err: Error) => {
			console.error('[ERROR] Cannot merge files: ' + err.message);

			sendToMainProcess('merge-error', err);
		})
		.on('progress', (progress: FFmpegProgress) => {
			if (progress.percent! >= mergeProgress + 1) {
				console.info('[INFO] Merge progress: ' + progress.percent);

				sendToMainProcess('merge-progress', progress.percent);
				mergeProgress += 1;
			}
		})
		.on('end', () => {
			sendToMainProcess('merge-progress', 100);

			for (const recordingPath of recordingPaths)
				fs.unlinkSync(recordingPath);

			console.info('[SUCCESS] Merging finished.');
			process.exit(0);
		})
		.save(savePath);
}

mereAudioWithVideo(workerData.recordingPaths, workerData.savePath);