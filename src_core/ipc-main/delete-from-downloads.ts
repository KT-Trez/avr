import fs from 'fs';
import path from 'path';
import {NotificationSeverity} from '../../typings/enums';
import {IpcMainHandler} from '../../typings/interfaces-core';
import {Messenger} from '../classes/Messenger';
import {getPath} from '../tools/getPath';


const handler: IpcMainHandler = {
	execute: (event, filePath: string) => {
		fs.unlink(path.join(getPath('downloads'), filePath), () => {
			console.info('[INFO] Resource deleted (' + filePath + ')');
			Messenger.notify('Deleted file [' + filePath + ']', NotificationSeverity.Info);
		});
	},
	name: 'downloads:delete',
	type: 'on'
};

export default handler;