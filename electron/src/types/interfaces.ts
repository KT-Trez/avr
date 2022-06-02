import {IpcMainEvent, IpcMainInvokeEvent} from 'electron';


export interface IpcMainHandler {
	execute: (event: (IpcMainEvent | IpcMainInvokeEvent), ...args: any[]) => Promise<void | any> | void;
	name: string;
	type: 'on' | 'once' | 'handle';
}