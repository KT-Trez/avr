import { app } from 'electron';
import fs from 'node:fs/promises';
import path from 'node:path';
import { type FileExtension, fileExtension, type FileInfo } from 'types/src/fileInfo.js';

const ALLOWED_EXTENSIONS = new Set<string>(Object.values(fileExtension));

export const readDownloadsDir = async () => {
  const dir = path.join(app.getPath('downloads'));
  const files = await fs.readdir(dir, { encoding: 'utf-8', withFileTypes: true });
  const stats = files.map(async dirent => [await fs.stat(path.join(dir, dirent.name)), dirent] as const);

  const settledData = await Promise.allSettled(stats);
  const fulfilledData = settledData.filter(stat => stat.status === 'fulfilled');
  const data = fulfilledData.map(stat => stat.value);

  return data.reduce<FileInfo[]>((acc, [stats, dirent]) => {
    const extension = dirent.name.slice(dirent.name.lastIndexOf('.') + 1, dirent.name.length);

    if (dirent.isFile() && ALLOWED_EXTENSIONS.has(extension)) {
      acc.push({
        createdAt: stats.mtime,
        extension: extension as FileExtension,
        filename: dirent.name,
        modifiedAt: stats.mtime,
        size: stats.size,
        uid: stats.uid.toString(),
      });
    }

    return acc;
  }, []);
};
