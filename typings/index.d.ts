import {videoFormat} from 'ytdl-core';
import {RecordingMetadata} from '../src_core/types/interfaces';
import {SizeUnits} from './types';


export declare module YT_DL {
	export module Core {
		export module Stats {
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

	}
}