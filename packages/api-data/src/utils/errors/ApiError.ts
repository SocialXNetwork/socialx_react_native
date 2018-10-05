import ExtensibleError from './ExtensibleError';

export default class ApiError extends ExtensibleError {
	initialRequestBody?: object;
	constructor(message: string, additionalInformation: any = {}) {
		super(message, additionalInformation);
		this.initialRequestBody = additionalInformation.initialRequestBody;
		if (this.initialRequestBody && process.env.DEBUG) {
			this.loggedMessage = [
				...this.loggedMessage,
				`Initial Request: ${JSON.stringify(this.initialRequestBody)}`,
			];
		}
	}
}
