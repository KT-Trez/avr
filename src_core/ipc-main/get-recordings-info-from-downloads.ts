import * as fs from 'fs';
import * as path from 'path';
import {IpcMainHandler} from '../types/interfaces';
import {downloadsPath} from '../utils/paths';


const handler: IpcMainHandler = {
	execute: async () => {
		const files: fs.Dirent[] = await new Promise((resolve, reject) => {
			fs.readdir(downloadsPath, {
				withFileTypes: true
			}, (err, files) => {
				if (err)
					reject(err);

				resolve(files);
			});
		});

		const directoryContent = [];
		for (const dirent of files.filter(file => file.name.endsWith('.mp3') || file.name.endsWith('.mp4'))) {
			if (!fs.existsSync(path.resolve(downloadsPath, dirent.name)))
				continue;

			const stats = fs.statSync(path.resolve(downloadsPath, dirent.name));
			const sizeInMB = Math.round(stats.size / (1024 * 1024));
			directoryContent.push({
				created: stats.birthtime,
				media: dirent.name.slice(dirent.name.lastIndexOf('.') + 1, dirent.name.length),
				modified: stats.mtime,
				name: dirent.name,
				size: {
					unit: 'MB',
					value: sizeInMB
				}
			});
		}

		return directoryContent;
	},
	name: 'get-recordings-info-from-downloads',
	type: 'handle'
};

export default handler;