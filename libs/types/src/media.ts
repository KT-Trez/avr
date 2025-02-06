export type Media = {
  author: string;
  description: string;
  id: string;
  published: string;
  thumbnail: string;
  timestamp: string;
  title: string;
  url: string;
  views: number;
};

export type MediaFormat = {
  bitrateAudio?: number;
  bitrateVideo?: number;
  codecsAudio?: string;
  codecsVideo?: string;
  container: string;
  fps?: number;
  hasAudio: boolean;
  hasVideo: boolean;
  id: string;
  itag: number;
  qualityAudio?: string;
  qualityVideo?: string;
  url: string;
};
