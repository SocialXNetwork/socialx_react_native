import serializeError from 'serialize-error';
import {
	IArrayBufferViewWithPromise,
	parse,
	stringify,
} from './serializeBinary';

const SUBTLE_METHODS = [
	'encrypt',
	'decrypt',
	'sign',
	'verify',
	'digest',
	'generateKey',
	'deriveKey',
	'deriveBits',
	'importKey',
	'exportKey',
	'wrapKey',
	'unwrapKey',
];

/*
MainWorker provides a `crypto` attribute that proxies method calls
to the webview.

It sends strings to the webview in the format:

    {
      id: <id>,
      method: getRandomValues | subtle.<method name>,
      args: [<serialized arg>]
    }

When the webview succeeds in completeing that method, it gets backs:

    {
      id: <id>,
      value: <serialized return value>
    }

And when it fails:

    {
      id: <id>,
      reason: <serialized rejected reason>,
    }

*/
export default class MainWorker {
	get crypto(): Crypto {
		const callMethod = this.callMethod;
		return {
			subtle: this.subtle,
			getRandomValues: this.getRandomValues.bind(this),
			fake: true,
		} as any;
	}

	private get subtle(): SubtleCrypto {
		const s: any = {};
		for (const m of SUBTLE_METHODS) {
			s[m] = (...args: any[]) => {
				return this.callMethod(`subtle.${m}`, args, true);
			};
		}
		return s as SubtleCrypto;
	}

	// http://stackoverflow.com/a/105074/907060
	private static uuid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return `${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}`;
	}
	// hold a queue of messages to send, in case someone calls crypto
	// before the webview is initialized
	private toSend: string[] = [];
	private readyToSend = false;

	// Holds the `resolve` and `reject` function for all the promises
	// we are working on
	private messages: {
		[id: string]: {
			resolve: (value: any) => void;
			reject: (reason: any) => void;
		};
	} = {};

	// sendToWebView should take a string and send that message to the webview
	constructor(
		private sendToWebView: (message: string) => void,
		private debug = false,
	) {}

	onWebViewMessage(message: string): void {
		// first message just tells us the webview is ready
		if (!this.readyToSend) {
			if (this.debug) {
				console.log('[webview-crypto] Got first message; ready to send');
			}
			this.readyToSend = true;
			for (const m of this.toSend) {
				this.sendToWebView(m);
			}
			return;
		}
		parse(message)
			.then(({ id, value, reason }) => {
				if (this.debug) {
					console.log(
						'[webview-crypto] Received message:',
						JSON.stringify({
							id,
							value,
							reason,
						}),
					);
				}
				if (!id) {
					console.warn(
						'[webview-crypto] no ID passed back from message:',
						JSON.stringify(serializeError(reason)),
					);
					return;
				}
				const { resolve, reject } = this.messages[id];
				if (value) {
					resolve(value);
				} else {
					reject(reason);
				}
				delete this.messages[id];
			})
			.catch((reason) => {
				console.warn(
					'[webview-crypto] error in `parse` of message:',
					JSON.stringify(message),
					'reason:',
					JSON.stringify(serializeError(reason)),
				);
			});
	}

	private getRandomValues(
		array: IArrayBufferViewWithPromise,
	): IArrayBufferViewWithPromise {
		const promise = this.callMethod('getRandomValues', [array], false);

		// make the _promise not enumerable so it isn't JSON stringified,
		// which could lead to an infinite loop with Angular's zone promises
		Object.defineProperty(array, '_promise', {
			value: promise,
			configurable: true,
			enumerable: false,
			writable: true,
		});

		promise.then((updatedArray: ArrayBufferView) => {
			(array as any).set(updatedArray);
		});
		return array;
	}

	private callMethod(
		method: string,
		args: any[],
		waitForArrayBufferView: boolean,
	): Promise<any> {
		const id = MainWorker.uuid();
		// store this promise, so we can resolve it when we get a message
		// back from the web view
		const promise = new Promise((resolve, reject) => {
			this.messages[id] = { resolve, reject };
		});
		const payloadObject = { method, id, args };
		if (this.debug) {
			console.log(
				'[webview-crypto] Sending message:',
				JSON.stringify({
					method,
					args,
					payloadObject,
				}),
			);
		}
		stringify(payloadObject, waitForArrayBufferView)
			.then((message) => {
				if (this.readyToSend) {
					this.sendToWebView(message);
				} else {
					this.toSend.push(message);
				}
			})
			.catch((reason) => {
				this.messages[id].reject({
					message: `exception in stringify-ing message: ${method} ${id}`,
					reason,
				});
				delete this.messages[id];
			});
		return promise;
	}
}
