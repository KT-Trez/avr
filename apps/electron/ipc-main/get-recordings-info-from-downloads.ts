import fs from 'fs';
import path from 'path';
import { YT_DL } from '../../typings';
import { IpcMainHandler } from '../../typings/interfaces-core';
import { getPath } from '../tools/getPath';

const handler: IpcMainHandler = {
	execute: async () => {
		const files: fs.Dirent[] = await new Promise((resolve, reject) => {
			fs.readdir(getPath('downloads'), {
				withFileTypes: true
			}, (err, files) => {
				if (err)
					reject(err);

				resolve(files);
			});
		});

		const directoryContent: YT_DL.Core.Stats.FileStats[] = [];
		for (const dirent of files.filter(file => file.name.endsWith('.mp3') || file.name.endsWith('.mp4'))) {
			if (!fs.existsSync(path.join(getPath('downloads'), dirent.name)))
				continue;

			const stats = fs.statSync(path.join(getPath('downloads'), dirent.name));
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
	name: 'downloads:get',
	type: 'handle'
};

export default handler;