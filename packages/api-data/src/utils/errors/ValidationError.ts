import ExtensibleError from './ExtensibleError';

export default class ValidationError extends ExtensibleError {
	validationInput: any | undefined;
	constructor(message: string, additionalInformation: any = {}) {
		super(message, additionalInformation);
		this.validationInput = additionalInformation.validationInput;
		if (this.validationInput && process.env.DEBUG) {
			this.loggedMessage.push(
				`Validation Input : ${JSON.stringify(this.validationInput)}`,
			);
		}
	}
}
