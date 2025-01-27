import { app } from 'electron';
import path from 'path';

const paths = {
	downloads: app.getPath('downloads'),
	workers: path.resolve(__dirname, '../workers')
};


type pathsNames = 'downloads' | 'workers';

const getPath = (name: pathsNames) => {
	return paths[name]
};

export {
	getPath
};