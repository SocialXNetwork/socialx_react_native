import { Api, JsonRpc, JsSignatureProvider, RpcError } from 'eosjs';

import { TextDecoder, TextEncoder } from 'text-encoding';

import apiGen from './apiGen';
import apiInterface from './interface';
import processArgs from './process-args';

const altApi = (config: Json | any) => {
	return new apiGen('v1', apiInterface, config);
};

const rpc = (endPoint: string = 'http://127.0.0.1:8888') => new JsonRpc(endPoint, { fetch });

const api = (rpcRef: typeof JsonRpc, signatureProvider: typeof JsSignatureProvider) =>
	new Api({
		rpc: rpcRef,
		signatureProvider,
		textDecoder: new TextDecoder(),
		textEncoder: new TextEncoder(),
	});

export default {
	// def ap
	api,
	rpc,
	RpcError,
	// ot
	altApi,
	processArgs,
	apiInterface,
};
