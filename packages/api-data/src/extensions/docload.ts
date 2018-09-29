import * as Gun from 'gun/gun';
import { IGunInstance } from '../types';

Gun.chain.docLoad = function(
	cb: (data: object | undefined, key: string) => IGunInstance,
) {
	const gun = this; // tslint:disable-line no-this-assignment
	const root = gun.back(-1);
	// return an instance of gun with once (used to be .val), best option here.
	return this.once((obj: object, key: string) => {
		// if null or undefined (but shouldnt be able to be that, right ?).. skip it if opt allows
		if (obj === null) {
			return;
		}

		obj = Gun.obj.copy(obj);
		// next objects to dig into
		const queue: any = {};
		// current doc (passed on the callback)
		let doc: object;
		// flag
		let done: boolean;
		// console.log("obj", obj);

		// get deeper into the reference soul
		const expand = (o: object | any) => {
			// console.log("que", queue);
			// if doc is null assign the current object to the doc
			if (!doc) {
				doc = o;
			}

			// this is exactly foreach, what it does is iterate through all the levels inside a single object, if the object has levels/depth
			// expand its soul and append the depth data on the parent object of the child (mutates the data)
			// gun.js: line 125
			// Type.obj.map = function(l, c, _)
			// l -> current object to iterate
			// c -> callback (if the current object has keys, call it with the callback otherwise just the values)
			Gun.obj.map(o, (val: object | string | number | null, prop: string) => {
				const soul = Gun.val.rel.is(val);
				if (soul) {
					queue[soul] = true;
					root.get(soul).val((loadedValue: object) => {
						queue[soul] = false;
						loadedValue = Gun.obj.copy(loadedValue);
						o[prop] = loadedValue;
						expand(loadedValue);
					});
					return;
				}

				// if it doesnt have a soul, just attach the value as is
				o[prop] = val;
			});

			// if the object has souls inside in the queue, return true to continue expanding it without invoking the callback
			const waitForMap = Gun.obj.map(queue, (wait: boolean) => {
				if (wait) {
					return true;
				}
			});
			if (done || waitForMap) {
				// dont send the document back yet / or again, we are either already done and have sent the doc, or are still waiting for it load completely
				return;
			}
			done = true;
			cb(doc, key);
		};

		expand(obj);
	});
};
