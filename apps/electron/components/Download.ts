import type { YT_DL } from '../../typings';

export default class Download implements YT_DL.Core.Cache.Download {
  error?: Error;
  hasError: boolean;
  hasFinished: boolean;
  id: string;
  isSubscribed: boolean;
  name: string;
  progress: number;
  status: string;

  constructor({ error, hasError, hasFinished, id, isSubscribed, name, progress, status }: YT_DL.Core.Cache.Download) {
    this.error = error;
    this.hasError = hasError;
    this.hasFinished = hasFinished;
    this.id = id;
    this.isSubscribed = isSubscribed;
    this.name = name;
    this.progress = progress;
    this.status = status;
  }
}
