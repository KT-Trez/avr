import type { IpcMainInvokeEvent } from 'electron';
import type { Media } from 'types/src/media.js';
import yts from 'yt-search';

export const searchMedia = async (_: IpcMainInvokeEvent, page: number, searchPhrase: string): Promise<Media[]> => {
  const result = await yts({
    query: searchPhrase,
    pageStart: page,
  });

  return result.videos.map<Media>(video => ({
    author: video.author.name,
    description: video.description,
    id: video.videoId,
    published: video.ago,
    thumbnail: video.image,
    timestamp: video.timestamp,
    title: video.title,
    url: video.url,
    views: video.views,
  }));
};
