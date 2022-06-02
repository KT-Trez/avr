import * as path from 'path';
import {IpcMainHandler} from '../types/interfaces';


const handler: IpcMainHandler = {
	execute: (event , fileName: string) => {
		const absolutePath = path.resolve('../downloads/' + fileName);
		require('child_process').exec(`explorer.exe "${absolutePath}"`);
	},
	name: 'open-from-downloads',
	type: 'on'
};

export default handler;