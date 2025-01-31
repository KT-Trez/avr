import type { FileInfo } from './fileInfo.js';
import type { Media } from './media.js';

export type ElectronAPI = {
  openDownloadsDir: () => void;
  readDownloadsDir: () => Promise<FileInfo[]>;
  searchMedia: (page: number, searchPhrase: string) => Promise<Media[]>;
};
