import type { IpcMainHandler } from '../../typings/interfaces-core';
import Cache from '../services/Cache';

const handler: IpcMainHandler = {
  execute: () => {
    return Cache.getQueue();
  },
  name: 'queue:getUpdate',
  type: 'handle',
};

export default handler;
