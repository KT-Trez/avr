import * as path from 'path';
import {IpcMainHandler} from '../types/interfaces';


const handler: IpcMainHandler = {
	execute: () => {
		const downloadsAbsolutePath = path.resolve('../downloads');
		require('child_process').exec(`explorer.exe "${downloadsAbsolutePath}"`);
	},
	name: 'open-downloads',
	type: 'on'
};

export default handler;