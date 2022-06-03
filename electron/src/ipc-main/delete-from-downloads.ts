import * as fs from 'fs';
import Core from '../../core';
import LocalCache from '../services/LocalCache';
import {NotificationSeverity} from '../types/enums';
import {IpcMainHandler} from '../types/interfaces';


const handler: IpcMainHandler = {
	execute: (event, path: string) => {
		fs.unlink('../downloads/' + path, () => {
			console.log('[INFO] Resource deleted (' + path + ')');
			Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Information, 'Deleted file: ' + path);
		});
		LocalCache.clearRecordingIsDownloaded(path);
	},
	name: 'delete-from-downloads',
	type: 'on'
};

export default handler;