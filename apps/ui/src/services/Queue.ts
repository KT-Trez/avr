import { YT_DL } from '../../typings';
import { ProgressAction, ProgressType } from '../../typings/enums';

export interface QueueItem {
	hasEnded: boolean;
	id: string;
	name: string;
	progresses: { action: ProgressAction, type: ProgressType, value: number }[];
}

export default class Queue {
	public static map = new Map<string, QueueItem>();

	public static addProgress(actions: { action: ProgressAction, type: ProgressType, value?: number }[], id: string, name: string) {
		for (const action of actions)
			action.value = 0;

		this.map.set(id, {
			hasEnded: false,
			id,
			name, // @ts-ignore
			progresses: actions
		});
	}

	public static getCurrentProgresses() {
		return [...this.map.values()].filter(p => !p.hasEnded);
	}

	public static updateProgress(id: string, progresses: YT_DL.Core.Stats.Progress[]) {
		const entry = this.map.get(id);
		if (!entry)
			return console.error('update referenced missing progress');

		for (const progress of progresses) {
			const p = entry.progresses.find(p => p.action === progress.action && p.type === progress.type);
			if (p)
				p.value = progress.value;
		}
		this.map.set(id, entry);
	}
}