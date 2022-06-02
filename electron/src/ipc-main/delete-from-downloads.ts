import * as fs from 'fs';
import {IpcMainHandler} from '../types/interfaces';


const handler: IpcMainHandler = {
	execute: (event, path: string) => {
		fs.unlink('../downloads/' + path, () => {
			// todo: alert user about deleted file
			console.log('[INFO] Resource deleted (' + path + ')');
		});
	},
	name: 'delete-from-downloads',
	type: 'on'
};

export default handler;