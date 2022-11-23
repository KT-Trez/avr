import {IpcMainInvokeEvent} from 'electron';
import {videoFormat} from 'ytdl-core';
import {IpcMainHandler} from '../../typings/interfaces-core';
import LocalCache from '../services/LocalCache';


const YTDownload = require('ytdl-core');

const handler: IpcMainHandler = {
	execute: async (event: IpcMainInvokeEvent, url: string) => {
		if (LocalCache.hasRecordingFormats(url))
			return LocalCache.readRecordingFormats(url);

		// todo: add try catch
		const recordingFormats: videoFormat[] = (await YTDownload.getInfo(url)).formats;
		LocalCache.cacheRecordingFormats(url, recordingFormats);
		return recordingFormats;
	},
	name: 'formats:get',
	type: 'handle'
};

export default handler;