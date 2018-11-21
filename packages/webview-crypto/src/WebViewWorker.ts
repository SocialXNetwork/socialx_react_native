import serializeError from 'serialize-error';

import { subtle } from './compat';
import { parse, stringify } from './serializeBinary';

export class WebViewWorker {
	constructor(private sendToMain: (message: string) => void) {
		sendToMain('We are ready!');
	}

	async onMainMessage(message: string) {
		let id: string;
		let method: string;
		let args: any[];
		try {
			({ id, method, args } = await parse(message));
		} catch (e) {
			await this.send({
				reason: `Couldn't parse data: ${e}`,
			});
			return;
		}
		let value;

		try {
			if (method === 'getRandomValues') {
				value = crypto.getRandomValues(args[0]);
			} else {
				const methodName = method.split('.')[1];
				console.log(methodName, args);
				value = await (subtle() as any)[methodName].apply(subtle(), args);

				// if we import a crypto key, we want to save how we imported it
				// so we can send that back and re-create the key later
				if (methodName === 'importKey') {
					value._import = {
						format: args[0],
						keyData: args[1],
					};
				}
			}
		} catch (e) {
			await this.send({ id, reason: (serializeError as any)(e) });
			return;
		}
		await this.send({ id, value });
	}

	async send(data: any) {
		let message: string;
		try {
			message = await stringify(data);
		} catch (e) {
			const newData = {
				id: data.id,
				reason: `stringify error ${e}`,
			};
			this.sendToMain(JSON.stringify(newData));
			return;
		}
		this.sendToMain(message);
	}
}
