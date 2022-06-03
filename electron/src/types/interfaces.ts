import {IpcMainEvent, IpcMainInvokeEvent} from 'electron';


export interface FFmpegProgress {
	frames: number | null;
	currentFps: number;
	currentKbps: number;
	targetSize: string;
	timemark: string;
	percent?: number;
}

export interface IpcMainHandler {
	execute: (event: (IpcMainEvent | IpcMainInvokeEvent), ...args: any[]) => Promise<void | any> | void;
	name: string;
	type: 'on' | 'once' | 'handle';
}