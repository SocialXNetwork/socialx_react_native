export default (
	args: any,
	defParams: any,
	methodName: string | any = 'method',
	optionsFormatter: any = null,
) => {
	let params: { [key: string]: any } = {};
	let options: { [key: string]: any } = {};
	let xargs = args;

	const expectedArgCount = defParams.length;

	// Extra callback argument?  Last per promisifyAll standard.
	// Also this shouldnt exist on a perfect structure, mostly used as a promise resolver/rejecter.
	let callbackArg: (err: any, res?: any) => void = () => undefined;
	if (typeof xargs[xargs.length - 1] === 'function') {
		callbackArg = xargs[xargs.length - 1];
		xargs = xargs.slice(0, xargs.length - 1);
	}

	let callback;
	let returnPromise;
	if (callbackArg) {
		callback = (err: any, result: any) => {
			if (err) {
				callbackArg(err);
			} else {
				callbackArg(null, result);
			}
		};
	} else {
		returnPromise = new Promise((resolve, reject) => {
			callback = (err: any, result: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			};
		});
	}

	// Look for the options parameter (after potential callback was removed)
	if (
		typeof optionsFormatter === 'function' &&
		xargs.length > 0 &&
		((typeof xargs[0] === 'object' && xargs.length === 2) || xargs.length === expectedArgCount + 1)
	) {
		// An extra options argument
		options = optionsFormatter(xargs[xargs.length - 1]);
		if (options != null) {
			// It is valid, remove it to avoid parameter count an error below
			xargs = xargs.slice(0, xargs.length - 1);
		}
	}

	// Parameteters (args) can be ordered or an object
	if (xargs.length === 1 && typeof xargs[0] === 'object') {
		params = xargs[0];
	} else {
		// give ordered paramaters names

		if (xargs.length > expectedArgCount) {
			// console.log('typeof defParams[expectedArgCount]', xargs)
			throw new TypeError(
				`${methodName} is expecting ${expectedArgCount} parameters but ${
					xargs.length
				} where provided`,
			);
		}

		// convert ordered parameters into a value object by parameter name
		let pos = 0;
		for (const defParam of defParams) {
			params[defParam] = xargs[pos];
			pos++;
		}
	}
	return { params, options, callback, returnPromise };
};
