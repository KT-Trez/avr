import path from 'path';
import { BrowserWindow, type BrowserWindowConstructorOptions, app } from 'electron';

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
      this.win.loadFile(path.resolve(__dirname, '../../' + (app.isPackaged ? '' : 'build') + '/index.html'));
    } else {
      this.win.loadURL(process.env.NODE_GUI_ORIGIN ?? process.env.npm_package_config_default_origin!);
    }
  }
}
