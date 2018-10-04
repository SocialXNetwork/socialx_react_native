// TODO: this needs to get out of this library and be plugged in from RN, but
// better yet, do this in redux as a storage!
import * as Gun from 'gun';
import { AsyncStorage } from 'react-native';

const read = (context: any) => {
	const { get, gun } = context;
	const { '#': key } = get;

	const done = (err: any, data?: any) => {
		gun._.root.on('in', {
			err,
			'@': context['#'],
			put: Gun.graph.node(data),
		});
	};

	AsyncStorage.getItem(key, (err: any, result: any) => {
		if (err) {
			done(err);
		} else if (result === null) {
			// Nothing found
			done(null);
		} else {
			done(null, JSON.parse(result as string));
		}
	});
};

const write = (context: any) => {
	const { put: graph, gun } = context;
	const keys = Object.keys(graph);

	const instructions = keys.map((key: string) => [
		key,
		JSON.stringify(graph[key]),
	]);

	AsyncStorage.multiMerge(instructions, (err?: any[]) => {
		gun._.root.on('in', {
			err,
			'@': context['#'],
			ok: !err || err.length === 0,
		});
	});
};

// This returns a promise, it can be awaited!
const reset = () => AsyncStorage.clear();

export default {
	read,
	write,
	reset,
};
