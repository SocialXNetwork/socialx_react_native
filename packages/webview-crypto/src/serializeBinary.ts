import { fromObjects, ISerializer, toObjects } from './asyncSerialize';
import { subtle } from './compat';

import { Base64 } from 'js-base64';

declare const WebViewBridge: any;

export async function parse(text: string): Promise<any> {
	// need decodeURIComponent so binary strings are transfered properly
	const deocodedText = unescape(text);
	const objects = JSON.parse(deocodedText);
	return fromObjects(serializers(true), objects);
}
export async function stringify(value: any, waitForArrayBufferView = true): Promise<string> {
	const serialized = await toObjects(serializers(waitForArrayBufferView), value);
	// need encodeURIComponent so binary strings are transfered properly
	const message = JSON.stringify(serialized);
	return escape(message);
}

function serializers(waitForArrayBufferView: boolean) {
	return [
		ArrayBufferSerializer,
		ArrayBufferViewSerializer(waitForArrayBufferView),
		CryptoKeySerializer,
	];
}

const ArrayBufferSerializer: ISerializer<ArrayBuffer, string> = {
	id: 'ArrayBuffer',
	isType: (o: any) => o instanceof ArrayBuffer,

	// from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
	// modified to use Int8Array so that we can hold odd number of bytes
	toObject: async (ab: ArrayBuffer) => {
		return String.fromCharCode.apply(null, new Int8Array(ab));
	},
	fromObject: async (data: string) => {
		const buf = new ArrayBuffer(data.length);
		const bufView = new Int8Array(buf);
		for (let i = 0, strLen = data.length; i < strLen; i++) {
			bufView[i] = data.charCodeAt(i);
		}
		return buf;
	},
};

interface IArrayBufferViewSerialized {
	name: string;
	buffer: ArrayBuffer;
}

export interface IArrayBufferViewWithPromise extends ArrayBufferView {
	_promise?: Promise<ArrayBufferView>;
}
function isArrayBufferViewWithPromise(obj: any): obj is IArrayBufferViewWithPromise {
	return obj.hasOwnProperty('_promise');
}

// Normally we could just do `abv.constructor.name`, but in
// JavaScriptCore, this wont work for some weird reason.
// list from https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView
function arrayBufferViewName(abv: ArrayBufferView): string {
	if (abv instanceof Int8Array) {
		return 'Int8Array';
	}
	if (abv instanceof Uint8Array) {
		return 'Uint8Array';
	}
	if (abv instanceof Uint8ClampedArray) {
		return 'Uint8ClampedArray';
	}
	if (abv instanceof Int16Array) {
		return 'Int16Array';
	}
	if (abv instanceof Uint16Array) {
		return 'Uint16Array';
	}
	if (abv instanceof Int32Array) {
		return 'Int32Array';
	}
	if (abv instanceof Uint32Array) {
		return 'Uint32Array';
	}
	if (abv instanceof Float32Array) {
		return 'Float32Array';
	}
	if (abv instanceof Float64Array) {
		return 'Float64Array';
	}
	if (abv instanceof DataView) {
		return 'DataView';
	}
	return '';
}

function ArrayBufferViewSerializer(
	waitForPromise: boolean,
): ISerializer<ArrayBufferView, IArrayBufferViewSerialized> {
	return {
		id: 'ArrayBufferView',
		isType: ArrayBuffer.isView,
		toObject: async (abv: ArrayBufferView) => {
			if (waitForPromise) {
				// wait for promise to resolve if the abv was returned from getRandomValues
				if (isArrayBufferViewWithPromise(abv)) {
					await abv._promise;
				}
			}
			return {
				name: arrayBufferViewName(abv),
				buffer: abv.buffer,
			} as any;
		},
		fromObject: async (abvs: IArrayBufferViewSerialized) => {
			// tslint:disable-next-line
			return eval(`new ${abvs.name}(abvs.buffer)`);
		},
	};
}

interface ICryptoKeyWithData extends CryptoKey {
	_import: {
		format: string;
		keyData: JsonWebKey | BufferSource;
	};
}

function hasData(ck: ICryptoKeyWithData | CryptoKey): ck is ICryptoKeyWithData {
	return (ck as ICryptoKeyWithData)._import !== undefined;
}

interface ICryptoKeySerialized extends ICryptoKeyWithData {
	serialized: boolean;
}

const CryptoKeySerializer: ISerializer<ICryptoKeyWithData | CryptoKey, ICryptoKeySerialized> = {
	id: 'CryptoKey',
	isType: (o: any) => {
		const localStr = o.toLocaleString();
		// can't use CryptoKey or constructor on WebView iOS
		const isCryptoKey = localStr === '[object CryptoKey]' || localStr === '[object Key]';
		const isCryptoKeyWithData = o._import && !o.serialized;
		return isCryptoKey || isCryptoKeyWithData;
	},
	toObject: async (ck) => {
		// if we already have the import serialized, just return that
		if (hasData(ck)) {
			return {
				serialized: true,
				_import: ck._import,
				type: ck.type,
				extractable: ck.extractable,
				algorithm: ck.algorithm,
				usages: ck.usages,
			};
		}
		const jwk = await subtle().exportKey('jwk', ck);
		return {
			_import: {
				format: 'jwk',
				keyData: jwk,
			},
			serialized: true,
			algorithm: ck.algorithm,
			extractable: ck.extractable,
			usages: ck.usages,
			type: ck.type,
		};
	},
	fromObject: async (cks: ICryptoKeySerialized) => {
		// if we don't have access to to a real crypto implementation, just return
		// the serialized crypto key
		if ((crypto as any).fake) {
			const newCks: ICryptoKeySerialized = { ...cks };
			delete newCks.serialized;
			return newCks;
		}
		return subtle().importKey(
			cks._import.format,
			cks._import.keyData as any,
			cks.algorithm as any,
			cks.extractable,
			cks.usages,
		);
	},
};
