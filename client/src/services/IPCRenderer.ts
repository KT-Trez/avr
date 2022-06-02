import {FileInfo, RecordingFormat, Video} from '../types/interfaces';


const {ipcRenderer} = window.require('electron');

/**
 * Class that communicates with electron backed.
 */
export default class IPCRenderer {
	static downloadRecording(url: string, format: RecordingFormat, fileName: string) {
		ipcRenderer.send('get-recording', url, format, fileName);
	}

	static async getDownloadedFiles(): Promise<FileInfo[]> {
		return await ipcRenderer.invoke('get-files--downloads');
	}

	static async getRecordingFormats(url: string): Promise<RecordingFormat[]> {
		return await ipcRenderer.invoke('get-video-download-info', url);
	}

	static openDownloadsDir() {
		ipcRenderer.send('open-downloads');
	}

	static openFile(fileName: string) {
		ipcRenderer.send('open-file', fileName);
	}

	static async searchForRecordings(keywords: string[]): Promise<Video[]> {
		return await ipcRenderer.invoke('search-for-videos', keywords);
	}
}