// TODO: this needs to get out of this library and be plugged in from RN, but
// better yet, do this in redux as a storage!
import * as Gun from 'gun';
import {AsyncStorage} from 'react-native';

class Adapter {
	public read = (context: any) => {
		const {get, gun} = context;
		const {'#': key} = get;

		const done = (err: any, data?: any) => {
			gun._.root.on('in', {
				'@': context['#'],
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

	public write = (context: any) => {
		const {put: graph, gun} = context;
		const keys = Object.keys(graph);

		const instructions = keys.map((key: string) => [key, JSON.stringify(graph[key])]);

		AsyncStorage.multiMerge(instructions, (err?: any[]) => {
			gun._.root.on('in', {
				'@': context['#'],
				ok: !err || err.length === 0,
				err,
			});
		});
	};
}

Gun.on('opt', (context: any) => {
	const adapter = new Adapter();

	// Allows other plugins to respond concurrently.
	const pluginInterop = (middleware: any) =>
		function(ctx: any) {
			// @ts-ignore
			this.to.next(ctx);
			return middleware(ctx);
		};

	// Register the adapter
	Gun.on('get', pluginInterop(adapter.read));
	Gun.on('put', pluginInterop(adapter.write));
});
