import type { IpcMainHandler } from '../../typings/interfaces-core';
import Cache from '../services/Cache';

const handler: IpcMainHandler = {
  execute: (event, ids: string[]) => {
    Cache.unsubscribeItem(ids);
  },
  name: 'queue:unsubscribeItem',
  type: 'on',
};

export default handler;
