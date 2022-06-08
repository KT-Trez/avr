import {ipcMain} from 'electron';
import * as fs from 'fs';
import {IpcMainHandler} from '../types/interfaces';
import {ipcMainHandlersPath} from './paths';


export default function mountIpcMainHandlers() {
	fs.readdir(ipcMainHandlersPath, async (err, filesNames) => {
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