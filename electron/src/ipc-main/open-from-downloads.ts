import * as path from 'path';
import {IpcMainHandler} from '../types/interfaces';
import {downloadsPath} from '../utils/paths';


const handler: IpcMainHandler = {
	execute: (event , fileName: string) => {
		const absolutePath = path.resolve(downloadsPath, fileName);
		require('child_process').exec(`explorer.exe "${absolutePath}"`);
	},
	name: 'open-from-downloads',
	type: 'on'
};

export default handler;