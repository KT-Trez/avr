import {YT_DL} from '../../typings';


export default class Messenger {
	public static emitter = new EventTarget();
}

const mountListeners = () => {
	window.coreAPI.notify((event, message, severity, title, variant) => {
		const customEvent = new CustomEvent<YT_DL.GUI.Notification>('notification', {
			detail: {
				message,
				severity,
				title,
				variant
			}
		});

		Messenger.emitter.dispatchEvent(customEvent);
	});

	window.coreAPI.queueUpdate(() => {
		const customEvent = new CustomEvent<YT_DL.GUI.Notification>('queue:update');

		Messenger.emitter.dispatchEvent(customEvent);
	});
};

export {
	mountListeners
};