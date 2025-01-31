import type { ConstValues } from './helpers.js';

export type FileInfo = {
  createdAt: Date;
  extension: FileExtension;
  filename: string;
  modifiedAt: Date;
  size: number;
  uid: string;
};

export const fileExtension = {
  Mp3: 'mp3',
  Mp4: 'mp4',
} as const;
export type FileExtension = ConstValues<typeof fileExtension>;
