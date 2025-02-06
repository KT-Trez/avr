import ytdl from '@distube/ytdl-core';
import type { IpcMainInvokeEvent } from 'electron';
import type { MediaFormat } from 'types/src/media.js';

export const searchMediaFormats = async (_: IpcMainInvokeEvent, url: string): Promise<MediaFormat[]> => {
  // for some reason ytdl.getInfo(url) returns duplicated formats so we need to filter them out
  const addedFormats = new Set<string>();
  const info = await ytdl.getInfo(url);

  return info.formats.reduce<MediaFormat[]>((acc, format) => {
    const id = `${format.itag}-${format.audioCodec}-${format.videoCodec}`;

    if (!addedFormats.has(id)) {
      acc.push({
        bitrateAudio: format.audioBitrate,
        bitrateVideo: format.bitrate,
        codecsAudio: format.audioCodec,
        codecsVideo: format.videoCodec,
        container: format.container,
        fps: format.fps,
        hasAudio: format.hasAudio,
        hasVideo: format.hasVideo,
        id,
        itag: format.itag,
        qualityAudio: format.audioQuality?.split('_').at(-1)?.toLowerCase(),
        qualityVideo: format.qualityLabel,
        url: format.url,
      });
      addedFormats.add(id);
    }

    return acc;
  }, []);
};
