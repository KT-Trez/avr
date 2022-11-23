import {ipcMain} from 'electron';
import fs from 'fs';
import path from 'path';
import {YT_DL} from '../../typings';
import {NotificationSeverity} from '../../typings/enums';
import {IpcMainHandler} from '../../typings/interfaces-core';
import {NotificationVariant} from '../../typings/types';
import {win} from '../main';


class Messenger {
	public static notify(message: string, severity: NotificationSeverity, title?: string, variant?: NotificationVariant) {
		if (!win.webContents)
			throw Error('Window not initialized');

		win.webContents.send('notification', message, severity, title, variant);
	}

	public static notifyProgress(id: string, progresses: YT_DL.Core.Stats.Progress[]) {
		if (!win.webContents)
			throw Error('Window not initialized');

		win.webContents.send('notification:progress', id, progresses);
	}
}


function mountIpcMainHandlers() {
	fs.readdir(path.resolve(__dirname, '../ipc-main'), async (err, filesNames) => {
		if (err)
			throw Error('Cannot read directory with ipcMain handlers: ' + err.message);

		for (const fileName of filesNames) {
			const ipcMainHandler: IpcMainHandler = (require('../ipc-main/' + fileName)).default;

			switch (ipcMainHandler.type) {
				case 'handle':
					ipcMain.handle(ipcMainHandler.name, ipcMainHandler.execute);
					break;
				case 'on':
					ipcMain.on(ipcMainHandler.name, ipcMainHandler.execute);
					break;
				case 'once':
					ipcMain.once(ipcMainHandler.name, ipcMainHandler.execute);
			}
		}
	});
}

export {
	Messenger,
	mountIpcMainHandlers
};