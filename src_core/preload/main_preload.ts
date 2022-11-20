import {contextBridge} from 'electron';


contextBridge.exposeInMainWorld('coreAPI', {
	//messengerBridge: Messenger.bridge
});