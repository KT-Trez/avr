import type { FileInfo } from './fileInfo.js';
import type { Media, MediaFormat } from './media.js';

export type ElectronAPI = {
  downloadMedia: (formats: MediaFormat[]) => void;
  openDownloadsDir: () => void;
  readDownloadsDir: () => Promise<FileInfo[]>;
  searchMedia: (page: number, searchPhrase: string) => Promise<Media[]>;
  searchMediaFormats: (url: string) => Promise<MediaFormat[]>;
};
