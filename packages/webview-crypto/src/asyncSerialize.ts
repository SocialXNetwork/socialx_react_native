// tslint:disable
import find from 'lodash/find';

export interface ISerializer<T, S> {
	id: string;
	isType: (o: any) => boolean;
	toObject?: (t: T) => Promise<S>;
	fromObject?: (o: S) => Promise<T>;
}

class Serialized {
  // @ts-ignore
	__serializer_id: string;
	value: any;
}

function isSerialized(object: any): object is Serialized {
	return object.hasOwnProperty('__serializer_id');
}

export async function toObjects(
	serializers: Array<ISerializer<any, any>>,
	o: any,
): Promise<any> {
	if (typeof o !== 'object') {
		return o;
	}

	const serializer = find(serializers, (s: any) => s.isType(o));
	if (serializer) {
		const value = serializer.toObject ? await serializer.toObject(o) : o;
		return {
			__serializer_id: serializer.id,
			value: await toObjects(serializers, value),
		} as Serialized;
	}

	const newO: any = o instanceof Array ? [] : {};
	for (const atr in o) {
		newO[atr] = await toObjects(serializers, o[atr]);
	}
	return newO;
}

export async function fromObjects(
	serializers: Array<ISerializer<any, any>>,
	o: any,
): Promise<any> {
	if (typeof o !== 'object') {
		return o;
	}

	if (isSerialized(o)) {
		const value = await fromObjects(serializers, o.value);
		const serializer = find(serializers, ['id', o.__serializer_id]) || {} as any;
		if (serializer.fromObject) {
			return serializer.fromObject(value);
		}
		return value;
	}

	const newO: any = o instanceof Array ? [] : {};
	for (const atr in o) {
		newO[atr] = await fromObjects(serializers, o[atr]);
	}
	return newO;
}
