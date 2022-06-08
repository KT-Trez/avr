import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import mountIpcMainHandlers from './src/utils/mount-ipc-main-handlers';


// app's core with it's saved instance
// todo: reactor that mess below
export default class Core {
	private static instance: Core;

	static getInstance() {
		if (!this.instance)
			this.instance = new Core();
		return this.instance;
	}


	private win: BrowserWindow | undefined = undefined;

	constructor() {
		this.createBrowserWindow = this.createBrowserWindow.bind(this);

		mountIpcMainHandlers();
		this.startApp();
	}

	createBrowserWindow() {
		const win = new BrowserWindow({
			height: 600,
			minHeight: 600,
			minWidth: 900,
			roundedCorners: true,
			show: false,
			webPreferences: {
				contextIsolation: false,
				nodeIntegration: true
			},
			width: 940
		});

		win.once('ready-to-show', () => win.show());

		const absolutePath = path.resolve('../client/build/index.html');
		win.loadFile(absolutePath)
			.then(() => console.log('[INFO] Loaded from live URL.'))
			.catch(err => {
				console.log('[ERROR] Couldn\'t load from live URL (' + err.message + '). \nChanging loading to local files.');

				win.loadURL('http://localhost:3000')
					.then(() => console.log('[INFO] Loaded from local files.'))
					.catch(err => console.log('[ERROR] Couldn\'t load from local files: ' + err.message));
			});
		win.center();
		this.win = win;
	}

	getBrowserWindow() {
		return this.win!;
	}

	startApp() {
		app.once('activate', () => {
			if (BrowserWindow.getAllWindows().length === 0)
				this.createBrowserWindow();
		});

		app.on('window-all-closed', () => app.quit());

		app.whenReady().then(this.createBrowserWindow);
	}
}


Core.getInstance();