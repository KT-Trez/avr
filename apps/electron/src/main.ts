import 'dotenv/config';
import { app } from 'electron';
import path from 'path';
import { AppWindow } from './components/AppWindow.js';

app.on('ready', () => {
  const win = new AppWindow({
    autoHideMenuBar: app.isPackaged,
    backgroundColor: '#333',
    center: true,
    title: app.getName() + ' v' + app.getVersion(),
    height: 500,
    minHeight: 600,
    minWidth: 900,
    width: 1000,
    webPreferences: {
      devTools: !app.isPackaged,
      preload: path.resolve(path.join('src', 'electronAPI', 'preload.mjs')),
      sandbox: false,
      webSecurity: !app.isPackaged,
    },
  });

  win.initContent();
  win.initEvents();
});
