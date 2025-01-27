import 'dotenv/config';
import { app } from 'electron';
import { AppWindow } from './components/AppWindow.ts';

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
      // preload: path.join(__dirname, 'preload', 'main_preload.js'),
      webSecurity: !app.isPackaged,
    },
  });

  win.initContent();
});
