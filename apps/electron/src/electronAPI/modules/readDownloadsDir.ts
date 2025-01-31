import { app } from 'electron';
import fs from 'node:fs/promises';
import path from 'path';

const ALLOWED_EXTENSIONS = new Set(['.mp3', '.mp4']);

export const readDownloadsDir = async () => {
  const dir = path.join(app.getPath('downloads'));
  const files = await fs.readdir(dir, { encoding: 'utf-8', withFileTypes: true });

  return files.filter(dirent => {
    const extension = dirent.name.slice(dirent.name.lastIndexOf('.'), dirent.name.length);

    return dirent.isFile() && ALLOWED_EXTENSIONS.has(extension);
  });
};
