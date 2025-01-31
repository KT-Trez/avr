// import fs from 'fs';
// import path from 'path';
// import { ipcMain } from 'electron';
// import type { NotificationSeverity } from '../../typings/enums';
// import type { IpcMainHandler } from '../../typings/interfaces-core';
// import type { NotificationVariant } from '../../typings/types';
// import { win } from '../main';
//
// class Messenger {
//   public static lastProgresUpdate = 0;
//
//   public static notify(message: string, severity: NotificationSeverity, title?: string, variant?:
// NotificationVariant) { if (!win.webContents) throw Error('Window not initialized');
// win.webContents.send('notification', message, severity, title, variant); }  public static notifyQueueEnd() { if
// (!win.webContents) throw Error('Window not initialized');  win.webContents.send('notify:queueUpdate'); }  public
// static notifyQueueProgress() { if (!win.webContents) throw Error('Window not initialized');  if (new
// Date().getTime() <= this.lastProgresUpdate + 1500) return;  win.webContents.send('notify:queueUpdate');
// this.lastProgresUpdate = new Date().getTime(); } }  function mountIpcMainHandlers() {
// fs.readdir(path.resolve(__dirname, '../ipc-main'), async (err, filesNames) => { if (err) throw Error('Cannot read
// directory with ipcMain modules: ' + err.message);  for (const fileName of filesNames) { const ipcMainHandler:
// IpcMainHandler = require('../ipc-main/' + fileName).default;  switch (ipcMainHandler.type) { case 'handle':
// ipcMain.handle(ipcMainHandler.name, ipcMainHandler.execute); break; case 'on': ipcMain.on(ipcMainHandler.name,
// ipcMainHandler.execute); break; case 'once': ipcMain.once(ipcMainHandler.name, ipcMainHandler.execute); } } }); }
// export { Messenger, mountIpcMainHandlers };
