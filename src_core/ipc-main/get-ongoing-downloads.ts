import LocalCache from '../services/LocalCache';
import {IpcMainHandler} from '../types/interfaces';


const handler: IpcMainHandler = {
	execute: async () => {
		return LocalCache.readOngoingDownloads();
	},
	name: 'currentDownloads:get',
	type: 'handle'
};

export default handler;