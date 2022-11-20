declare global {
	interface Window {
		coreAPI: ElectronCoreAPI;
	}
}

export interface ElectronCoreAPI {
	messengerBridge: EventTarget;
}