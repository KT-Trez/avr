import {app, BrowserWindow, BrowserWindowConstructorOptions, WebContents, WebPreferences} from 'electron';
import path from 'path';


export interface CustomBrowserWindowOptions extends Object {
	height: number;
	maxHeight?: number;
	maxWidth?: number;
	minHeight: number;
	minWidth: number;
	width: number;
}

export default class CustomBrowserWindow {
	private readonly height: number;
	private readonly maxHeight?: number;
	private readonly maxWidth?: number;
	private readonly minHeight: number;
	private readonly minWidth: number;
	private readonly width: number;
	win: BrowserWindow | undefined;
	webContents: WebContents | undefined;

	constructor(options: CustomBrowserWindowOptions) {
		this.height = options.height;
		this.maxHeight = options.maxHeight;
		this.maxWidth = options.maxWidth;
		this.minHeight = options.minHeight;
		this.minWidth = options.minWidth;
		this.width = options.width;
	}

	create(options?: BrowserWindowConstructorOptions, webPreferences?: WebPreferences, preloadPath?: string) {
		this.win = new BrowserWindow({
			...options,
			height: this.height,
			maxHeight: this.maxHeight,
			maxWidth: this.maxWidth,
			minHeight: this.minHeight,
			minWidth: this.minWidth,
			webPreferences: {
				...webPreferences,
				preload: preloadPath
			},
			width: this.width
		});
		this.webContents = this.win.webContents;
	}

	loadContent(customURL?: string) {
		if (!this.win)
			throw new Error('BrowserWindow not initialized');

		if (customURL)
			try {
				this.win.loadFile(customURL);
			} catch {
				this.win.loadURL(customURL);
			}

		if (!app.isPackaged)
			this.win.loadURL(process.env.NODE_GUI_ORIGIN ?? process.env.npm_package_config_default_origin!);
		else
			this.win.loadFile(path.resolve(__dirname, '../../build/index.html'));
	}
}