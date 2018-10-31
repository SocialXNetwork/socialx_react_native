import * as Gun from 'gun/gun';

Gun.chain.erase = function(dataKey: string, cb?: any) {
	this.get(dataKey).put(null, () => {
		this.get(dataKey).put({}, cb);
	});
	return this;
};
