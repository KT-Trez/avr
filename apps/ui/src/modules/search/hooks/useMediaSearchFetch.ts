import { useCallback, useEffect, useRef, useState } from 'react';
import type { Media } from 'types/src/media.ts';
import { noop } from 'utils/src/noop.ts';
import { useDebounce } from '../../../hooks/useDebounce.ts';

export const useMediaSearchFetch = (searchPhrase: string) => {
  const debouncedSearchPhrase = useDebounce(searchPhrase);
  const lastSearchPhrase = useRef<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [media, setMedia] = useState<Media[]>([]);

  const fetchMedia = useCallback(async (searchPhrase: string) => {
    setIsLoading(true);
    lastSearchPhrase.current = searchPhrase;

    try {
      setMedia(await window.electronAPI.searchMedia(0, searchPhrase));
    } catch (error) {
      // todo: show notification about the error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && debouncedSearchPhrase !== lastSearchPhrase.current) {
      fetchMedia(debouncedSearchPhrase).catch(noop);
    }
  }, [debouncedSearchPhrase, fetchMedia, isLoading]);

  return {
    isLoading,
    media,
  };
};
