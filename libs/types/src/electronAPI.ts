import type { Dirent } from 'node:fs';

export type ElectronAPI = {
  openDownloadsDir: () => void;
  readDownloadsDir: () => Promise<Dirent[]>;
};
