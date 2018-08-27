// https://github.com/gundb/synchronous

/*
(function (env) {
	var Gun;
	if(typeof module !== "undefined" && module.exports){ Gun = require('gun/gun') }
	if(typeof window !== "undefined"){ Gun = window.Gun }

	Gun.chain.sync = function (obj, opt, cb, o) {
		var gun = this;
		if (!Gun.obj.is(obj)) {
			console.log('First param is not an object');
			return gun;
		}
		if (Gun.bi.is(opt)) {
			opt = {
				meta: opt
			};
		}
		if(Gun.fn.is(opt)){
			cb = opt;
			opt = null;
		}
		cb = cb || function(){};
		opt = opt || {};
		opt.ctx = opt.ctx || {};
		gun.on(function (change, field) {
			Gun.obj.map(change, function (val, field) {
				if (!obj) {
					return;
				}
				if (field === '_' || field === '#') {
					if (opt.meta) {
						obj[field] = val;
					}
					return;
				}
				if (Gun.obj.is(val)) {
					var soul = Gun.val.rel.is(val);
					if (opt.ctx[soul + field]) {
						// don't re-subscribe.
						return;
					}
					// unique subscribe!
					opt.ctx[soul + field] = true;
					this.path(field).sync(
						obj[field] = (obj[field] || {}),
						Gun.obj.copy(opt),
						cb,
						o || obj
					);
					return;
				}
				obj[field] = val;
			}, this);
			cb(o || obj);
		});
		return gun;
	};

}());
*/
