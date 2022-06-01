import {app, BrowserWindow} from 'electron';


// app's core with it's saved instance
class Core {
	constructor() {
		this.loadAppBehaviour();
	}

	createWindow() {
		const win = new BrowserWindow({
			height: 600,
			minHeight: 600,
			minWidth: 900,
			webPreferences: {
				contextIsolation: false,
				nodeIntegration: true
			},
			width: 940
		});

		// todo: load static files instead of url && fix isDev
		win.loadURL('http://localhost:3000').then(() => console.log('[INFO] Loaded from live url.'));
	}

	loadAppBehaviour() {
		app.on('activate', () => {
			if (BrowserWindow.getAllWindows().length === 0)
				this.createWindow();
		});

		app.on('window-all-closed', () => app.quit());

		app.whenReady().then(this.createWindow);
	}
}


new Core();