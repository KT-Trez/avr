import * as fs from 'fs';
import * as path from 'path';
import {NotificationSeverity} from '../../typings/enums';
import {Messenger} from '../classes/Messenger';
import LocalCache from '../services/LocalCache';
import {IpcMainHandler} from '../types/interfaces';
import {downloadsPath} from '../utils/paths';


const handler: IpcMainHandler = {
	execute: (event, filePath: string) => {
		fs.unlink(path.resolve(downloadsPath, filePath), () => {
			console.info('[INFO] Resource deleted (' + filePath + ')');
			Messenger.notify('Deleted file: ' + filePath, NotificationSeverity.Info);
		});
		LocalCache.clearRecordingIsDownloaded(filePath);
	},
	name: 'downloads:delete',
	type: 'on'
};

export default handler;