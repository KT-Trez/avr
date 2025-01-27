import path from 'path';
import { IpcMainHandler } from '../../typings/interfaces-core';
import { getPath } from '../tools/getPath';

const handler: IpcMainHandler = {
	execute: (event, filename: string) => {
		const absolutePath = path.join(getPath('downloads'), filename);
		require('child_process').exec(`explorer.exe "${absolutePath}"`);
	},
	name: 'downloads:openFile',
	type: 'on'
};

export default handler;