import { useCallback, useEffect, useState } from 'react';
import type { FileInfo } from 'types/src/fileInfo.ts';
import { noop } from 'utils/src/noop.ts';

export const useDownloadsDirFetch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dirContents, setDirContents] = useState<FileInfo[]>([]);

  const fetchDownloadsDir = useCallback(async () => {
    setIsLoading(true);

    try {
      setDirContents(await window.electronAPI.readDownloadsDir());
    } catch (err) {
      // todo: show notification about the error
      console.log('read failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDownloadsDir().catch(noop);
  }, [fetchDownloadsDir]);

  return {
    dirContents,
    fetchDownloadsDir,
    isLoading,
  };
};
