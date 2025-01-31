import { useCallback, useEffect, useState } from 'react';
import type { Media } from 'types/src/media.ts';
import { noop } from 'utils/src/noop.ts';

export const useMediaSearchFetch = (searchPhrase: string) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [media, setMedia] = useState<Media[]>([]);

  const fetchMedia = useCallback(async (searchPhrase: string) => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      // setMedia(await window.coreAPI.searchVideos(keywords))
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && searchPhrase) {
      fetchMedia(searchPhrase).catch(noop);
    }
  }, [fetchMedia, isLoading, searchPhrase]);

  return {
    isError,
    isLoading,
    media,
  };
};
