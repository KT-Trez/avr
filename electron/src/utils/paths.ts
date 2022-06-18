import * as path from 'path';
import {app} from 'electron';


const asarPath =  app.isPackaged ? 'resources/app' : '';

// todo: fix all paths
export const downloadsPath = path.resolve(asarPath, app.getPath('downloads'));

export const ipcMainHandlersPath = path.resolve(asarPath, 'build/src/ipc-main');

export const workersPath = path.resolve(asarPath, 'build/src/workers');