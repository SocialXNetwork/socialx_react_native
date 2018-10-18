import uuidv4 from 'uuid/v4';

export class ActivitiesHelper<T> {
	currentActivity: any = null;

	public start(type: T) {
		const activity = {
			type,
			uuid: uuidv4(),
			timestamp: new Date(Date.now()).getTime(),
			done: false,
		};
		this.currentActivity = activity;
		return this.currentActivity;
	}

	public end(type: T) {
		const newActivity = {
			...this.currentActivity,
			done: true,
		};
	}
}
