export default class ExtensibleError extends Error {
	name: string;
	message: string;
	code?: number;
	details?: object;
	loggedMessage: string[];
	log: () => void;
	constructor(message: string, additionalInformation: any = {}) {
		super(message);
		this.name = this.constructor.name;
		this.message = message || 'no message provided';
		this.details = additionalInformation.details;
		this.code = additionalInformation.code;
		this.loggedMessage = [
			`An Error occured: ${message}`,
			this.code && process.env.DEBUG ? `Code: ${this.code}` : '',
			this.details && process.env.DEBUG
				? `Details: ${JSON.stringify(this.details)}`
				: '',
		].filter((v: string) => v.length);

		this.log = () => {
			// Always log the stack at the end
			console.log([...this.loggedMessage, this.stack || ''].join('\n'));
		};
	}
}
