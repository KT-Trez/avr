import {FileInfo, RecordingFormat, Video} from '../types/interfaces';


const {ipcRenderer} = window.require('electron');

/**
 * Class that communicates with electron backed.
 */
export default class IPCRenderer {
	static deleteFromDownloads(fileName: string) {
		ipcRenderer.send('delete-from-downloads', fileName);
	}

	static getRecording(url: string, format: RecordingFormat) {
		ipcRenderer.send('get-recording', url, format);
	}

	static async getRecordingFormats(url: string): Promise<RecordingFormat[]> {
		return await ipcRenderer.invoke('get-recording-formats', url);
	}

	static async getSavedRecordingsInfo(): Promise<FileInfo[]> {
		return await ipcRenderer.invoke('get-recordings-info-from-downloads');
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
}