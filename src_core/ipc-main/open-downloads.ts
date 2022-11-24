import path from 'path';
import {IpcMainHandler} from '../../typings/interfaces-core';
import {getPath} from '../tools/getPath';


const handler: IpcMainHandler = {
	execute: () => {
		const downloadsAbsolutePath = path.join(getPath('downloads'));
		require('child_process').exec(`explorer.exe "${downloadsAbsolutePath}"`);
	},
	name: 'downloads:open',
	type: 'on'
};

export default handler;