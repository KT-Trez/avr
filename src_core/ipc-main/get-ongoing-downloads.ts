import LocalCache from '../services/LocalCache';
import {IpcMainHandler} from '../types/interfaces';


const handler: IpcMainHandler = {
	execute: async () => {
		return LocalCache.readOngoingDownloads();
	},
	name: 'get-ongoing-downloads',
	type: 'handle'
};

export default handler;