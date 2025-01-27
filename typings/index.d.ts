import type { videoFormat } from 'ytdl-core';
import type { RecordingMetadata } from '../src_core/types/interfaces-core';
import type { NotificationSeverity, ProgressAction, ProgressType } from './enums';
import type { NotificationVariant, SizeUnits } from './types';

export declare namespace YT_DL {
  export namespace Core {
    export namespace Cache {
      export interface Download {
        error?: Error;
        hasError: boolean;
        hasFinished: boolean;
        id: string;
        isSubscribed: boolean;
        name: string;
        progress: number;
        status: string;
      }
    }

    export namespace Stats {
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
          unit: SizeUnits;
          value: number;
        };
      }
    }

    export namespace Workers {
      export interface DownloadWorkerData {
        recordingFormat: videoFormat;
        recordingMetadata: RecordingMetadata;
        recordingURL: string;
      }

      export interface MergeWorkerData {
        recordingPaths: string[];
        savePath: string;
      }

      export interface Message {
        details: any[];
        type: string;
      }
    }
  }

  export namespace GUI {
    export namespace Events {
      export interface CustomEventMap {
        notification: CustomEvent<YT_DL.GUI.Notification>;
        'queue:update': CustomEvent<undefined>;
      }
    }

    export namespace Formats {
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
