import {videoFormat} from 'ytdl-core';
import {RecordingMetadata} from '../src_core/types/interfaces-core';
import {NotificationSeverity, ProgressAction, ProgressType} from './enums';
import {NotificationVariant, SizeUnits} from './types';


export declare module YT_DL {
	export module Core {
		export module Stats {
			export interface Progress {
				action: ProgressAction;
				type: ProgressType;
				value: number;
			}

			export interface FileStats {
				created: Date;
				media: string;
				modified: Date;
				name: string;
				size: {
					unit: SizeUnits,
					value: number
				};
			}
		}

		export module Workers {
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
		}
	}

	export module GUI {
		export module Events {
			export interface CustomEventMap {
				notification: CustomEvent<YT_DL.GUI.Notification>;
				'notification:progress': CustomEvent<undefined>;
			}
		}

		export module Formats {
			export interface SelectedFormat {
				details: videoFormat;
				type: 'audio' | 'video';
			}
		}

		export interface Notification {
			message: string;
			severity: NotificationSeverity;
			title?: string;
			variant?: NotificationVariant;
		}
	}
}