//@ts-ignore
import {IpcRendererEvent} from 'electron';
import {FileInfo, RecordingFormat, Video} from '../types/interfaces';
import QueueService from './QueueService';


const {ipcRenderer} = window.require('electron');

/**
 * Class that communicates with electron backed.
 */
export default class IPCRenderer {
	// all listeners instance
	private static instance: IPCRenderer;

	// static methods
	static deleteFromDownloads(fileName: string) {
		ipcRenderer.send('delete-from-downloads', fileName);
	}

	static getInstance() {
		return ipcRenderer;
	}

	static async getOngoingDownloads() {
		return await ipcRenderer.invoke('get-ongoing-downloads');
	}

	static getRecording(url: string, format: RecordingFormat) {
		ipcRenderer.send('get-recording', url, format);
	}

	static getRecordingAdvanced(url: string, audioFormat: RecordingFormat, videoFormat: RecordingFormat, recordingDurationSec: number) {
		if (!audioFormat.hasAudio || !videoFormat.hasVideo)
			return;
		ipcRenderer.send('get-recording-advanced', url, audioFormat, videoFormat, recordingDurationSec);
	}

	static async getRecordingFormats(url: string): Promise<RecordingFormat[]> {
		return await ipcRenderer.invoke('get-recording-formats', url);
	}

	static async getSavedRecordingsInfo(): Promise<FileInfo[]> {
		return await ipcRenderer.invoke('get-recordings-info-from-downloads');
	}

	static initialize() {
		if (!this.instance)
			this.instance = new IPCRenderer();
	}

	static openDownloadsDir() {
		ipcRenderer.send('open-downloads');
	}

	static openDownloadsFile(fileName: string) {
		ipcRenderer.send('open-from-downloads', fileName);
	}

	static async searchForRecordings(keywords: string): Promise<Video[]> {
		return await ipcRenderer.invoke('search-for-recordings', keywords);
	}

	// instance
	private ipcRenderer = ipcRenderer;

	constructor() {
		this.ipcRenderer.on('download-advanced-progress', this.advancedDownloadProgress);
		this.ipcRenderer.on('download-advanced-start', this.advancedDownloadStart);
	}

	// ipcRenderer listeners
	advancedDownloadProgress(event: IpcRendererEvent,name: string, audioProgress: number, videoProgress: number) {
		//noinspection JSIgnoredPromiseFromCall
		QueueService.updateAudioProgress(name, audioProgress);
		//noinspection JSIgnoredPromiseFromCall
		QueueService.updateVideoProgress(name, videoProgress);
	}

	advancedDownloadStart(event: IpcRendererEvent, downloadName: string, hasAudio: boolean, hasVideo: boolean) {
		QueueService.createEntry(downloadName, hasAudio, hasVideo);
	}
}