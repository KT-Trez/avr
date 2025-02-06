import { useCallback, useEffect, useState } from 'react';
import type { MediaFormat } from 'types/src/media.ts';
import { noop } from 'utils/src/noop.ts';

export const useMediaFormatsFetch = (url: string) => {
  const [formats, setFormats] = useState<MediaFormat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMediaFormats = useCallback(async () => {
    setIsLoading(true);

    try {
      // todo: use dynamic link
      setFormats(await window.electronAPI.searchMediaFormats(url));
    } catch (error) {
      // todo: add error handling
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (formats.length === 0) {
      fetchMediaFormats().then(noop);
    }
  }, [fetchMediaFormats, formats.length]);

  return {
    formats,
    isLoading,
  };
};
