import * as fs from 'fs';
import * as path from 'path';
import LocalCache from '../services/LocalCache';
import {IpcMainHandler} from '../types/interfaces';
import {downloadsPath} from '../utils/paths';


const handler: IpcMainHandler = {
	execute: (event, filePath: string) => {
		fs.unlink(path.resolve(downloadsPath, filePath), () => {
			console.info('[INFO] Resource deleted (' + filePath + ')');
			//Core.getInstance().getBrowserWindow().webContents.send('send-notification', NotificationSeverity.Information, 'Deleted file: ' + filePath);
		});
		LocalCache.clearRecordingIsDownloaded(filePath);
	},
	name: 'delete-from-downloads',
	type: 'on'
};

export default handler;