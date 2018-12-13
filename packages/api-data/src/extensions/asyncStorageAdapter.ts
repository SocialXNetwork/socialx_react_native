// TODO: this needs to get out of this library and be plugged in from RN, but
// better yet, do this in redux as a storage!
import * as Gun from 'gun';
import { AsyncStorage } from 'react-native';

const read = (request: any, db: any) => {
	const { get } = request;

	const dedupid = request['#'];
	const key = get['#'];
	const field = get['.'];

	const done = (err: any, data?: any) => {
		if (!data && !err) {
			db.on('in', {
				'@': dedupid,
				put: null,
				err: null,
			});
		} else {
			db.on('in', {
				'@': dedupid,
				put: Gun.graph.node(data),
				err,
			});
		}
	};

	const acknowledgeRet = (err: any, result: any) => {
		// console.log('asyncAckno', { err, result, key });
		if (err) {
			done(err);
		} else if (result === null) {
			// Nothing found
			done(null);
		} else {
			const temp = JSON.parse(result);
			if (field) {
				done(null, temp[field] || null);
			} else {
				done(null, temp);
			}
		}
	};

	AsyncStorage.getItem(key || '', (err, res) => {
		if (err) {
			return acknowledgeRet(true, null);
		}
		acknowledgeRet(false, res);
	});
};

const write = (request: any, db: any) => {
	const { put: graph } = request;
	const keys = Object.keys(graph);
	const dedupid = graph['#'];

	const instructions = keys.map((key: string) => {
		return [key, JSON.stringify(graph[key] || {})];
	});

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
