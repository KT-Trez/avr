import {ipcMain} from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import {videoFormat, videoInfo} from 'ytdl-core';


const YTDownload = require('ytdl-core');
const YTSearch = require('yt-search');

const downloading = new Map<string, { hasAudio: boolean, hasVideo: boolean }>();
const recordingsFormatsCache = new Map<string, videoFormat[]>();


export default function mountIpcMainHandlers() {
	ipcMain.handle('get-files--downloads', async (event) => {
		const files: fs.Dirent[] = await new Promise((resolve, reject) => {
			fs.readdir('../downloads', {
				withFileTypes: true
			}, (err, files) => {
				if (err)
					reject(err);

				resolve(files);
			});
		});

		const directoryContent = [];
		for (const dirent of files.filter(file => file.name.endsWith('.mp3') || file.name.endsWith('.mp4'))) {
			const stats = fs.statSync('../downloads/' + dirent.name);
			const sizeInMB = Math.round(stats.size / (1024 * 1024));
			directoryContent.push({
				created: stats.birthtime,
				media: dirent.name.slice(dirent.name.lastIndexOf('.') + 1, dirent.name.length),
				modified: stats.mtime,
				name: dirent.name,
				size: {
					unit: 'MB',
					value: sizeInMB
				}
			});
		}

		return directoryContent;
	});

	ipcMain.handle('search-for-videos', async (event, keywords) => {
		const searchData = await YTSearch(keywords.join(' '));

		const videosMetadata = [];
		for (const video of searchData.videos) {
			delete video.duration.toString;
			delete video.seconds;
			delete video.timestamp;

			videosMetadata.push(video);
		}
		return videosMetadata;
	});

	ipcMain.on('open-downloads', (event, file) => {
		const downloadsAbsolutePath = path.resolve('../downloads');
		require('child_process').exec(`explorer.exe "${downloadsAbsolutePath}"`);
	});


	ipcMain.on('open-file', (event, file) => {
		const absolutePath = path.resolve('../downloads/' + file);
		require('child_process').exec(`explorer.exe "${absolutePath}"`);
	});

	ipcMain.handle('get-video-download-info', async (event, url) => {
		// todo: move to class or organize in better way
		if (recordingsFormatsCache.has(url))
			return recordingsFormatsCache.get(url);

		const recordingFormats: videoFormat[] = (await YTDownload.getInfo(url)).formats;
		recordingsFormatsCache.set(url, recordingFormats);
		return recordingFormats;
	});

	ipcMain.on('get-recording', async (event, url, format: videoFormat, videoID) => {
		let fileType = 'mp4';
		if (format.hasAudio && !format.hasVideo)
			fileType = 'mp3';

		if (downloading.has(videoID + fileType))
			return;
		downloading.set(videoID + fileType, {hasAudio: format.hasAudio, hasVideo: format.hasVideo});

		// todo: find a fucking way to assert 100% correct choice
		const path = '../downloads/' + fileType + '-' + (format.audioBitrate ?? 0) + 'x' + (format.qualityLabel ?? '0p') + '-' + videoID + '-' + new Date().getTime() + '.' + fileType;
		await YTDownload(url, {
			filter: (vFormat: videoFormat) => vFormat.audioBitrate === format.audioBitrate && vFormat.qualityLabel === format.qualityLabel
		}).pipe(fs.createWriteStream(path));
		console.log('[INFO] Downloaded: ' + path);
	});
}