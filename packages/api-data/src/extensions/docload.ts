// tslint:disable
import * as Gun from 'gun/gun';
import { IGunInstance } from '../types';

Gun.chain.docLoad = function(
	cb: (data: object | undefined, key: string) => IGunInstance,
	old: boolean = false,
) {
	return this.docOpen(cb);
	// if (!old) {
	// 	return this.docOpen((data: any, doc: any) => {
	// 		if (Object.keys(data).length === 0 && data.constructor === Object) {
	// 			return cb(undefined, doc.key);
	// 		}
	// 		return cb(data, doc.key);
	// 	}, { off: true });
	// }
	// return this.open(cb, {off: 1, wait: 500});
	// const gun = this; // tslint:disable-line no-this-assignment
	// const root = gun.back(-1);
	// // return an instance of gun with once (used to be .val), best option here.
	// return this.once((obj: object = {}, key: string) => {
	// 	// if null or undefined (but shouldnt be able to be that, right ?).. skip it if opt allows
	// 	if (obj === null) {
	// 		return;
	// 	}

	// 	const { _: obSoul, ...obRest } = Gun.obj.copy(obj);
	// 	obj = obRest;

	// 	// next objects to dig into
	// 	const queue: any = {};
	// 	// current doc (passed on the callback)
	// 	let doc: object;
	// 	// flag
	// 	let done: boolean;

	// 	// get deeper into the reference soul
	// 	const expand = (newObj: object | any = {}) => {
	// 		const { _: newObSoul, ...o } = newObj;
	// 		// console.log("que", queue);
	// 		// if doc is null assign the current object to the doc
	// 		if (!doc) {
	// 			doc = o;
	// 		}

	// 		// this is exactly foreach, what it does is iterate through all the levels inside a single object, if the object has levels/depth
	// 		// expand its soul and append the depth data on the parent object of the child (mutates the data)
	// 		// gun.js: line 125
	// 		// Type.obj.map = function(l, c, _)
	// 		// l -> current object to iterate
	// 		// c -> callback (if the current object has keys, call it with the callback otherwise just the values)
	// 		Object.entries(o).map(([k, v]) => {
	// 			const soul = Gun.val.rel.is(v);
	// 			if (soul) {
	// 				queue[soul] = true;
	// 				root.get(soul).once((loadedValue: object) => {
	// 					loadedValue = Gun.obj.copy(loadedValue);
	// 					o[k] = loadedValue;
	// 					queue[soul] = false;
	// 					expand(loadedValue);
	// 				});
	// 				return;
	// 			}

	// 			// if it doesnt have a soul, just attach the value as is
	// 			o[k] = v;
	// 		});

	// 		// if the object has souls inside in the queue, return true to continue expanding it without invoking the callback
	// 		const ty = Gun.obj.map(queue, (wait: boolean) => {
	// 			if (wait) {
	// 				return true;
	// 			}
	// 		})
	// 		if (done || ty) {
	// 			// dont send the document back yet / or again, we are either already done and have sent the doc, or are still waiting for it load completely
	// 			return;
	// 		}
	// 		done = true;
	// 		cb(doc, key);
	// 	};

	// 	expand(obj);
	// });
};

Gun.chain.docOpen = function(cb: any, opt: any, at: any) {
	opt = opt || {};
	opt.doc = opt.doc || {};
	opt.ids = opt.ids || {};
	opt.any = opt.any || cb;
	opt.ev = opt.ev || {
		off() {
			// @ts-ignore-file
			Gun.obj.map(opt.ev.s, function(e) {
				if (e) {
					e.off();
				}
			});
			opt.ev.s = {};
		},
		s: {},
	};
	// @ts-ignore-file
	return this.once(function(data, key, ctx, ev) {
		delete ((data = Gun.obj.copy(data)) || {})._;
		clearTimeout(opt.to);
		opt.to = setTimeout(function() {
			if (!opt.any) {
				return;
			}
			opt.any.call(opt.at, opt.doc, opt.key, opt, opt.ev);
			opt.ev.off();
			opt.any = null;
		}, 200);
		opt.at = opt.at || ctx;
		opt.key = opt.key || key;
		// @ts-ignore-file
		opt.ev.s[this._.id] = ev;
		if (Gun.val.is(data)) {
			if (!at) {
				opt.doc = data;
			} else {
				at[key] = data;
			}
			return;
		}
		// @ts-ignore-file
		const tmp = this;
		let id;
		Gun.obj.map(data, function(val: any, key: string) {
			if (!(id = Gun.val.link.is(val))) {
				(at || opt.doc)[key] = val;
				return;
			}
			if (opt.ids[id]) {
				(at || opt.doc)[key] = opt.ids[id];
				return;
			}
			tmp
				.get(key)
				.docOpen(opt.any, opt, (opt.ids[id] = (at || opt.doc)[key] = {}));
		});
	}, { wait: 100 });
};
