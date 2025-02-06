import type { IpcMainInvokeEvent } from 'electron';
import type { MediaFormat } from 'types/src/media.js';

export const downloadMedia = async (_: IpcMainInvokeEvent, formats: MediaFormat[]) => {
  console.log('downloadMedia', formats);
};
