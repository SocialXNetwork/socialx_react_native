import ExtensibleError from './ExtensibleError';

export default class ValidationError extends ExtensibleError {
	validationInput?: object;
	constructor(message: string, additionalInformation: any = {}) {
		super(message, additionalInformation);
		this.validationInput = additionalInformation.validationInput;
		if (this.validationInput && process.env.DEBUG) {
			this.loggedMessage = [
				...this.loggedMessage,
				`Validation Input : ${JSON.stringify(this.validationInput)}`,
			];
		}
	}
}
