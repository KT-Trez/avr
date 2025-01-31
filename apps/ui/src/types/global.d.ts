import type { ElectronAPI } from 'types/src/electronAPI.ts';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
