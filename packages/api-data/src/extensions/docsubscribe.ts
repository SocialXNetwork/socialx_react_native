// tslint:disable
import * as Gun from 'gun/gun';
import { IGunInstance } from '../types';

Gun.chain.docSubscribe = function(
	cb: (data: object | undefined, key: string) => IGunInstance,
	opts?: {
		timeout: number,
		wait: number;
	},
) {
	return this.docSub(cb, opts);
};

Gun.chain.docSub = function(cb: any, opt: any, at: any) {
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
	return this.on(function(data, key, ctx, ev) {
		delete ((data = Gun.obj.copy(data)) || {})._;
		clearTimeout(opt.to);
		opt.to = setTimeout(function() {
			if (!opt.any) {
				return;
			}
			opt.any.call(opt.at.$, opt.doc, opt.key, opt, opt.ev);
			opt.ev.off();
			opt.any = null;
		}, opt.timeout || 600);
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
				.docSub(opt.any, opt, (opt.ids[id] = (at || opt.doc)[key] = {}));
		});
	}, { wait: opt.wait || 300 });
};
