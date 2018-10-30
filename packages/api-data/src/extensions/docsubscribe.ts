// tslint:disable
import * as Gun from 'gun/gun';

Gun.chain.docSubscribe = function(cb: (data: object & any) => void, opt: any, at: any){
	opt = opt || {};
	opt.doc = opt.doc || {};
	opt.ids = opt.ids || {};
	opt.any = opt.any || cb;
	opt.ev = opt.ev || {off: function(){
		Gun.obj.map(opt.ev.s, function(e: any){
			if(e){ e.off() }
		});
		opt.ev.s = {};
	}, s:{}}
	return this.on(function(data: any, key: string, ctx: any, ev: any){
		delete ((data = Gun.obj.copy(data))||{})._;
		clearTimeout(opt.to);
		opt.to = setTimeout(function(){
			if(!opt.any){ return }
			opt.any.call(opt.at.$, opt.doc, opt.key, opt, opt.ev);
			if(opt.off){
				opt.ev.off();
				opt.any = null;
			}
		}, opt.wait || 1);
		opt.at = opt.at || ctx;
		opt.key = opt.key || key;
		// @ts-ignore
		opt.ev.s[this._.id] = ev;
		if(Gun.val.is(data)){
			if(!at){
				opt.doc = data;
			} else {
				at[key] = data;
			}
			return;
		}
		// @ts-ignore
		var tmp = this, id;
		Gun.obj.map(data, function(val: object, key: string){
			if(!(id = Gun.val.link.is(val))){
				(at || opt.doc)[key] = val;
				return;
			}
			if(opt.ids[id]){
				(at || opt.doc)[key] = opt.ids[id];
				return;
			}
			tmp.get(key).docSubscribe(opt.any, opt, opt.ids[id] = (at || opt.doc)[key] = {});
		});
	})
}