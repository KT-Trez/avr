import { app, BrowserWindow, type BrowserWindowConstructorOptions, ipcMain } from 'electron';
import { downloadMedia } from '../electronAPI/modules/downloadMedia.js';
import { openDownloadsDir } from '../electronAPI/modules/openDownloadsDir.js';
import { readDownloadsDir } from '../electronAPI/modules/readDownloadsDir.js';
import { searchMedia } from '../electronAPI/modules/searchMedia.js';
import { searchMediaFormats } from '../electronAPI/modules/searchMediaFormats.js';

export class AppWindow {
  win: BrowserWindow | undefined;

  constructor(options: BrowserWindowConstructorOptions) {
    this.win = new BrowserWindow(options);
  }

  initContent(contentUrl?: string) {
    if (!this.win) {
      throw new Error('BrowserWindow not initialized');
    }

    if (contentUrl)
      try {
        this.win.loadFile(contentUrl);
      } catch {
        this.win.loadURL(contentUrl);
      }

    if (app.isPackaged) {
      // this.win.loadFile(path.resolve(__dirname, '../../' + (app.isPackaged ? '' : 'build') + '/index.html'));
    } else {
      this.win.loadURL(process.env.NODE_GUI_ORIGIN ?? process.env.npm_package_config_default_origin!);
    }
  }

  initEvents() {
    ipcMain.handle('read:downloadsDir', readDownloadsDir);
    ipcMain.handle('search:media', searchMedia);
    ipcMain.handle('search:mediaFormats', searchMediaFormats);
    ipcMain.on('download:media', downloadMedia);
    ipcMain.on('open:downloadsDir', openDownloadsDir);
  }
}
