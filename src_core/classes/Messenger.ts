import {ipcMain} from 'electron';
import fs from 'fs';
import path from 'path';
import {IpcMainHandler} from '../types/interfaces';


class Messenger {
	public static bridge = new EventTarget();
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