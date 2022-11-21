import * as path from 'path';
import {IpcMainHandler} from '../types/interfaces';
import {downloadsPath} from '../utils/paths';


const handler: IpcMainHandler = {
	execute: () => {
		const downloadsAbsolutePath = path.resolve(downloadsPath);
		require('child_process').exec(`explorer.exe "${downloadsAbsolutePath}"`);
	},
	name: 'downloads:open',
	type: 'on'
};

export default handler;