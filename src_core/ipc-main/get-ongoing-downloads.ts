import {IpcMainHandler} from '../../typings/interfaces-core';
import LocalCache from '../services/LocalCache';


const handler: IpcMainHandler = {
	execute: async () => {
		return LocalCache.readOngoingDownloads();
	},
	name: 'currentDownloads:get',
	type: 'handle'
};

export default handler;