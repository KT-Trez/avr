import {IpcMainInvokeEvent} from 'electron';
import {videoFormat} from 'ytdl-core';
import {IpcMainHandler} from '../../typings/interfaces-core';
import Cache from '../services/Cache';


const YTDownload = require('ytdl-core');

const handler: IpcMainHandler = {
	execute: async (event: IpcMainInvokeEvent, url: string) => {
		if (Cache.hasRecordingFormats(url))
			return Cache.readRecordingFormats(url);

		// todo: add try catch
		const recordingFormats: videoFormat[] = (await YTDownload.getInfo(url)).formats;
		Cache.cacheRecordingFormats(url, recordingFormats);
		return recordingFormats;
	},
	name: 'formats:get',
	type: 'handle'
};

export default handler;