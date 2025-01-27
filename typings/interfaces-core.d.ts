import type { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import type { Extensions } from './types';

export interface FFmpegProgress {
  frames: number | null;
  currentFps: number;
  currentKbps: number;
  targetSize: string;
  timemark: string;
  percent?: number;
}

export interface IpcMainHandler {
  execute: (event: IpcMainEvent | IpcMainInvokeEvent, ...args: any[]) => Promise<void | any> | void | any;
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
