// tslint:disable

import camelCase from 'camel-case';

import helpers from './helpers';
import processArgs from './process-args';

export interface IApigen {
	httpEndpoint?: string;
	verbose?: boolean;
	logger?: any;
	fetchConfiguration?: any;
}

/**
 * api generator.
 * generates a connection to a given set of apis/configs to a blockchain node/s.
 */
export default class {
	// api version
	private version: string;
	// api gateway definitions and parameters
	private definitions: Json | any;
	// api connection config
	private config: IApigen;

	private defaultLogger = {
		log: this.config.verbose ? console.log : '',
		error: console.error,
	};

	constructor(version: string, definitions: Json | any, config: IApigen) {
		this.version = version;
		this.definitions = definitions;
		this.config = {
			...config,
			httpEndpoint: config.httpEndpoint || '',
			verbose: config.verbose || false,
			logger: {
				...this.defaultLogger,
				...config.logger,
			},
		};
	}

	public bootstrap = async (): Promise<any> =>
		new Promise(async (resolve) => {
			const api: {[prop: string]: any} = {};
			const { httpEndpoint } = this.config;

			for (const apiGroup in this.definitions) {
				for (const apiMethod in this.definitions[apiGroup]) {
					const methodName = camelCase(apiMethod);
					const url = `${httpEndpoint}/${this.version}/${apiGroup}/${apiMethod}`;
					api[methodName] = await this.fetchMethod(
						methodName,
						url,
						this.definitions[apiGroup][apiMethod],
						this.config,
					);
				}
			}
			for (const helper in helpers.api) {
				// Insert `api` as the first parameter to all API helpers
				api[helper] = (...args: any[]) => helpers.api[helper](api, ...args);
			}
			resolve({ ...api, ...helpers });
		});

	public Usage = (methodName: string, definition: Json | any): string => {
		let logText = 'Usage';
		const out = (txt: string) => {
			logText += txt + '\n';
		};

		out(`${methodName} - ${definition.brief}`);

		// parameters
		out('\nParameters');
		if (definition.params) {
			out(JSON.stringify(definition.params, null, 2));
		} else {
			out('None');
		}

		// returns
		out('\nReturns');
		if (definition.results) {
			out(JSON.stringify(definition.results, null, 2));
		} else {
			out('None');
		}

		// errors
		out('\nErrors');
		if (definition.errors) {
			for (const err in definition.errors) {
				const errDesc = definition.errors[err];
				out(`${err}${errDesc ? ` - ${errDesc}` : ''}`);
			}
		} else {
			out('None');
		}
		return logText;
	};

	private fetchMethod = async (
		methodName: string,
		url: string,
		definition: Json | any,
		config: IApigen | any,
	): Promise<any> =>
		new Promise((resolve, reject) => {
			const { logger } = this.config;

			async (...args: any[]) => {
				if (args.length === 0) {
					console.log(this.Usage(methodName, definition));
					resolve();
				}

				const optsFormatter = (opt: any) => {
					if (typeof opt === 'boolean') {
						resolve({ broadcast: opt });
					}
				};

				// processed args
				const processedArgs = processArgs(
					args,
					Object.keys(definition.params || []),
					methodName,
					optsFormatter,
				);

				const { params, options, returnPromise } = processedArgs;

				const body = JSON.stringify(params);
				if (logger.log) {
					logger.log('api >', 'post', '\t', url, body);
				}

				const fetchConfiguration = { body, method: 'POST' };
				Object.assign(fetchConfiguration, config.fetchConfiguration);

				try {
					const doFetch = async () => {
						const response = await fetch(url, fetchConfiguration);
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							const bodyRes = await response.text();
							const error = new Error(bodyRes);
							const rError = {
								...error,
								status: response.status,
								statusText: response.statusText,
							};
							throw rError;
						}
					};

					const objResp = await doFetch();
					if (logger.log) {
						logger.log('api <', 'response', '\t', url, JSON.stringify(objResp));
					}

					resolve(objResp);
				} catch (ex) {
					let msg = '';
					try {
						msg = JSON.parse(ex.message).error.details[0];
					} catch (ext) {
						//
					}

					if (logger.error) {
						logger.error('api <', 'error', '\t', msg, url, body);
						logger.error(ex);
					}

					reject(ex);
				}
			};
		});
}
