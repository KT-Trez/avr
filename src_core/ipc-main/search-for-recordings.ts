import {IpcMainInvokeEvent} from 'electron';
import {IpcMainHandler} from '../types/interfaces';


const YTSearch = require('yt-search');

const handler: IpcMainHandler = {
	execute: async (event: IpcMainInvokeEvent, keywords: string) => {
		const searchData = await YTSearch(keywords);

		const videosMetadata = [];
		for (const video of searchData.videos) {
			//@ts-ignore
			delete video.duration.toString;
			//@ts-ignore
			delete video.seconds;
			//@ts-ignore
			delete video.timestamp;

			videosMetadata.push(video);
		}
		return videosMetadata;
	},
	name: 'search-for-recordings',
	type: 'handle'
};

export default handler;