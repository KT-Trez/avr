import {IpcMainEvent, IpcMainInvokeEvent} from 'electron';
import {videoFormat} from 'ytdl-core';
import {Extensions} from '../../typings/types';


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

export interface RecordingMetadata {
	audioBitrate: number;
	recordingDurationSec: number;
	recordingExtension: Extensions;
	recordingID: string;
	videoQuality: string;
}

export interface DownloadWorkerData {
	recordingFormat: videoFormat;
	recordingMetadata: RecordingMetadata;
	recordingURL: string;
}

export interface MergeWorkerData {
	recordingPaths: string[];
	savePath: string;
}

export interface WorkerMessage {
	details: any[];
	type: string;
}