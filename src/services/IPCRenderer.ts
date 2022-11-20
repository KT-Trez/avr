//import {// IPCRendererEvent} from 'electron';
//import {FileInfo, RecordingFormat, Video} from '../types/interfaces';
//import QueueService from './QueueService';
//
//
///**
// * Class that communicates with electron backed.
// */
//export default class // IPCRenderer {
//	// all listeners instance
//	private static instance: // IPCRenderer;
//
//	// static methods
//	static deleteFromDownloads(fileName: string) {
//		require('electron').// IPCRenderer.send('delete-from-downloads', fileName);
//	}
//
//	static getInstance() {
//		return require('electron').// IPCRenderer;
//	}
//
//	static async getOngoingDownloads() {
//		return await require('electron').// IPCRenderer.invoke('get-ongoing-downloads');
//	}
//
//	static getRecording(url: string, format: RecordingFormat) {
//		require('electron').// IPCRenderer.send('get-recording', url, format);
//	}
//
//	static getRecordingAdvanced(url: string, audioFormat: RecordingFormat, videoFormat: RecordingFormat, recordingDurationSec: number) {
//		if (!audioFormat.hasAudio || !videoFormat.hasVideo)
//			return;
//
//		const formats = [{
//			details: audioFormat,
//			type: 'audio'
//		}, {
//			details: videoFormat,
//			type: 'video'
//		}];
//		require('electron').// IPCRenderer.send('get-recording-advanced', url, formats, recordingDurationSec);
//	}
//
//	static async getRecordingFormats(url: string): Promise<RecordingFormat[]> {
//		return await require('electron').// IPCRenderer.invoke('get-recording-formats', url);
//	}
//
//	static async getSavedRecordingsInfo(): Promise<FileInfo[]> {
//		return await require('electron').// IPCRenderer.invoke('get-recordings-info-from-downloads');
//	}
//
//	static initialize() {
//		if (!this.instance)
//			this.instance = new // IPCRenderer();
//	}
//
//	static openDownloadsDir() {
//		require('electron').// IPCRenderer.send('open-downloads');
//	}
//
//	static openDownloadsFile(fileName: string) {
//		require('electron').// IPCRenderer.send('open-from-downloads', fileName);
//	}
//
//	static async searchForRecordings(keywords: string): Promise<Video[]> {
//		return await require('electron').// IPCRenderer.invoke('search-for-recordings', keywords);
//	}
//
//	// instance
//	private // IPCRenderer
//
//	constructor() {
//		this.// IPCRenderer.on('search-advanced-progress', this.advancedDownloadProgress);
//		this.// IPCRenderer.on('search-advanced-start', this.advancedDownloadStart);
//		// todo: info queue about error
//	}
//
//	// require('electron').// IPCRenderer listeners
//	advancedDownloadProgress(event: // IPCRendererEvent, name: string, audioProgress: number, videoProgress: number, mergeProgress: number) {
//		//noinspection JSIgnoredPromiseFromCall
//		QueueService.updateAudioProgress(name, audioProgress);
//		//noinspection JSIgnoredPromiseFromCall
//		QueueService.updateMergeProgress(name, mergeProgress);
//		//noinspection JSIgnoredPromiseFromCall
//		QueueService.updateVideoProgress(name, videoProgress);
//	}
//
//	advancedDownloadStart(event: // IPCRendererEvent, downloadName: string, hasAudio: boolean, hasVideo: boolean, hasMerge: boolean) {
//		QueueService.createEntry(downloadName, hasAudio, hasVideo, hasMerge);
//	}
//}

export {};