import { app } from 'electron';

import fs from 'node:fs/promises';
import path from 'path';

export const openDownloadsDir = async () => {
  const dir = path.join(app.getPath('downloads'));
  console.log(dir);
  await fs.opendir(dir);
};
