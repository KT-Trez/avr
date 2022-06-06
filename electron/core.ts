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

		const absolutePath = path.resolve('./gui/index.html');
		win.loadURL(absolutePath)
			.then(() => console.log('[INFO] Loaded from local filesystem.'))
			.catch(err => {
				console.log('[ERROR] Couldn\'t load from local filesystem: ' + err.message);
				console.log('[INFO] Loading from live server\'s URL instead.');

				win.loadURL(process.env.port ?? 'http://localhost:3000')
					.then(() => console.log('[INFO] Loaded from live server\'s URL.'))
					.catch(err => console.log('[ERROR] Couldn\'t load from live server\'s URL: ' + err.message));
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