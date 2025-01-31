import type { FileInfo } from './fileInfo.js';

export type ElectronAPI = {
  openDownloadsDir: () => void;
  readDownloadsDir: () => Promise<FileInfo[]>;
};
