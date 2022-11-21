import * as path from 'path';
import {IpcMainHandler} from '../types/interfaces';
import {downloadsPath} from '../utils/paths';


const handler: IpcMainHandler = {
	execute: (event, filename: string) => {
		const absolutePath = path.resolve(downloadsPath, filename);
		require('child_process').exec(`explorer.exe "${absolutePath}"`);
	},
	name: 'downloads:openFile',
	type: 'on'
};

export default handler;