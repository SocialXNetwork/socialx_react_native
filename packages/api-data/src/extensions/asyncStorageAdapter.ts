// TODO: this needs to get out of this library and be plugged in from RN, but
// better yet, do this in redux as a storage!
import * as Gun from 'gun';
import { AsyncStorage } from 'react-native';

const read = (request: any, db: any) => {
	const { get, gun } = request;
	const { '#': key } = get;

	const done = (err: any, data?: any) => {
		db.on('in', {
			'@': request['#'],
			put: Gun.graph.node(data),
			err,
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

const write = (request: any, db: any) => {
	const { put: graph, gun } = request;
	const keys = Object.keys(graph);
	const dedupid = graph['#'];

	const instructions = keys.map((key: string) => [
		key,
		JSON.stringify(graph[key]),
	]);

	AsyncStorage.multiMerge(instructions, (err?: any[]) => {
		db.on('in', {
			'#': dedupid,
			ok: !err || err.length === 0,
			err,
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
