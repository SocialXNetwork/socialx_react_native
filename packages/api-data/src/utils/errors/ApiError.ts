import ExtensibleError from './ExtensibleError';

export default class ApiError extends ExtensibleError {
	initialRequestBody: object | undefined = {};
	statusReturned: number | undefined = 0;
	constructor(message: string, additionalInformation: any = {}) {
		super(message, additionalInformation);
		this.statusReturned = additionalInformation.statusReturned;
		this.initialRequestBody = additionalInformation.initialRequestBody;
		if (this.statusReturned && process.env.DEBUG) {
			this.loggedMessage.push(
				`Request Returned Status: ${this.statusReturned}`,
			);
		}
		if (this.initialRequestBody && process.env.DEBUG) {
			this.loggedMessage.push(
				`Initial Request: ${JSON.stringify(this.initialRequestBody)}`,
			);
		}
	}
}
